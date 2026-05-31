import type { Metadata } from "next";
import "./style.css";
import { getAllLatestArticles, type Article } from "@/lib/fetchArticles";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";
import ArticlesFeed from "./_components/ArticlesFeed";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo";

const pagePath = "/articles";
const pageUrl = getCanonicalUrl(pagePath);
const pageTitle = "Articles";
const fullTitle = "Articles | Maximilien Herr";
const pageDescription =
  "Derniers articles publiés sur Frandroid, DroidSoft et Le Café du Geek.";

export const metadata: Metadata = buildPageMetadata({
  path: pagePath,
  title: pageTitle,
  description: pageDescription,
  ogTitle: fullTitle,
  keywords: [
    "articles",
    "Frandroid",
    "DroidSoft",
    "Le Café du Geek",
    "portfolio",
  ],
});

const INITIAL_PER_SOURCE = 10;

export default async function ArticlesPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: getCanonicalUrl("/") },
    { name: "Articles", url: pageUrl },
  ];

  let initial: Article[] = [];
  let initialHasMore = false;
  try {
    initial = await getAllLatestArticles({
      perDroidsoft: INITIAL_PER_SOURCE,
      perLcdg: INITIAL_PER_SOURCE,
      perFrandroid: INITIAL_PER_SOURCE,
      maxTotal: INITIAL_PER_SOURCE * 3 + 6,
      page: 1,
    });
    const paginableCount = initial.filter(
      (a) => a.source === "DroidSoft" || a.source === "Le Café du Geek",
    ).length;
    initialHasMore = paginableCount >= INITIAL_PER_SOURCE;
  } catch (error) {
    console.warn("[articles/page] latest articles fetch failed:", error);
  }

  const articlesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: fullTitle,
    description: pageDescription,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: initial.length,
      itemListElement: initial.slice(0, 12).map((article, index) => ({
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
      <main className="articlesPage">
        <div className="inner">
          <span className="kicker">04 · Sur le kiosque</span>
          <h1 className="page-title">Mes derniers articles parus.</h1>
          <p className="page-sub">
            Flux unifié des publications sur Frandroid, DroidSoft et Le Café
            du Geek — branché aux flux RSS et à l&apos;API WordPress, mis à
            jour automatiquement. Filtre par média et scroll infini.
          </p>

          <ArticlesFeed
            initial={initial}
            initialPage={1}
            initialHasMore={initialHasMore}
            perSource={INITIAL_PER_SOURCE}
          />
        </div>

        <ExploreAlso currentPath="/articles" />
      </main>
    </>
  );
}
