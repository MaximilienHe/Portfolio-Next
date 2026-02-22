import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getAllEntries } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

function pageLastModified(relativePath: string) {
  try {
    const stat = fs.statSync(path.join(process.cwd(), "src", "app", relativePath));
    return stat.mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;

  const staticPages = [
    { path: "", file: "page.tsx", priority: 1 },
    { path: "/projets", file: path.join("projets", "page.tsx"), priority: 0.7 },
    { path: "/blog", file: path.join("blog", "page.tsx"), priority: 0.7 },
    { path: "/articles", file: path.join("articles", "page.tsx"), priority: 0.7 },
    { path: "/cv", file: path.join("cv", "page.tsx"), priority: 0.7 },
    { path: "/contact", file: path.join("contact", "page.tsx"), priority: 0.7 },
    { path: "/nr", file: path.join("nr", "page.tsx"), priority: 0.7 },
  ];

  const staticUrls = staticPages.map(({ path: pathname, file, priority }) => ({
    url: `${base}${pathname}`,
    lastModified: pageLastModified(file),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const blog = getAllEntries("blog").map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date ?? Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const projets = getAllEntries("projets").map((p) => ({
    url: `${base}/projets/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date ?? Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...blog, ...projets];
}
