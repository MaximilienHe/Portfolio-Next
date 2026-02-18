// /src/app/cv/page.tsx
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

export const metadata: Metadata = {
  title: "Maximilien Herr - CV",
  description: "CV de Maximilien Herr : expériences, formations et compétences techniques.",
  alternates: { canonical: "https://maximilienherr.fr/cv" },
  openGraph: {
    type: "profile",
    url: "https://maximilienherr.fr/cv",
    title: "Maximilien Herr - CV",
    description: "Parcours, expériences et compétences de Maximilien Herr.",
    images: [{
      url: "https://maximilienherr.fr/banniere_dev_redac.png",
      width: 1200,
      height: 630,
      alt: "Bannière CV Maximilien Herr",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maximilien Herr - CV",
    description: "Parcours, expériences et compétences de Maximilien Herr.",
    images: ["https://maximilienherr.fr/banniere_dev_redac.png"],
  },
};

export default function Cv() {
  const breadcrumbItems = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
    { name: "CV", url: "https://maximilienherr.fr/cv" },
  ];
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Quote />
      <Xp />
      <Formations />
      <Skills />
      <Interest />
      <Download />
      <ExploreAlso currentPath="/cv" />
    </>
  );
}
