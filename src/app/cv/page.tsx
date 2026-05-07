import "./style.css";
import type { Metadata } from "next";
import Quote from "./_sections/quote";
import Xp from "./_sections/xp";
import Skills from "./_sections/skills";
import Interest from "./_sections/interest";
import Formations from "./_sections/formations";
import Download from "./_sections/download";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo";

const pagePath = "/cv";
const pageUrl = getCanonicalUrl(pagePath);
const pageTitle = "CV";

export const metadata: Metadata = buildPageMetadata({
  path: pagePath,
  title: pageTitle,
  description: "CV de Maximilien Herr : expériences, formations, compétences et domaines d'intérêt.",
  ogTitle: "Maximilien Herr - CV",
  type: "profile",
  keywords: ["cv", "ingénieur logiciel", "journaliste tech", "compétences"],
});

export default function Cv() {
  const breadcrumbItems = [
    { name: "Accueil", url: getCanonicalUrl("/") },
    { name: "CV", url: pageUrl },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="cv-page-title">CV de Maximilien Herr</h1>
      <nav className="cv-quick-nav" aria-label="Navigation rapide CV">
        <a href="#cv-xp">Expériences</a>
        <a href="#cv-formations">Formation</a>
        <a href="#cv-skills">Compétences</a>
        <a href="#cv-interest">Centres d&apos;intérêt</a>
        <a href="#cv-download">Téléchargement</a>
      </nav>
      <Quote />
      <div id="cv-xp">
        <Xp />
      </div>
      <div id="cv-formations">
        <Formations />
      </div>
      <div id="cv-skills">
        <Skills />
      </div>
      <div id="cv-interest">
        <Interest />
      </div>
      <div id="cv-download">
        <Download />
      </div>
      <ExploreAlso currentPath="/cv" />
    </>
  );
}
