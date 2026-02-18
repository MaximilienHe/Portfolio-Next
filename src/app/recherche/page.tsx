"use client";
// src/app/recherche/page.tsx
// Page de résultats de recherche — full client-side

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { search, type SearchEntry, type SearchResult } from "@/lib/search";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";

const TYPE_LABELS: Record<string, string> = {
  page: "Page",
  projet: "Projet",
  blog: "Blog",
  article: "Article",
};

const TYPE_COLORS: Record<string, string> = {
  page: "#b87333",
  projet: "#5a8a5e",
  blog: "#6b7db3",
  article: "#b35a5a",
};

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [inputValue, setInputValue] = useState(q);

  // Charger l'index
  useEffect(() => {
    fetch("/api/search-index")
      .then((r) => r.json())
      .then(setIndex)
      .catch(console.error);
  }, []);

  // Rechercher quand l'index ou la query change
  useEffect(() => {
    if (!index) return;
    const query = inputValue || q;
    if (query.trim()) {
      setResults(search(index, query, 30));
    } else {
      setResults([]);
    }
  }, [index, inputValue, q]);

  // Sync inputValue avec le query param au mount
  useEffect(() => {
    if (q && !inputValue) setInputValue(q);
  }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeQuery = inputValue || q;

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Accueil", url: "https://maximilienherr.fr" },
          { name: "Recherche", url: "https://maximilienherr.fr/recherche" },
        ]}
      />

      <section className="recherche-page">
        <div className="container">
          <h1>Recherche</h1>

          <div className="recherche-input-wrap">
            <input
              type="search"
              className="recherche-input"
              placeholder="Rechercher un projet, une page, un article…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
          </div>

          {activeQuery.trim() && (
            <p className="recherche-count">
              {results.length} résultat{results.length !== 1 ? "s" : ""} pour
              &laquo;&nbsp;{activeQuery}&nbsp;&raquo;
            </p>
          )}

          <div className="recherche-results">
            {results.map((r) => (
              <Link
                key={r.url}
                href={r.url}
                className="recherche-result-card"
              >
                <div className="recherche-result-header">
                  <span
                    className="recherche-result-type"
                    style={{
                      backgroundColor: TYPE_COLORS[r.type] || "#888",
                    }}
                  >
                    {TYPE_LABELS[r.type] || r.type}
                  </span>
                  <span
                    className="recherche-result-title"
                    dangerouslySetInnerHTML={{ __html: r.highlightedTitle }}
                  />
                </div>
                <span
                  className="recherche-result-desc"
                  dangerouslySetInnerHTML={{
                    __html: r.highlightedDescription,
                  }}
                />
                <span className="recherche-result-url">{r.url}</span>
              </Link>
            ))}
          </div>

          {activeQuery.trim() && results.length === 0 && index && (
            <div className="recherche-empty">
              <p>
                Aucun résultat trouvé. Essayez avec d&apos;autres termes ou
                explorez les sections ci-dessous.
              </p>
            </div>
          )}
        </div>
      </section>

      <ExploreAlso currentPath="/recherche" />
    </>
  );
}

export default function RecherchePage() {
  return (
    <Suspense
      fallback={
        <section className="recherche-page">
          <div className="container">
            <h1>Recherche</h1>
            <p>Chargement…</p>
          </div>
        </section>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
