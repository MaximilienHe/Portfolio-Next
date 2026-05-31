// src/lib/fetchArticles.ts
// Utilitaires pour récupérer et agréger tes derniers articles

export type Article = {
  source: "DroidSoft" | "Le Café du Geek" | "Frandroid";
  id: string;
  title: string;
  url: string;
  date: string; // ISO
  cover?: string | null;
  excerpt?: string | null;
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
  excerpt?: { rendered: string };
  jetpack_featured_media_url?: string;
  _embedded?: { "wp:featuredmedia"?: WpMedia[] };
  yoast_head_json?: YoastHeadJson;
};

// On veut Yoast + _embed pour récupérer une cover fiable (thumbnailUrl en priorité)
const WP_PARAMS =
  "_embed=1&_fields=id,date_gmt,link,title,excerpt,jetpack_featured_media_url,yoast_head_json,_embedded";

// A adapter si tu connais déjà les IDs auteurs
const CONFIG = {
  droidsoft: {
    base: "https://droidsoft.fr",
    authorId: undefined as number | undefined,
    authorSlug: "micmac" as string,
  },
  lcdg: {
    base: "https://lecafedugeek.fr",
    authorId: 269 as number | undefined,
    authorSlug: "maximilien" as string,
  },
  frandroid: {
    // slug auteur sur Frandroid pour le flux RSS
    authorSlug: "aximilietech",
  },
};

const FETCH_TIMEOUT_MS = 8000;

