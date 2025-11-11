// src/lib/fetchArticles.ts
// Utilitaires pour récupérer et agréger tes derniers articles

export type Article = {
  source: "DroidSoft" | "Le Café du Geek" | "Frandroid";
  id: string;
  title: string;
  url: string;
  date: string; // ISO
  cover?: string | null;
};

type WpMedia = {
  source_url?: string;
  media_details?: { sizes?: Record<string, { source_url: string }> };
};

type YoastHeadJson = {
  og_image?: Array<{ url?: string }>;
  ["@graph"]?: Array<Record<string, unknown>>;
  // on ne typage pas tout le schéma Yoast, on ne lit que ce qu'il faut
};

type WpPost = {
  id: number;
  date_gmt: string;
  link: string;
  title: { rendered: string };
  jetpack_featured_media_url?: string;
  _embedded?: { "wp:featuredmedia"?: WpMedia[] };
  yoast_head_json?: YoastHeadJson;
};

// On veut Yoast + _embed pour récupérer une cover fiable (thumbnailUrl en priorité)
const WP_PARAMS =
  "_embed=1&_fields=id,date_gmt,link,title,jetpack_featured_media_url,yoast_head_json,_embedded";

// A adapter si tu connais déjà les IDs auteurs
const CONFIG = {
  droidsoft: {
    base: "https://droidsoft.fr",
    authorId: undefined as number | undefined,
    authorSlug: "micmac" as string,
  },
  lcdg: {
    base: "https://lecafedugeek.fr",
    authorId: undefined as number | undefined,
    authorSlug: "maximilien" as string,
  },
  frandroid: {
    // slug auteur sur Frandroid pour le flux RSS
    authorSlug: "aximilietech",
  },
};

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, {
    ...init,
    next: { revalidate: 600 },
    headers: { Accept: "application/json", ...(init?.headers || {}) },
  });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} for ${url}`);
  return r.json() as Promise<T>;
}

function decodeHtml(input: string): string {
  if (!input) return "";
  // numériques décimales
  let s = input.replace(/&#(\d+);/g, (_m, d) => String.fromCharCode(Number(d)));
  // numériques hex
  s = s.replace(/&#x([0-9a-fA-F]+);/g, (_m, h) =>
    String.fromCharCode(parseInt(h, 16))
  );
  // nommées courantes
  return s
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

async function resolveWpAuthorId(base: string, slug: string) {
  const url = `${base}/wp-json/wp/v2/users?slug=${encodeURIComponent(slug)}`;
  const arr = await fetchJson<Array<{ id: number }>>(url);
  if (!arr?.length)
    throw new Error(`Auteur introuvable sur ${base} pour slug ${slug}`);
  return arr[0].id;
}

function pickYoastThumbnail(yoast?: YoastHeadJson | null): string | null {
  if (!yoast) return null;

  // 1) Préférence: tout "thumbnailUrl" présent dans @graph
  const graph = Array.isArray(yoast["@graph"]) ? yoast["@graph"] : [];
  for (const node of graph) {
    const val = (node as any)?.thumbnailUrl;
    if (typeof val === "string" && /^https?:\/\//i.test(val)) {
      return val;
    }
  }

  // 2) Fallback: og_image[0].url
  const og = yoast.og_image?.[0]?.url;
  if (og && /^https?:\/\//i.test(og)) return og;

  return null;
}

function pickWpCover(p: WpPost): string | null {
  // Ordre: Yoast thumbnailUrl -> og_image -> jetpack -> _embedded sizes/source
  const fromYoast = pickYoastThumbnail(p.yoast_head_json);
  if (fromYoast) return fromYoast;

  if (p.jetpack_featured_media_url) return p.jetpack_featured_media_url;

  const emb = p._embedded?.["wp:featuredmedia"]?.[0];
  const fromSizes =
    emb?.media_details?.sizes &&
    Object.values(emb.media_details.sizes).find(Boolean)?.source_url;

  return fromSizes || emb?.source_url || null;
}

async function getWpPostsByAuthor(
  base: string,
  authorId: number,
  perPage = 10
): Promise<Article[]> {
  const url = `${base}/wp-json/wp/v2/posts?author=${authorId}&per_page=${perPage}&orderby=date&order=desc&${WP_PARAMS}`;
  const posts = await fetchJson<WpPost[]>(url);
  const source: Article["source"] =
    base.includes("droidsoft") ? "DroidSoft" : "Le Café du Geek";
  return posts.map((p) => ({
    source,
    id: `${source}-${p.id}`,
    title: decodeHtml(p.title?.rendered?.replace(/<[^>]+>/g, "") ?? ""),
    url: p.link,
    date: new Date(p.date_gmt + "Z").toISOString(),
    cover: pickWpCover(p),
  }));
}

// Parsing RSS Frandroid robuste sans dépendance
function parseFrandroidRss(xml: string): Article[] {
  const itemBlocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  const pick = (s: string, tag: string) => {
    const m = s.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"));
    return m ? m[1].trim() : "";
  };
  const pickCdata = (s: string, tag: string) => {
    const m = s.match(
      new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i")
    );
    return m ? m[1].trim() : pick(s, tag);
  };
  const pickAttr = (s: string, tag: string, attr: string) => {
    const m = s.match(new RegExp(`<${tag}[^>]*\\b${attr}="([^"]+)"`, "i"));
    return m ? m[1] : null;
  };

  const pickMediaUrl = (s: string) => {
    // enclosure url=""
    const enc = pickAttr(s, "enclosure", "url");
    if (enc) return enc;
    // media:content / media:thumbnail
    const mMedia =
      s.match(/<media:(?:content|thumbnail)[^>]*url="([^"]+)"/i)?.[1] || null;
    if (mMedia) return mMedia;
    // <content:encoded> ... <img src="...">
    const content = pickCdata(s, "content:encoded");
    const mImg = content.match(/<img[^>]+src="([^"]+)"/i)?.[1] || null;
    return mImg || null;
  };

  return itemBlocks.map((it) => {
    const rawTitle = pickCdata(it, "title");
    const rawLink = pick(it, "link");
    const pubDate = pick(it, "pubDate");
    const cover = pickMediaUrl(it);
    const iso = pubDate
      ? new Date(pubDate).toISOString()
      : new Date().toISOString();
    const title = decodeHtml(rawTitle);
    const link = decodeHtml(rawLink);
    return {
      source: "Frandroid" as const,
      id: `Frandroid-${link || title}`,
      title,
      url: link,
      date: iso,
      cover,
    };
  });
}

