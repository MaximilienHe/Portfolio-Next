// /src/app/_sections/articles.tsx
"use client";

import ImageOptimize from "@/components/imageOptimization";
import articleSections from "@/data/articleSections";  // ta config “sectionnée”
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
              <ImageOptimize
                src={logos[section.logoKey]}
                alt={`${section.sourceName} logo`}
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
                      {/* on passe directement l'objet articleData à ImageOptimize */}
                      <ImageOptimize
                        src={artMeta}
                        alt={art.alt}
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
