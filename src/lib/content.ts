// src/lib/content.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentType = "blog" | "projets";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type EntryMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags?: string[];
  cover?: string;
  canonical?: string;
  draft?: boolean;
};

export type Entry = EntryMeta & { body: string };

function dirFor(type: ContentType) {
  return path.join(CONTENT_DIR, type);
}

export function getAllEntries(type: ContentType): EntryMeta[] {
  const files = fs.readdirSync(dirFor(type)).filter((f) => f.endsWith(".mdx"));
  const entries = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dirFor(type), file), "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      updated: data.updated ? String(data.updated) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      cover: data.cover ? String(data.cover) : undefined,
      canonical: data.canonical ? String(data.canonical) : undefined,
      draft: Boolean(data.draft ?? false),
    } satisfies EntryMeta;
  });

  return entries
    .filter((e) => !e.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getEntry(type: ContentType, slug: string): Entry {
  const raw = fs.readFileSync(path.join(dirFor(type), `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    canonical: data.canonical ? String(data.canonical) : undefined,
    draft: Boolean(data.draft ?? false),
    body: content,
  };
}