async function getFrandroidArticles(per = 10): Promise<Article[]> {
  const slug = CONFIG.frandroid.authorSlug;
  const url = `https://www.frandroid.com/author/${encodeURIComponent(
    slug
  )}/feed`;
  const r = await fetch(url, {
    next: { revalidate: 600 },
    headers: { Accept: "application/rss+xml" },
  });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} for ${url}`);
  const xml = await r.text();
  const items = parseFrandroidRss(xml);
  // filtre sécurité: uniquement les liens d’articles
  const filtered = items.filter(
    (a) => a.url && /^https?:\/\/www\.frandroid\.com\//i.test(a.url)
  );
  return filtered.slice(0, per);
}

export async function getAllLatestArticles(opts?: {
  perDroidsoft?: number;
  perLcdg?: number;
  perFrandroid?: number;
  maxTotal?: number;
}): Promise<Article[]> {
  const {
    perDroidsoft = 8,
    perLcdg = 8,
    perFrandroid = 8,
    maxTotal = 20,
  } = opts || {};

  // Résolution des IDs auteurs WP au besoin
  const droidsoftAuthorId =
    CONFIG.droidsoft.authorId ??
    (await resolveWpAuthorId(
      CONFIG.droidsoft.base,
      CONFIG.droidsoft.authorSlug
    ));
  const lcdgAuthorId =
    CONFIG.lcdg.authorId ??
    (await resolveWpAuthorId(CONFIG.lcdg.base, CONFIG.lcdg.authorSlug));

  const [ds, lc, fr] = await Promise.all([
    getWpPostsByAuthor(CONFIG.droidsoft.base, droidsoftAuthorId, perDroidsoft),
    getWpPostsByAuthor(CONFIG.lcdg.base, lcdgAuthorId, perLcdg),
    getFrandroidArticles(perFrandroid),
  ]);

  // Agrégation, dédup par URL, tri par date desc
  const map = new Map<string, Article>();
  [...ds, ...lc, ...fr].forEach((a) => {
    if (!map.has(a.url)) map.set(a.url, a);
  });
  const all = Array.from(map.values()).sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return all.slice(0, maxTotal);
}
