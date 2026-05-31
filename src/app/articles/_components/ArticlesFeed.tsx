"use client";
// src/app/articles/_components/ArticlesFeed.tsx
// Flux unifié "kiosque" : tous les articles mélangés, source en chip coloré,
// masonry à hauteurs naturelles (distribution en colonnes côté JS, stable au
// scroll infini — pas de reflow), featured en tête, filtre par source.

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

function sourceClass(source: Source): string {
  if (source === "Frandroid") return "is-frandroid";
  if (source === "DroidSoft") return "is-droidsoft";
  return "is-lcdg";
}

/** Variation douce du ratio de couverture pour un rythme vertical naturel. */
function coverAspect(i: number): string {
  const m = i % 6;
  if (m === 1) return "3 / 4"; // portrait, plus haut
  if (m === 4) return "16 / 9"; // paysage, plus court
  return "4 / 3"; // standard
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

/**
 * Tri global par date décroissante. Indispensable au scroll infini : chaque
 * source pagine indépendamment, donc le lot d'une page peut contenir des
 * articles plus récents que la fin de la page précédente (ex. le 15e DroidSoft
 * est plus récent que le 8e LCDG). On re-trie tout l'historique accumulé à
 * chaque merge pour garder une chronologie correcte.
 */
function byDateDesc(a: FeedArticle, b: FeedArticle): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function useColumnCount(): number {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 900) setCols(1);
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

type Props = {
  initial: FeedArticle[];
  initialPage: number;
  initialHasMore: boolean;
  perSource: number;
};

type CardProps = {
  article: FeedArticle;
  index: number;
  eager?: boolean;
  featured?: boolean;
};

function ArticleCard({ article, index, eager, featured }: CardProps) {
  const coverSrc = normalizeCoverSrc(article.cover);
  const isExternalCover = isExternalUrl(coverSrc);
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`kiosque-item${featured ? " is-featured" : ""}`}
      aria-label={`${article.title} — ${article.source}`}
    >
      <div
        className="kiosque-cover"
        style={featured ? undefined : { aspectRatio: coverAspect(index) }}
      >
        <span className={`source-chip ${sourceClass(article.source)}`}>
          {article.source}
        </span>
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt=""
            fill
            sizes={
              featured
                ? "(max-width: 900px) 100vw, 55vw"
                : "(max-width: 900px) 100vw, 33vw"
            }
            style={{ objectFit: "cover" }}
            unoptimized={isExternalCover}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <div className="kiosque-cover-placeholder" aria-hidden />
        )}
      </div>
      <div className="kiosque-body">
        <span className="kiosque-date">
          {new Date(article.date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
        <h3 className="kiosque-title">{article.title}</h3>
        {article.excerpt ? (
          <p className="kiosque-excerpt">{article.excerpt}</p>
        ) : null}
      </div>
    </a>
  );
}

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
  const numColumns = useColumnCount();

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
        // Re-tri global : on ne se contente pas d'append, sinon un article
        // récent d'une source paginée se retrouverait sous des articles plus
        // vieux d'une autre source déjà affichés.
        setArticles((prev) => [...prev, ...fresh].sort(byDateDesc));
        setPage(nextPage);
        setHasMore(data.hasMore);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur réseau");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, perSource]);

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "600px 0px" },
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [hasMore, loadMore]);

  const visible = useMemo(() => {
    if (filter === "all") return articles;
    return articles.filter((a) => a.source === filter);
  }, [articles, filter]);

  const featured = visible[0];
  const rest = useMemo(() => visible.slice(1), [visible]);

  // Distribution masonry stable : l'article i va toujours dans la colonne
  // i % numColumns → pas de reflow des items existants au scroll infini.
  const columns = useMemo(() => {
    const cols: { article: FeedArticle; index: number }[][] = Array.from(
      { length: numColumns },
      () => [],
    );
    rest.forEach((article, i) => {
      cols[i % numColumns].push({ article, index: i });
    });
    return cols;
  }, [rest, numColumns]);

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
        className="kiosque"
        role="feed"
        aria-busy={isLoading}
        aria-label="Flux unifié des articles publiés"
      >
        {featured ? (
          <ArticleCard article={featured} index={0} eager featured />
        ) : null}

        <div className="kiosque-columns" data-cols={numColumns}>
          {columns.map((col, ci) => (
            <div className="kiosque-col" key={ci}>
              {col.map(({ article, index }) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                  eager={index < 5}
                />
              ))}
              {/* Skeletons répartis sur les colonnes pendant le fetch */}
              {isLoading && ci < 3
                ? (
                    <div className="kiosque-item is-skeleton" aria-hidden>
                      <div
                        className="kiosque-cover"
                        style={{ aspectRatio: coverAspect(ci + 1) }}
                      />
                      <div className="kiosque-body">
                        <div className="sk-line sk-meta" />
                        <div className="sk-line sk-title" />
                        <div className="sk-line sk-excerpt" />
                      </div>
                    </div>
                  )
                : null}
            </div>
          ))}
        </div>
      </div>

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
