"use client";
// src/components/SearchBar.tsx
// Barre de recherche dans le header avec overlay modal de résultats instantanés

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { search, type SearchEntry, type SearchResult } from "@/lib/search";

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

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Charger l'index au premier ouverture (lazy)
  useEffect(() => {
    if (open && !index) {
      fetch("/api/search-index")
        .then((r) => r.json())
        .then((data) => setIndex(data))
        .catch(console.error);
    }
    if (open) {
      // Focus l'input après l'animation
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, index]);

  // Recherche à chaque frappe
  useEffect(() => {
    if (!index || !query.trim()) {
      setResults([]);
      setSelectedIdx(-1);
      return;
    }
    const r = search(index, query, 8);
    setResults(r);
    setSelectedIdx(-1);
  }, [query, index]);

  // Raccourci clavier Ctrl+K / Cmd+K
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const navigate = useCallback(
    (url: string) => {
      setOpen(false);
      setQuery("");
      router.push(url);
    },
    [router]
  );

  // Navigation clavier dans les résultats
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIdx >= 0 && results[selectedIdx]) {
        navigate(results[selectedIdx].url);
      } else if (query.trim()) {
        navigate(`/recherche?q=${encodeURIComponent(query)}`);
      }
    }
  }

  return (
    <>
      {/* Bouton trigger dans le header */}
      <button
        className="search-trigger"
        onClick={() => setOpen(true)}
        aria-label="Rechercher sur le site"
        type="button"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="search-trigger-text">Rechercher</span>
        <kbd className="search-kbd">⌘K</kbd>
      </button>

      {/* Modal overlay */}
      {isMounted &&
        open &&
        createPortal(
        <div
          className="search-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Recherche"
        >
          <div className="search-modal">
            {/* Input */}
            <div className="search-input-wrap">
              <svg
                className="search-input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                className="search-input"
                placeholder="Rechercher un projet, une page, un article…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck={false}
              />
              <button
                className="search-close"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                type="button"
              >
                <kbd>Esc</kbd>
              </button>
            </div>

            {/* Résultats */}
            <div className="search-results" role="listbox">
              {query.trim() && results.length === 0 && index && (
                <div className="search-empty">
                  Aucun résultat pour &laquo;&nbsp;{query}&nbsp;&raquo;
                </div>
              )}
              {results.map((r, i) => (
                <button
                  key={r.url}
                  className={`search-result ${i === selectedIdx ? "search-result--active" : ""}`}
                  onClick={() => navigate(r.url)}
                  onMouseEnter={() => setSelectedIdx(i)}
                  role="option"
                  aria-selected={i === selectedIdx}
                  type="button"
                >
                  <span
                    className="search-result-type"
                    style={{
                      backgroundColor: TYPE_COLORS[r.type] || "#888",
                    }}
                  >
                    {TYPE_LABELS[r.type] || r.type}
                  </span>
                  <div className="search-result-content">
                    <span
                      className="search-result-title"
                      dangerouslySetInnerHTML={{ __html: r.highlightedTitle }}
                    />
                    <span
                      className="search-result-desc"
                      dangerouslySetInnerHTML={{
                        __html: r.highlightedDescription,
                      }}
                    />
                  </div>
                  <svg
                    className="search-result-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Footer */}
            {query.trim() && results.length > 0 && (
              <div className="search-footer">
                <button
                  className="search-footer-link"
                  onClick={() =>
                    navigate(`/recherche?q=${encodeURIComponent(query)}`)
                  }
                  type="button"
                >
                  Voir tous les résultats →
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
