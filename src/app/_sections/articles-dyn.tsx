// src/app/_sections/articles-dyn.tsx
// Server Component — le contenu est dans le HTML initial (visible par Googlebot)
import { getAllLatestArticles } from "@/lib/fetchArticles";

function normalizeCoverSrc(src?: string | null): string | null {
  if (!src) return null;
  const value = src.trim();
  if (!value) return null;
  if (value.startsWith("//")) return `https:${value}`;
  return value;
}

export default async function ArticlesDyn() {
  let data: any[];
  try {
    data = await getAllLatestArticles({
      perDroidsoft: 10,
      perLcdg: 10,
      perFrandroid: 10,
      maxTotal: 24,
    });
  } catch {
    data = [];
  }

  if (!data.length) {
    return null;
  }

  return (
    <section className="articles" id="articles">
      <div className="container">
        <h2>Mes derniers articles</h2>
        <div className="multiArticles two-column" style={{ flexWrap: "wrap" }}>
          {data.map((a) => {
            const coverSrc = normalizeCoverSrc(a.cover);

            return (
              <a
                key={a.id}
                href={a.url}
                target="_blank"
                rel="noopener"
                className="singleArticle"
              >
                <div className="article">
                  <div className="articleImgWrapper">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverSrc ?? "/images/articles/placeholder.webp"}
                      alt={coverSrc ? a.title : ""}
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="articleDetail">
                    <h3>{a.title}</h3>
                    <p style={{ color: "#fff" }}>
                      {a.source} -{" "}
                      {new Date(a.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
