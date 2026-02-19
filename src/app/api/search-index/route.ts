// src/app/api/search-index/route.ts
// Dynamic search index based on real content files (plus stable static pages).

import { NextResponse } from "next/server";
import { getAllEntries } from "@/lib/content";
import { getAllLatestArticles } from "@/lib/fetchArticles";

export const runtime = "nodejs";
export const revalidate = 600;

export type SearchEntry = {
  title: string;
  description: string;
  url: string;
  type: "projet" | "blog" | "page" | "article";
  tags?: string[];
  date?: string;
};

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
    tags: ["cv", "expériences", "compétences", "formation", "isima", "smartfluence"],
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

function uniqByUrl(entries: SearchEntry[]): SearchEntry[] {
  const seen = new Set<string>();
  const unique: SearchEntry[] = [];
  for (const entry of entries) {
    if (seen.has(entry.url)) continue;
    seen.add(entry.url);
    unique.push(entry);
  }
  return unique;
}

function getDynamicProjectEntries(): SearchEntry[] {
  return getAllEntries("projets").map((project) => ({
    title: project.title,
    description: project.description || "",
    url: `/projets/${project.slug}`,
    type: "projet" as const,
    tags: project.tags ?? [],
    date: project.date || undefined,
  }));
}

function getDynamicBlogEntries(): SearchEntry[] {
  return getAllEntries("blog").map((post) => ({
    title: post.title,
    description: post.description || "",
    url: `/blog/${post.slug}`,
    type: "blog" as const,
    tags: post.tags ?? [],
    date: post.date || undefined,
  }));
}

async function getDynamicArticleEntries(): Promise<SearchEntry[]> {
  const articlesPromise = getAllLatestArticles({
    perDroidsoft: 6,
    perLcdg: 6,
    perFrandroid: 6,
    maxTotal: 18,
  })
    .then((latestArticles) =>
      latestArticles.map((article) => ({
        title: article.title,
        description: `Article ${article.source} publié le ${new Date(article.date).toLocaleDateString("fr-FR")}.`,
        url: article.url,
        type: "article" as const,
        tags: ["article", article.source.toLowerCase()],
        date: article.date,
      }))
    )
    .catch(() => []);

  const timeoutPromise = new Promise<SearchEntry[]>((resolve) => {
    setTimeout(() => resolve([]), 1500);
  });

  return Promise.race([articlesPromise, timeoutPromise]);
}

export async function GET() {
  const articleEntries = await getDynamicArticleEntries();

  const index = uniqByUrl([
    ...STATIC_PAGES,
    ...getDynamicProjectEntries(),
    ...getDynamicBlogEntries(),
    ...articleEntries,
  ]);

  return NextResponse.json(index);
}
