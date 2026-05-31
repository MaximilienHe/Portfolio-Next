"use client";
// src/app/articles/_components/ArticlesFeed.tsx
// Flux unifié "kiosque" : tous les articles dans la même grille, source en chip,
// tailles variables (featured / wide / tall / normal) pour un visuel magazine,
// scroll infini via IntersectionObserver, filtre client-side par source.

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

type Variant = "featured" | "wide" | "tall" | "normal";

const SOURCE_FILTERS: { label: string; value: "all" | Source; key: string }[] = [
  { label: "Tous", value: "all", key: "all" },
  { label: "Frandroid", value: "Frandroid", key: "frandroid" },
  { label: "DroidSoft", value: "DroidSoft", key: "droidsoft" },
  { label: "Le Café du Geek", value: "Le Café du Geek", key: "lcdg" },
];

function sourceClass(source: Source): string {
  if (source === "Frandroid") return "is-frandroid";
  if (source === "DroidSoft") return "is-droidsoft";
  return "is-lcdg";
}

/**
 * Détermine la taille de chaque card selon son index dans la liste visible.
 * Pattern déterministe : featured en tête, wide/tall sprinklés tous les 9 items.
 * Quand le filtre change, le pattern se réapplique sur la liste filtrée — c'est
 * voulu : le 1er article visible est toujours mis en avant.
 */
function variantForIndex(i: number): Variant {
  if (i === 0) return "featured";
  const m = i % 9;
  if (m === 3) return "wide";
  if (m === 7) return "tall";
  return "normal";
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

type ApiResponse = {
  articles: FeedArticle[];
  hasMore: boolean;
  page: number;
  perSource: number;
};

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
  const [articles, setArticles] = useState<FeedArticle[]>(initial);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | Source>("all");
  const seenIds = useRef<Set<string>>(new Set(initial.map((a) => a.id)));
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setError(null);
    const nextPage = page + 1;
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
      if (fresh.length === 0 && !data.hasMore) {
        setHasMore(false);
      } else {
        setArticles((prev) => [...prev, ...fresh]);
        setPage(nextPage);
        setHasMore(data.hasMore);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur réseau");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, perSource]);

  // IntersectionObserver sur la sentinelle de fin de liste
  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) loadMore();
      },
      { rootMargin: "400px 0px" },
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [hasMore, loadMore]);

  const visible = useMemo(() => {
    if (filter === "all") return articles;
    return articles.filter((a) => a.source === filter);
  }, [articles, filter]);

  return (
    <>
      <div className="kiosque-filters" role="tablist" aria-label="Filtrer par média">
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
        className="kiosque"
        role="feed"
        aria-busy={isLoading}
        aria-label="Flux unifié des articles publiés"
      >
        {visible.map((a, i) => {
          const variant = variantForIndex(i);
          const coverSrc = normalizeCoverSrc(a.cover);
          const isExternalCover = isExternalUrl(coverSrc);
          return (
            <a
              key={a.id}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`kiosque-item is-${variant}`}
              aria-label={`${a.title} — ${a.source}`}
            >
              <div className="kiosque-cover">
                <span className={`source-chip ${sourceClass(a.source)}`}>
                  {a.source}
                </span>
                {coverSrc ? (
                  <Image
                    src={coverSrc}
                    alt=""
                    fill
                    sizes={
                      variant === "featured"
                        ? "(max-width: 900px) 100vw, 66vw"
                        : variant === "wide"
                          ? "(max-width: 900px) 100vw, 50vw"
                          : "(max-width: 900px) 100vw, 33vw"
                    }
                    style={{ objectFit: "cover" }}
                    unoptimized={isExternalCover}
                    loading={i < 6 ? "eager" : "lazy"}
                    decoding="async"
                  />
                ) : (
                  <div className="kiosque-cover-placeholder" aria-hidden />
                )}
              </div>
              <div className="kiosque-body">
                <h3 className="kiosque-title">{a.title}</h3>
                {a.excerpt ? (
                  <p className="kiosque-excerpt">{a.excerpt}</p>
                ) : null}
                <p className="kiosque-date">
                  {new Date(a.date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </a>
          );
        })}

        {/* Skeleton placeholders pendant le fetch */}
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`sk-${i}`}
                className="kiosque-item is-normal is-skeleton"
                aria-hidden
              >
                <div className="kiosque-cover" />
                <div className="kiosque-body">
                  <div className="sk-line sk-title" />
                  <div className="sk-line sk-excerpt" />
                  <div className="sk-line sk-meta" />
                </div>
              </div>
            ))
          : null}
      </div>

      {/* Sentinelle observée pour déclencher loadMore */}
      <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />

      {error ? (
        <p className="kiosque-error" role="alert">
          Petit raté en récupérant la suite ({error}).{" "}
          <button
            type="button"
            className="kiosque-retry"
            onClick={() => loadMore()}
          >
            Réessayer
          </button>
        </p>
      ) : null}

      {!hasMore && !isLoading && visible.length > 0 ? (
        <p className="kiosque-end" role="status">
          Vous êtes au bout du fil — {visible.length} article
          {visible.length > 1 ? "s" : ""} affiché
          {visible.length > 1 ? "s" : ""}.
        </p>
      ) : null}

      {!isLoading && visible.length === 0 ? (
        <p className="kiosque-empty" role="status">
          Aucun article ne correspond à ce filtre pour l&apos;instant.
        </p>
      ) : null}
    </>
  );
}
