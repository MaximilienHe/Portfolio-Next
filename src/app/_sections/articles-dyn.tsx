// src/app/_sections/articles-dyn.tsx
// Server Component — le contenu est dans le HTML initial (visible par Googlebot)
import Image from "next/image";
import { getAllLatestArticles } from "@/lib/fetchArticles";

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
          {data.map((a) => (
            <a
              key={a.id}
              href={a.url}
              target="_blank"
              rel="noopener"
              className="singleArticle"
            >
              <div className="article">
                {a.cover ? (
                  <div className="articleImgWrapper">
                    <Image
                      src={a.cover}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div className="articleImgWrapper">
                    <Image
                      src="/images/articles/placeholder.webp"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className="articleDetail">
                  <h3>{a.title}</h3>
                  <p style={{ color: "#fff" }}>
                    {a.source} -{" "}
                    {new Date(a.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}