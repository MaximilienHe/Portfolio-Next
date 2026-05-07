import type { MetadataRoute } from "next";
import { getAllEntries } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;

  const staticPages = [
    { path: "", lastModified: "2026-05-06", priority: 1 },
    { path: "/projets", lastModified: "2026-05-06", priority: 0.7 },
    { path: "/blog", lastModified: "2026-02-22", priority: 0.7 },
    { path: "/articles", lastModified: "2026-05-06", priority: 0.7 },
    { path: "/cv", lastModified: "2026-05-06", priority: 0.7 },
    { path: "/contact", lastModified: "2026-02-22", priority: 0.7 },
    { path: "/nr", lastModified: "2026-02-22", priority: 0.7 },
  ];

  const staticUrls = staticPages.map(({ path: pathname, lastModified, priority }) => ({
    url: `${base}${pathname}`,
    lastModified: new Date(lastModified),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const blog = getAllEntries("blog")
    .filter((p) => !p.noindex)
    .map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date ?? Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const projets = getAllEntries("projets")
    .filter((p) => !p.noindex)
    .map((p) => ({
      url: `${base}/projets/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date ?? Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticUrls, ...blog, ...projets];
}
