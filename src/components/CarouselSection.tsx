"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";

type Article = {
  source: "DroidSoft" | "Le Café du Geek" | "Frandroid";
  id: string;
  title: string;
  url: string;
  date: string;
  cover?: string | null;
};

function circularAt<T>(arr: T[], i: number): T {
  const n = arr.length;
  const r = ((i % n) + n) % n;
  return arr[r];
}

export default function CarouselSection({
  title,
  variant,
  items,
}: {
  title: string;
  variant: "frandroid" | "droidsoft" | "lcdg";
  items: Article[];
}) {
  const base = useMemo(() => items ?? [], [items]);
  const n = base.length;

  const [index, setIndex] = useState(0); // index de l'article central (0 = premier)

  // Navigation infinie
  const move = useCallback(
    (delta: number) => {
      if (n === 0) return;
      setIndex((i) => i + delta);
    },
    [n]
  );

  // Raccourcis clavier quand la section est focalisée
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      if (!el.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        move(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  // 5 cartes visibles: offsets -2, -1, 0, +1, +2
  // Si < 5 items, on duplique circulairement.
  const visible = useMemo(() => {
    const out: { article: Article; offset: -2 | -1 | 0 | 1 | 2 }[] = [];
    if (n === 0) return out;
    const target = [(-2 as const), -1 as const, 0 as const, 1 as const, 2 as const];
    for (const off of target) {
      const idx = index + off;
      out.push({ article: circularAt(base, idx), offset: off });
    }
    return out;
  }, [base, n, index]);

  if (n === 0) {
    return (
      <section className={`source-section ${variant}`}>
        <div className="inner">
          <header className="section-head">
            <h2>{title}</h2>
          </header>
          <p>Aucun article</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`source-section ${variant}`}
      ref={sectionRef as any}
      aria-label={`${title} - carousel d'articles`}
      tabIndex={0}
    >
      <div className="inner">
        <header className="section-head">
          <h2>{title}</h2>
        </header>

        <div className="carousel" role="region">
          <button
            className="carousel-arrow left"
            aria-label="Article précédent"
            onClick={() => move(-1)}
          >
            ‹
          </button>

          <div className="carousel-viewport" aria-live="polite">
            {visible.map(({ article, offset }) => (
                <a
                    key={`${article.id}-${offset}`}
                    href={article.url}
                    target="_blank"
                    rel="noopener"
                    className={`card card-pos-${offset}`}
                    data-offset={offset}
                    aria-current={offset === 0 ? "true" : undefined}
                    aria-hidden={offset === 0 ? undefined : true}
                    tabIndex={offset === 0 ? 0 : -1}
                >
                <div className="thumb">
                  {article.cover ? (
                    <img
                      src={article.cover}
                      alt={article.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="thumb-placeholder" />
                  )}
                </div>
                <div className="meta">
                  <h3 className="title">{article.title}</h3>
                  <p className="date">
                    {new Date(article.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <button
            className="carousel-arrow right"
            aria-label="Article suivant"
            onClick={() => move(1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
