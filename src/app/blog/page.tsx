import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./style.css";
import { getAllEntries } from "@/lib/content";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";

const pageUrl = "https://maximilienherr.fr/blog";
const pageTitle = "Blog";
const fullTitle = "Blog | Maximilien Herr";
const pageDescription = "Notes, retours d experience et articles personnels.";
const ogImage = "https://maximilienherr.fr/banniere_dev_redac.png";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
    types: { "application/rss+xml": `${pageUrl}/rss.xml` },
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: fullTitle,
    description: pageDescription,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Banniere Maximilien Herr" }],
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
  const breadcrumbItems = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
    { name: "Blog", url: pageUrl },
  ];
  const pattern = ["wide", "tall", "medium", "short", "mini", "wide", "medium", "tall"];
  const now = Date.now();
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
    <>
      <Breadcrumb items={breadcrumbItems} />
      <main className="container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <h1>Blog</h1>
        <p className="blog-intro">Billets, humeurs et retours d&apos;expérience. Quelques cartes pour explorer.</p>

        <div className="blog-masonry">
          {posts.map((p, idx) => {
            const variant = pattern[idx % pattern.length];
            const isLcpCandidate = idx === 0;
            const date = new Date(p.date);
            const days = Math.max(0, Math.floor((now - date.getTime()) / (1000 * 60 * 60 * 24)));
            const dateLabel =
              days <= 7
                ? `Il y a ${days === 0 ? "moins d'un jour" : `${days} jour${days > 1 ? "s" : ""}`}`
                : date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

            return (
              <Link key={p.slug} href={`/blog/${p.slug}`} className={`blog-card card-${variant}`}>
                <div className="blog-card-thumb">
                  {p.cover ? (
                    <div className="blog-card-imgwrap">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        quality={70}
                        sizes="(max-width: 768px) 100vw, 420px"
                        style={{ objectFit: "cover" }}
                        priority={isLcpCandidate}
                        loading={isLcpCandidate ? "eager" : "lazy"}
                        fetchPriority={isLcpCandidate ? "high" : "auto"}
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div className="blog-card-placeholder" aria-hidden />
                  )}
                  <div className="blog-card-chip">{dateLabel}</div>
                </div>
                <div className="blog-card-body">
                  <h3 className="blog-card-title">{p.title}</h3>
                  <p className="blog-card-desc">{p.description}</p>
                  {p.tags?.length ? (
                    <div className="blog-card-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="blog-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>

        <ExploreAlso currentPath="/blog" />
      </main>
    </>
  );
}