function isAbortError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name?: string }).name === "AbortError"
  );
}

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  let r: Response;
  try {
    r = await fetchWithTimeout(url, {
      ...init,
      next: { revalidate: 600 },
      headers: { Accept: "application/json", ...(init?.headers || {}) },
    });
  } catch (error) {
    if (isAbortError(error)) {
      throw new Error(`Timeout after ${FETCH_TIMEOUT_MS}ms for ${url}`);
    }
    throw error;
  }
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} for ${url}`);
  return r.json() as Promise<T>;
}

function extractExcerpt(html: string | null | undefined, maxLength = 180): string | null {
  if (!html) return null;
  const stripped = html
    .replace(/\[\&hellip;\]|\[…\]/g, "…")
    .replace(/<[^>]+>/g, " ");
  const text = decodeHtml(stripped).replace(/\s+/g, " ").trim();
  if (!text) return null;
  if (text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(" ");
  return (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced) + "…";
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
    .replace(/&apos;|&#39;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function normalizeCoverUrl(
  raw: string | null | undefined,
  baseUrl?: string
): string | null {
  if (!raw) return null;

  let value = decodeHtml(raw).trim();
  if (!value) return null;

  // Some feeds expose protocol-relative urls: //cdn.example.com/image.jpg
  if (value.startsWith("//")) value = `https:${value}`;

  try {
    if (/^https?:\/\//i.test(value)) {
      const url = new URL(value);
      if (url.protocol === "http:") url.protocol = "https:";
      return url.toString();
    }

    if (value.startsWith("/") && baseUrl) {
      const url = new URL(value, baseUrl);
      if (url.protocol === "http:") url.protocol = "https:";
      return url.toString();
    }

    return null;
  } catch {
    return null;
  }
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
    if (typeof val === "string") {
      const normalized = normalizeCoverUrl(val);
      if (normalized) return normalized;
    }
  }

  // 2) Fallback: og_image[0].url
  const og = normalizeCoverUrl(yoast.og_image?.[0]?.url);
  if (og) return og;

  return null;
}

function pickWpCover(p: WpPost, base: string): string | null {
  // Ordre: Yoast thumbnailUrl -> og_image -> jetpack -> _embedded sizes/source
  const fromYoast = pickYoastThumbnail(p.yoast_head_json);
  if (fromYoast) return fromYoast;

  const fromJetpack = normalizeCoverUrl(p.jetpack_featured_media_url, base);
  if (fromJetpack) return fromJetpack;

  const emb = p._embedded?.["wp:featuredmedia"]?.[0];
  const fromSizes =
    emb?.media_details?.sizes &&
    Object.values(emb.media_details.sizes).find(Boolean)?.source_url;

  return normalizeCoverUrl(fromSizes || emb?.source_url || null, base);
}

async function getWpPostsByAuthor(
  base: string,
  authorId: number,
  perPage = 10,
  page = 1,
): Promise<Article[]> {
  const url = `${base}/wp-json/wp/v2/posts?author=${authorId}&per_page=${perPage}&page=${page}&orderby=date&order=desc&${WP_PARAMS}`;
  const posts = await fetchJson<WpPost[]>(url);
  const source: Article["source"] =
    base.includes("droidsoft") ? "DroidSoft" : "Le Café du Geek";
  return posts.map((p) => ({
    source,
    id: `${source}-${p.id}`,
    title: decodeHtml(p.title?.rendered?.replace(/<[^>]+>/g, "") ?? ""),
    url: p.link,
    date: new Date(p.date_gmt + "Z").toISOString(),
    cover: pickWpCover(p, base),
    excerpt: extractExcerpt(p.excerpt?.rendered),
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
    const rawDescription = pickCdata(it, "description");
    const pubDate = pick(it, "pubDate");
    const iso = pubDate
      ? new Date(pubDate).toISOString()
      : new Date().toISOString();
    const title = decodeHtml(rawTitle);
    const link = decodeHtml(rawLink);
    const cover = normalizeCoverUrl(pickMediaUrl(it), link);
    return {
      source: "Frandroid" as const,
      id: `Frandroid-${link || title}`,
      title,
      url: link,
      date: iso,
      cover,
      excerpt: extractExcerpt(rawDescription),
    };
  });
}

async function getFrandroidArticles(per = 10): Promise<Article[]> {
  const slug = CONFIG.frandroid.authorSlug;
  const url = `https://www.frandroid.com/author/${encodeURIComponent(
    slug
  )}/feed`;
  let r: Response;
  try {
    r = await fetchWithTimeout(url, {
      next: { revalidate: 600 },
      headers: { Accept: "application/rss+xml" },
    });
  } catch (error) {
    if (isAbortError(error)) {
      throw new Error(`Timeout after ${FETCH_TIMEOUT_MS}ms for ${url}`);
    }
    throw error;
  }
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
  /** Page WordPress à récupérer pour les sources paginables (DroidSoft/LCDG).
   *  Frandroid étant un RSS non paginable, seule page === 1 renvoie ses items. */
  page?: number;
}): Promise<Article[]> {
  const {
    perDroidsoft = 8,
    perLcdg = 8,
    perFrandroid = 8,
    maxTotal = 20,
    page = 1,
  } = opts || {};

  // Résolution des IDs auteurs WP au besoin
  const droidsoftAuthorIdPromise = (CONFIG.droidsoft.authorId !== undefined
    ? Promise.resolve(CONFIG.droidsoft.authorId)
    : resolveWpAuthorId(CONFIG.droidsoft.base, CONFIG.droidsoft.authorSlug)
  ).catch((error) => {
    console.warn("[fetchArticles] droidsoft author lookup failed:", error);
    return undefined;
  });

  const lcdgAuthorIdPromise = (CONFIG.lcdg.authorId !== undefined
    ? Promise.resolve(CONFIG.lcdg.authorId)
    : resolveWpAuthorId(CONFIG.lcdg.base, CONFIG.lcdg.authorSlug)
  ).catch((error) => {
    console.warn("[fetchArticles] lcdg author lookup failed:", error);
    return undefined;
  });

  const [droidsoftAuthorId, lcdgAuthorId] = await Promise.all([
    droidsoftAuthorIdPromise,
    lcdgAuthorIdPromise,
  ]);

  const droidsoftPromise = droidsoftAuthorId
    ? getWpPostsByAuthor(
        CONFIG.droidsoft.base,
        droidsoftAuthorId,
        perDroidsoft,
        page,
      ).catch((error) => {
        console.warn("[fetchArticles] droidsoft fetch failed:", error);
        return [] as Article[];
      })
    : Promise.resolve([] as Article[]);

  const lcdgPromise = lcdgAuthorId
    ? getWpPostsByAuthor(CONFIG.lcdg.base, lcdgAuthorId, perLcdg, page).catch(
        (error) => {
          console.warn("[fetchArticles] lcdg fetch failed:", error);
          return [] as Article[];
        }
      )
    : Promise.resolve([] as Article[]);

  // Frandroid RSS n'est pas paginable : seul page === 1 renvoie ses items.
  const frandroidPromise =
    page === 1
      ? getFrandroidArticles(perFrandroid).catch((error) => {
          console.warn("[fetchArticles] frandroid fetch failed:", error);
          return [] as Article[];
        })
      : Promise.resolve([] as Article[]);

  const [ds, lc, fr] = await Promise.all([
    droidsoftPromise,
    lcdgPromise,
    frandroidPromise,
  ]);

  // Agrégation, dédup par URL, tri par date desc
  const map = new Map<string, Article>();
  [...ds, ...lc, ...fr].forEach((a) => {
    if (!map.has(a.url)) map.set(a.url, a);
  });
  const all = Array.from(map.values()).sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return all.slice(0, maxTotal);
}


