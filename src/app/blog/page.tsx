import type { Metadata } from "next";
import Link from "next/link";
import { getAllEntries } from "@/lib/content";

const pageUrl = "https://maximilienherr.fr/blog";
const pageTitle = "Blog";
const fullTitle = "Blog | Maximilien Herr";
const pageDescription = "Notes, retours d experience et articles personnels.";
const ogImage = "https://maximilienherr.fr/banniere_dev_redac.png";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: fullTitle,
    description: pageDescription,
    images: [{ url: ogImage, alt: "Banniere Maximilien Herr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: pageDescription,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
  keywords: ["blog", "retours d experience", "articles personnels", "tech"],
};

export default function BlogIndex() {
  const posts = getAllEntries("blog");
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: fullTitle,
    url: pageUrl,
    description: pageDescription,
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://maximilienherr.fr/blog/${post.slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://maximilienherr.fr/blog/${post.slug}`,
      },
    })),
  };

  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <h1>Blog</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            <div>{p.description}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
