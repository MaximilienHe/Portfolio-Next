import type { Metadata } from "next";
import "./style.css";
import { getAllLatestArticles, type Article } from "@/lib/fetchArticles";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import CarouselSection from "../../components/CarouselSection";

const pageUrl = "https://maximilienherr.fr/articles";
const pageTitle = "Articles";
const fullTitle = "Articles | Maximilien Herr";
const pageDescription =
  "Derniers articles publies sur Frandroid, DroidSoft et Le Café du Geek.";
const ogImage = "https://maximilienherr.fr/banniere_dev_redac.png";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: fullTitle,
    description: pageDescription,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Banniere Maximilien Herr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: pageDescription,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
  keywords: ["articles", "Frandroid", "DroidSoft", "Le Café du Geek", "portfolio"],
};

export default async function ArticlesPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
    { name: "Articles", url: pageUrl },
  ];

  const all = await getAllLatestArticles({
    perDroidsoft: 12,
    perLcdg: 12,
    perFrandroid: 12,
    maxTotal: 60,
  });

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
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesJsonLd) }}
      />
      <main className="articlesPage">
        <div className="inner">
          <h1 className="page-title">Mes derniers articles</h1>
          <p className="page-sub">
            Agregation automatique depuis Frandroid, DroidSoft et Le Café du Geek.
          </p>
        </div>

        <CarouselSection
          title="Frandroid"
          variant="frandroid"
          items={(bySource["Frandroid"] || []).slice(0, 18)}
        />

        <CarouselSection
          title="DroidSoft"
          variant="droidsoft"
          items={(bySource["DroidSoft"] || []).slice(0, 18)}
        />

        <CarouselSection
          title="Le Cafe du Geek"
          variant="lcdg"
          items={(bySource["Le Café du Geek"] || []).slice(0, 18)}
        />

        {/* Fallback simple si JS desactive */}
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
                    <p className="date">
                      {new Date(a.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </noscript>
      </main>
    </>
  );
}
