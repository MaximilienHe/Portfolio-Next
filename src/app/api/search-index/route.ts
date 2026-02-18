// src/app/api/search-index/route.ts
// API route qui génère l'index de recherche au build time (ISR ou static)
// Next.js va le cacher automatiquement → 0 coût runtime

import { NextResponse } from "next/server";

// ─── ADAPTER : importe tes fonctions de contenu existantes ───
// Si ta lib s'appelle autrement, adapte l'import
// import { getAllEntries } from "@/lib/content";
// import { getAllProjects } from "@/data/projects";

export type SearchEntry = {
  title: string;
  description: string;
  url: string;
  type: "projet" | "blog" | "page" | "article";
  tags?: string[];
  date?: string;
};

// ─── Pages statiques (toujours indexées) ───
const STATIC_PAGES: SearchEntry[] = [
  {
    title: "Accueil",
    description:
      "Portfolio de Maximilien Herr, ingénieur logiciel et journaliste tech.",
    url: "/",
    type: "page",
  },
  {
    title: "CV",
    description:
      "Parcours, expériences professionnelles, formations et compétences techniques de Maximilien Herr.",
    url: "/cv",
    type: "page",
    tags: ["cv", "expériences", "compétences", "formation", "ISIMA", "Smartfluence"],
  },
  {
    title: "Contact",
    description:
      "Contactez Maximilien Herr pour un projet web, une collaboration ou toute demande.",
    url: "/contact",
    type: "page",
    tags: ["contact", "email", "linkedin"],
  },
  {
    title: "Articles",
    description:
      "Derniers articles publiés sur Frandroid, DroidSoft et Le Café du Geek.",
    url: "/articles",
    type: "page",
    tags: ["articles", "frandroid", "droidsoft", "le café du geek", "journalisme"],
  },
  {
    title: "Numérique Responsable",
    description:
      "Approche et réalisations autour du numérique responsable et de la sobriété numérique.",
    url: "/nr",
    type: "page",
    tags: ["numérique responsable", "green it", "sobriété", "éco-conception"],
  },
  {
    title: "Projets",
    description:
      "Réalisations techniques : applications web, outils, projets académiques et personnels.",
    url: "/projets",
    type: "page",
    tags: ["projets", "portfolio", "réalisations"],
  },
  {
    title: "Blog",
    description: "Notes, retours d'expérience et articles de blog.",
    url: "/blog",
    type: "page",
    tags: ["blog", "articles", "retours"],
  },
];

export async function GET() {
  // ─── Projets dynamiques (MDX) ───
  // ADAPTER : décommente et adapte selon ta lib de contenu
  // Exemple si tu utilises getAllEntries("projets") :
  //
  // const projets = getAllEntries("projets").map((p) => ({
  //   title: p.title,
  //   description: p.description || "",
  //   url: `/projets/${p.slug}`,
  //   type: "projet" as const,
  //   tags: p.tags || [],
  //   date: p.date,
  // }));

  // Fallback statique basé sur tes URLs GSC connues :
  const projets: SearchEntry[] = [
    {
      title: "Comparaison Algorithmique",
      description: "Visualisation et comparaison d'algorithmes de tri et de recherche.",
      url: "/projets/comparaison-algorithmique",
      type: "projet",
      tags: ["algorithmes", "tri", "visualisation"],
    },
    {
      title: "Twitch Tracker",
      description: "Application de suivi de streamers Twitch en temps réel.",
      url: "/projets/twitch-tracker",
      type: "projet",
      tags: ["twitch", "streaming", "tracker", "API"],
    },
    {
      title: "DroidSoft App",
      description: "Application mobile pour le média DroidSoft.",
      url: "/projets/droidsoft-app",
      type: "projet",
      tags: ["android", "mobile", "droidsoft", "application"],
    },
    {
      title: "ASCII Art",
      description: "Générateur d'art ASCII à partir d'images.",
      url: "/projets/ascii-art",
      type: "projet",
      tags: ["ascii", "art", "image", "générateur"],
    },
    {
      title: "Blog sans CMS",
      description: "Création d'un blog statique sans système de gestion de contenu.",
      url: "/projets/blog-sans-cms",
      type: "projet",
      tags: ["blog", "statique", "MDX", "Next.js"],
    },
    {
      title: "Game Jam BDD",
      description: "Projet de game jam avec base de données.",
      url: "/projets/game-jam-bdd",
      type: "projet",
      tags: ["game jam", "jeu", "base de données"],
    },
    {
      title: "Temple 3D",
      description: "Modélisation et visualisation 3D d'un temple.",
      url: "/projets/temple-3D",
      type: "projet",
      tags: ["3D", "modélisation", "three.js", "WebGL"],
    },
    {
      title: "Réchauffement Climatique",
      description: "Visualisation de données sur le réchauffement climatique.",
      url: "/projets/rechauffement-climatique",
      type: "projet",
      tags: ["climat", "données", "visualisation", "écologie"],
    },
    {
      title: "T2C Screen",
      description: "Écran d'affichage pour les transports en commun T2C.",
      url: "/projets/t2c-screen",
      type: "projet",
      tags: ["transport", "T2C", "affichage", "temps réel"],
    },
  ];

  // ─── Blog dynamique (MDX) ───
  // ADAPTER : même logique que projets
  // const blog = getAllEntries("blog").map(...)
  const blog: SearchEntry[] = [
    {
      title: "Blog en construction",
      description: "Le blog est en cours de mise en place.",
      url: "/blog/blog-en-construction",
      type: "blog",
      tags: ["blog", "construction"],
    },
  ];

  const index = [...STATIC_PAGES, ...projets, ...blog];

  return NextResponse.json(index, {
    headers: {
      // Cache 1 heure en production, revalidate au build
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
