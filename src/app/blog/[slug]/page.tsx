import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllEntries, getEntry } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { mdxComponents } from "@/lib/mdxComponents";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import "../style.css";

export async function generateStaticParams() {
  return getAllEntries("blog").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const post = getEntry("blog", params.slug);
    const canonical = post.canonical ?? `https://maximilienherr.fr/blog/${post.slug}`;
    const image = post.cover ?? "/banniere_dev_redac.png";

    return {
      title: post.title,
      description: post.description,
      alternates: { canonical },
      openGraph: {
        type: "article",
        url: canonical,
        title: post.title,
        description: post.description,
        images: [{ url: image, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [image],
      },
    };
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
  const canonical = post.canonical ?? `https://maximilienherr.fr/blog/${post.slug}`;
  const image = post.cover ?? "https://maximilienherr.fr/banniere_dev_redac.png";
  const displayDate = new Date(post.updated ?? post.date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const breadcrumbItems = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
    { name: "Blog", url: "https://maximilienherr.fr/blog" },
    { name: post.title, url: canonical },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: [image],
    author: { "@type": "Person", name: "Maximilien Herr", url: "https://maximilienherr.fr" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <main className="container">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <article className="article-page">
        <div className="article-hero">
          {image ? (
            <div className="article-hero-media">
              <Image
                src={image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 1080px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          ) : (
            <div className="article-hero-placeholder" aria-hidden />
          )}
          <div className="article-hero-overlay" />
          <div className="article-hero-meta">
            <p className="article-hero-date">{displayDate}</p>
            <h1 className="article-hero-title">{post.title}</h1>
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
    </main>
  );
}
