"use client";
// src/app/articles/_components/ArticlesFeed.tsx
// Flux unifié "kiosque" : cartes image avec titre + date en overlay, masonry
// 3 colonnes (round-robin → ordre de lecture préservé), source en chip coloré.
//
// Scroll infini sans à-coups :
//   - `shown`  : liste AFFICHÉE, append-only → les items déjà visibles ne
//                bougent jamais (pas de reflow / décalage d'écran).
//   - `pending`: buffer trié par date, pioché pour révéler la suite (instantané).
//   - Le buffer se recharge en arrière-plan (fetch réseau) bien avant d'être
//     vide → on ne tombe quasi jamais sur le skeleton.

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Source = "Frandroid" | "DroidSoft" | "Le Café du Geek";

export type FeedArticle = {
  source: Source;
  id: string;
  title: string;
  url: string;
  date: string;
  cover?: string | null;
  excerpt?: string | null;
};

const SOURCE_FILTERS: { label: string; value: "all" | Source; key: string }[] = [
  { label: "Tous", value: "all", key: "all" },
  { label: "Frandroid", value: "Frandroid", key: "frandroid" },
  { label: "DroidSoft", value: "DroidSoft", key: "droidsoft" },
  { label: "Le Café du Geek", value: "Le Café du Geek", key: "lcdg" },
];

const INITIAL_SHOWN = 12;
const REVEAL_CHUNK = 6;
const REFILL_THRESHOLD = 18; // recharge le buffer dès qu'il passe sous ce seuil

function sourceClass(source: Source): string {
  if (source === "Frandroid") return "is-frandroid";
  if (source === "DroidSoft") return "is-droidsoft";
  return "is-lcdg";
}

function byDateDesc(a: FeedArticle, b: FeedArticle): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/** Ratio de couverture, variation portrait douce pour un rythme masonry naturel. */
function coverAspect(i: number): string {
  const m = i % 5;
  if (m === 0) return "3 / 4";
  if (m === 3) return "1 / 1";
  return "4 / 5";
}

