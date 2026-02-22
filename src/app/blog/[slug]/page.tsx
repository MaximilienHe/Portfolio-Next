import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllEntries, getEntry } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { mdxComponents } from "@/lib/mdxComponents";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";
import { buildPageMetadata, DEFAULT_OG_IMAGE, getCanonicalUrl, SITE_NAME } from "@/lib/seo";
import "../style.css";

function getMetaImage(url: string | undefined): string {
  if (!url) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(url)) return url;
  return getCanonicalUrl(url);
}

function getRenderImage(url: string | undefined): string {
  if (!url) return "/banniere_dev_redac.png";
  if (/^https?:\/\//i.test(url)) return url;
  return url;
}

function toCanonicalPath(canonicalUrl: string): string {
  try {
    const parsed = new URL(canonicalUrl);
    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return "/blog";
  }
}

export async function generateStaticParams() {
  return getAllEntries("blog").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  try {
    const post = getEntry("blog", params.slug);
    const canonical = post.canonical ?? getCanonicalUrl(`/blog/${post.slug}`);
    const title = post.seoTitle ?? post.title;
    const description = post.seoDescription ?? post.description;

    return buildPageMetadata({
      path: toCanonicalPath(canonical),
      title,
      description,
      ogTitle: `${title} | ${SITE_NAME}`,
      type: "article",
      image: getMetaImage(post.cover),
      keywords: post.tags,
    });
  } catch {
    return {};
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getEntry("blog", params.slug);
  } catch {
    notFound();
  }

  const content = await renderMdx(post.body, { autolinkHeadings: false, components: mdxComponents });
  const canonical = post.canonical ?? getCanonicalUrl(`/blog/${post.slug}`);
  const metaImage = getMetaImage(post.cover);
  const renderImage = getRenderImage(post.cover);
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.description;

  const displayDate = new Date(post.updated ?? post.date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const breadcrumbItems = [
    { name: "Accueil", url: getCanonicalUrl("/") },
    { name: "Blog", url: getCanonicalUrl("/blog") },
    { name: title, url: canonical },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: [metaImage],
    author: { "@type": "Person", name: "Maximilien Herr", url: getCanonicalUrl("/") },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const faqJsonLd = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <main className="container">
      <Breadcrumb items={breadcrumbItems} />
      <article className="article-page">
        <div className="article-hero">
          <div className="article-hero-media">
            <Image
              src={renderImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 1080px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="article-hero-overlay" />
          <div className="article-hero-meta">
            <p className="article-hero-date">{displayDate}</p>
            <h1 className="article-hero-title">{title}</h1>
            {post.tags?.length ? (
              <div className="article-hero-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="article-hero-tag">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <section className="article-body mdx-wrapper">
          <article className="mdx-content">{content}</article>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <ExploreAlso currentPath={`/blog/${params.slug}`} />
    </main>
  );
}
