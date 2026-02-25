import type { Metadata } from "next";
import "./style.css";
import { getAllLatestArticles, type Article } from "@/lib/fetchArticles";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";
import CarouselSection from "../../components/CarouselSection";
import { droidsoftFont, frandroidFont, lcdgFont } from "./fonts";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo";

const pagePath = "/articles";
const pageUrl = getCanonicalUrl(pagePath);
const pageTitle = "Articles";
const fullTitle = "Articles | Maximilien Herr";
const pageDescription = "Derniers articles publiés sur Frandroid, DroidSoft et Le Café du Geek.";

export const metadata: Metadata = buildPageMetadata({
  path: pagePath,
  title: pageTitle,
  description: pageDescription,
  ogTitle: fullTitle,
  keywords: ["articles", "Frandroid", "DroidSoft", "Le Café du Geek", "portfolio"],
});

export default async function ArticlesPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: getCanonicalUrl("/") },
    { name: "Articles", url: pageUrl },
  ];

  let all: Article[] = [];
  try {
    all = await getAllLatestArticles({
      perDroidsoft: 12,
      perLcdg: 12,
      perFrandroid: 12,
      maxTotal: 60,
    });
  } catch (error) {
    console.warn("[articles/page] latest articles fetch failed:", error);
  }

  const bySource = all.reduce<Record<string, Article[]>>((acc, a) => {
    (acc[a.source] ||= []).push(a);
    return acc;
  }, {});

  const articlesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: fullTitle,
    description: pageDescription,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListElement: all.slice(0, 12).map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          name: article.title,
          url: article.url,
        },
      })),
    },
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesJsonLd) }}
      />
      <main
        className={`articlesPage ${frandroidFont.variable} ${droidsoftFont.variable} ${lcdgFont.variable}`}
      >
        <div className="inner">
          <h1 className="page-title">Mes derniers articles</h1>
          <p className="page-sub">
            Agrégation automatique depuis Frandroid, DroidSoft et Le Café du Geek.
          </p>
        </div>

        <CarouselSection
          title="Frandroid"
          variant="frandroid"
          prioritizeLcp
          items={(bySource["Frandroid"] || []).slice(0, 18)}
        />

        <CarouselSection
          title="DroidSoft"
          variant="droidsoft"
          items={(bySource["DroidSoft"] || []).slice(0, 18)}
        />

        <CarouselSection
          title="Le Café du Geek"
          variant="lcdg"
          items={((bySource["Le Café du Geek"] || bySource["Le Cafe du Geek"]) || []).slice(0, 18)}
        />

        <noscript>
          <div className="inner">
            <h2>Liste des articles</h2>
            <div className="noscript-grid">
              {all.map((a) => (
                <a key={a.id} className="card" href={a.url} target="_blank" rel="noopener">
                  <div className="thumb">
                    {a.cover ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={a.cover} alt={a.title} loading="lazy" decoding="async" />
                      </>
                    ) : (
                      <div className="thumb-placeholder" />
                    )}
                  </div>
                  <div className="meta">
                    <h3 className="title">{a.title}</h3>
                    <p className="date">{new Date(a.date).toLocaleDateString("fr-FR")}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </noscript>
        <ExploreAlso currentPath="/articles" />
      </main>
    </>
  );
}