/** Date relative façon média ("il y a 2 jours"), avec repli sur date absolue. */
function relativeDate(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  const h = Math.floor(diffMs / 3_600_000);
  if (h < 1) return "à l'instant";
  if (h < 24) return `il y a ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `il y a ${d} jour${d > 1 ? "s" : ""}`;
  const w = Math.floor(d / 7);
  if (w < 5) return `il y a ${w} semaine${w > 1 ? "s" : ""}`;
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isExternalUrl(src?: string | null): boolean {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}
function normalizeCoverSrc(src?: string | null): string | null {
  if (!src) return null;
  const v = src.trim();
  if (!v) return null;
  if (v.startsWith("//")) return `https:${v}`;
  return v;
}

function useColumnCount(): number {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 700) setCols(1);
      else if (w <= 1100) setCols(2);
      else if (w >= 1600) setCols(4);
      else setCols(3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return cols;
}

type ApiResponse = {
  articles: FeedArticle[];
  hasMore: boolean;
  page: number;
  perSource: number;
};

function ArticleCard({
  article,
  index,
  eager,
}: {
  article: FeedArticle;
  index: number;
  eager?: boolean;
}) {
  const coverSrc = normalizeCoverSrc(article.cover);
  const isExternalCover = isExternalUrl(coverSrc);
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="kcard"
      aria-label={`${article.title} — ${article.source}`}
    >
      <div className="kcard-media" style={{ aspectRatio: coverAspect(index) }}>
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt=""
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            unoptimized={isExternalCover}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <div className="kcard-placeholder" aria-hidden />
        )}
        <span className={`source-chip ${sourceClass(article.source)}`}>
          {article.source}
        </span>
        <div className="kcard-overlay">
          <span className="kcard-date" suppressHydrationWarning>
            {relativeDate(article.date)}
          </span>
          <h3 className="kcard-title">{article.title}</h3>
        </div>
      </div>
    </a>
  );
}

type Props = {
  initial: FeedArticle[];
  initialPage: number;
  initialHasMore: boolean;
  perSource: number;
};

export default function ArticlesFeed({
  initial,
  initialPage,
  initialHasMore,
  perSource,
}: Props) {
  // `buffer` = tout ce qui est chargé, trié par date. `revealedCount` = combien
  // sont affichés. Le PRÉFIXE affiché (buffer[0..revealedCount]) est gelé : on
  // ne re-trie que la queue lors d'un refill → aucun item visible ne bouge.
  const [buffer, setBuffer] = useState<FeedArticle[]>(() => initial);
  const [revealedCount, setRevealedCount] = useState(() =>
    Math.min(INITIAL_SHOWN, initial.length),
  );
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isFetching, setIsFetching] = useState(false);
  const [filter, setFilter] = useState<"all" | Source>("all");
  const seenIds = useRef<Set<string>>(new Set(initial.map((a) => a.id)));
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const numColumns = useColumnCount();

  const bufferRef = useRef(buffer);
  bufferRef.current = buffer;
  const revealedCountRef = useRef(revealedCount);
  revealedCountRef.current = revealedCount;
  const fetchStateRef = useRef({ isFetching, hasMore, page });
  fetchStateRef.current = { isFetching, hasMore, page };

  const pendingCount = Math.max(0, buffer.length - revealedCount);

  // Recharge réseau : on n'ajoute/retri QUE la queue (au-delà du préfixe gelé).
  const refill = useCallback(async () => {
    const s = fetchStateRef.current;
    if (s.isFetching || !s.hasMore) return;
    setIsFetching(true);
    const nextPage = s.page + 1;
    try {
      const res = await fetch(
        `/api/latest-articles?page=${nextPage}&perSource=${perSource}`,
        { cache: "default" },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiResponse = await res.json();
      const fresh = data.articles.filter((a) => {
        if (seenIds.current.has(a.id)) return false;
        seenIds.current.add(a.id);
        return true;
      });
      setBuffer((prev) => {
        const rc = revealedCountRef.current;
        const head = prev.slice(0, rc); // affiché → gelé
        const tail = [...prev.slice(rc), ...fresh].sort(byDateDesc);
        return [...head, ...tail];
      });
      setPage(nextPage);
      setHasMore(data.hasMore);
    } catch {
      // on garde hasMore=true pour réessayer au prochain trigger
    } finally {
      setIsFetching(false);
    }
  }, [perSource]);

  // Révèle un nouveau lot (append-only : on avance juste le curseur).
  const revealMore = useCallback(() => {
    setRevealedCount((c) => Math.min(c + REVEAL_CHUNK, bufferRef.current.length));
  }, []);

  // Préchargement proactif : dès que le buffer restant passe sous le seuil,
  // on recharge en fond → l'utilisateur ne voit quasi jamais le skeleton.
  useEffect(() => {
    if (pendingCount < REFILL_THRESHOLD && hasMore && !isFetching) {
      refill();
    }
  }, [pendingCount, hasMore, isFetching, refill]);

  // Observer large (1200px) : révèle bien avant d'atteindre le bas. La
  // révélation pioche dans le buffer déjà chargé → pas d'attente.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) revealMore();
      },
      { rootMargin: "1200px 0px" },
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [revealMore]);

  const visible = useMemo(() => {
    const shown = buffer.slice(0, revealedCount);
    if (filter === "all") return shown;
    return shown.filter((a) => a.source === filter);
  }, [buffer, revealedCount, filter]);

  // Distribution masonry round-robin (ordre de lecture préservé, stable car
  // `visible` ne fait que grandir par la fin tant qu'on ne change pas de filtre).
  const columns = useMemo(() => {
    const cols: { article: FeedArticle; index: number }[][] = Array.from(
      { length: numColumns },
      () => [],
    );
    visible.forEach((article, i) => {
      cols[i % numColumns].push({ article, index: i });
    });
    return cols;
  }, [visible, numColumns]);

  const bufferEmptyButFetching =
    isFetching && pendingCount === 0 && filter === "all";

  return (
    <>
      <div
        className="kiosque-filters"
        role="tablist"
        aria-label="Filtrer par média"
      >
        {SOURCE_FILTERS.map((f) => {
          const isActive = filter === f.value;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`filter-chip ${f.value === "all" ? "is-all" : sourceClass(f.value as Source)} ${isActive ? "is-active" : ""}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div
        className="kiosque-columns"
        role="feed"
        aria-busy={isFetching}
        aria-label="Flux unifié des articles publiés"
        data-cols={numColumns}
      >
        {columns.map((col, ci) => (
          <div className="kiosque-col" key={ci}>
            {col.map(({ article, index }) => (
              <ArticleCard
                key={article.id}
                article={article}
                index={index}
                eager={index < 6}
              />
            ))}
          </div>
        ))}
      </div>

      <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />

      {bufferEmptyButFetching ? (
        <p className="kiosque-loading" role="status">
          <span className="kiosque-spinner" aria-hidden /> Chargement…
        </p>
      ) : null}

      {!hasMore && pendingCount === 0 && visible.length > 0 ? (
        <p className="kiosque-end" role="status">
          Vous êtes au bout du fil — {visible.length} article
          {visible.length > 1 ? "s" : ""}.
        </p>
      ) : null}

      {visible.length === 0 ? (
        <p className="kiosque-empty" role="status">
          Aucun article ne correspond à ce filtre pour l&apos;instant.
        </p>
      ) : null}
    </>
  );
}
