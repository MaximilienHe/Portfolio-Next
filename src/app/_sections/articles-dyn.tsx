// src/app/_sections/articles-dyn.tsx
"use client";

import { useEffect, useState } from "react";

type Article = {
  source: string;
  id: string;
  title: string;
  url: string;
  date: string;
  cover?: string | null;
};

export default function ArticlesDyn() {
  const [data, setData] = useState<Article[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/latest-articles")
      .then(r => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(setData)
      .catch(e => setErr(typeof e === "string" ? e : "Erreur de chargement"));
  }, []);

  return (
    <section className="articles" id="articles">
      <div className="container">
        <h1>Mes derniers articles</h1>
        {err && <p>{err}</p>}
        <div className="multiArticles two-column" style={{ flexWrap: "wrap" }}>
          {data.map(a => (
            <a key={a.id} href={a.url} target="_blank" rel="noopener" className="singleArticle">
              <div className="article">
                {a.cover ? (
                  <img src={a.cover} alt={a.title} loading="lazy" decoding="async" />
                ) : (
                  <img src="/images/articles/placeholder.webp" alt="" loading="lazy" />
                )}
                <div className="articleDetail">
                  <h3>{a.title}</h3>
                <p style={{ color: "#fff" }}>{a.source} - {new Date(a.date).toLocaleDateString("fr-FR")}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
