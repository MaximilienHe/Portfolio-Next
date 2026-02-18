// /src/app/_sections/articles.tsx
"use client";

import articleSections from "@/data/articleSections";  // ta config “sectionnée”
import Image from "next/image";
import articlesData from "@/data/articles";           // méta‑data ARTICLES
import logos from "@/data/logos";                     // méta‑data LOGOS

export default function Articles() {
  return (
    <section className="articles" id="articles">
      <div className="container">
        <h1>Une sélection de mes articles</h1>

        {articleSections.map((section) => (
          <div key={section.sourceName}>
            {/* -- LE LOGO DE LA SOURCE -- */}
            <div className="media">
              <Image
                src={logos[section.logoKey].image}
                width={logos[section.logoKey].width}
                height={logos[section.logoKey].height}
                alt={`Logo ${section.sourceName}, media ou ecrit Maximilien Herr`}
                className="logo"
              />
              <h2 style={{ marginBottom: 0 }}>{section.sourceName}</h2>
            </div>

            {/* -- LES ARTICLES DE CETTE SOURCE -- */}
            <div className="multiArticles">
              {section.articles.map((art) => {
                const artMeta = articlesData[art.imageKey];
                if (!artMeta) {
                  console.warn(`⚠️ article key non trouvé: ${art.imageKey}`);
                  return null;
                }
                return (
                  <a
                    key={art.id}
                    href={art.href}
                    target="_blank"
                    rel="noopener"
                    className="singleArticle"
                  >
                    <div className="article">
                      <Image
                        src={artMeta.image}
                        width={artMeta.width}
                        height={artMeta.height}
                        alt={`Illustration de l'article ${art.title}, redige par Maximilien Herr`}
                      />
                      <div className="articleDetail">
                        <h3>{art.title}</h3>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
