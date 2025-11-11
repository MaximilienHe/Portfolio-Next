import type { Metadata } from "next";
import "./style.css";
import { getAllLatestArticles } from "@/lib/fetchArticles";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import CarouselSection from "../../components/CarouselSection";

export const metadata: Metadata = {
  title: "Articles – Maximilien Herr",
  description:
    "Derniers articles publiés sur Frandroid, DroidSoft et Le Café du Geek.",
  alternates: { canonical: "https://maximilienherr.fr/articles" },
};

type Article = {
  source: "DroidSoft" | "Le Café du Geek" | "Frandroid";
  id: string;
  title: string;
  url: string;
  date: string;
  cover?: string | null;
};

export default async function ArticlesPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
    { name: "Articles", url: "https://maximilienherr.fr/articles" },
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

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <main className="articlesPage">
        <div className="inner">
          <h1 className="page-title">Mes derniers articles</h1>
          <p className="page-sub">
            Agrégation automatique depuis Frandroid, DroidSoft et Le Café du Geek.
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
          title="Le Café du Geek"
          variant="lcdg"
          items={(bySource["Le Café du Geek"] || []).slice(0, 18)}
        />

        {/* Fallback simple si JS désactivé */}
        <noscript>
          <div className="inner">
            <h2>Liste des articles</h2>
            <div className="noscript-grid">
              {all.map((a) => (
                <a key={a.id} className="card" href={a.url} target="_blank" rel="noopener">
                  <div className="thumb">
                    {a.cover ? (
                      <img src={a.cover} alt={a.title} loading="lazy" decoding="async" />
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
