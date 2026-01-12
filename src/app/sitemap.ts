import type { MetadataRoute } from "next";
import { getAllEntries } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://maximilienherr.fr";

  const staticUrls = [
    { path: "", priority: 1 },
    { path: "/projets", priority: 0.7 },
    { path: "/blog", priority: 0.7 },
    { path: "/cv", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/nr", priority: 0.7 },
  ].map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    priority,
  }));

  const blog = getAllEntries("blog").map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    priority: 0.6,
  }));

  const projets = getAllEntries("projets").map((p) => ({
    url: `${base}/projets/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    priority: 0.6,
  }));

  return [...staticUrls, ...blog, ...projets];
}
