import { NextResponse } from "next/server";
import { getAllEntries } from "@/lib/content";

export const revalidate = 3600;

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const base = "https://maximilienherr.fr";
  const posts = getAllEntries("blog");

  const items = posts
    .map((p) => {
      const url = `${base}/blog/${p.slug}`;
      return `
        <item>
          <title>${esc(p.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(p.date).toUTCString()}</pubDate>
          <description>${esc(p.description)}</description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Blog | Maximilien Herr</title>
      <link>${base}/blog</link>
      <description>Articles et notes</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
