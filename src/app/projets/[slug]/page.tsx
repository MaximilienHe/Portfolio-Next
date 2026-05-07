import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../projetstyle.css";
import "../style.css";
import { getAllEntries, getEntry } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { mdxComponents } from "@/lib/mdxComponents";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";
import { buildPageMetadata, DEFAULT_OG_IMAGE, getCanonicalUrl, SITE_NAME } from "@/lib/seo";

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
    return "/projets";
  }
}

export async function generateStaticParams() {
  return getAllEntries("projets").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const project = getEntry("projets", params.slug);
    const canonical = project.canonical ?? getCanonicalUrl(`/projets/${project.slug}`);
    const title = project.seoTitle ?? project.title;
    const description = project.seoDescription ?? project.description;

    return buildPageMetadata({
      path: toCanonicalPath(canonical),
      title,
      description,
      ogTitle: `${title} | ${SITE_NAME}`,
      type: "article",
      image: getMetaImage(project.cover),
      keywords: project.tags,
      robots: project.noindex ? { index: false, follow: true } : undefined,
    });
  } catch {
    return {};
  }
}

export default async function ProjetPage({ params }: { params: { slug: string } }) {
  let project: ReturnType<typeof getEntry> | null = null;
  try {
    project = getEntry("projets", params.slug);
  } catch {
    notFound();
  }

  if (!project) {
    notFound();
  }

  const content = await renderMdx(project.body, { autolinkHeadings: false, components: mdxComponents });
  const canonical = project.canonical ?? getCanonicalUrl(`/projets/${project.slug}`);
  const metaImage = getMetaImage(project.cover);
  const renderImage = getRenderImage(project.cover);
  const title = project.seoTitle ?? project.title;
  const description = project.seoDescription ?? project.description;

  const displayDate = new Date(project.updated ?? project.date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const breadcrumbItems = [
    { name: "Accueil", url: getCanonicalUrl("/") },
    { name: "Projets", url: getCanonicalUrl("/projets") },
    { name: title, url: canonical },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: title,
    description,
    datePublished: project.date,
    dateModified: project.updated ?? project.date,
    image: [metaImage],
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const faqJsonLd = project.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: project.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const currentTags = new Set((project.tags ?? []).map((tag) => tag.toLowerCase()));
  const relatedProjects = getAllEntries("projets")
    .filter((entry) => entry.slug !== project.slug)
    .map((entry) => {
      const score = (entry.tags ?? []).reduce((acc, tag) => {
        return currentTags.has(tag.toLowerCase()) ? acc + 1 : acc;
      }, 0);
      return { entry, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const aDate = new Date(a.entry.updated ?? a.entry.date ?? 0).getTime();
      const bDate = new Date(b.entry.updated ?? b.entry.date ?? 0).getTime();
      return bDate - aDate;
    })
    .slice(0, 3)
    .map(({ entry }) => entry);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
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
      <main className="container">
        <article className="article-page">
          <div className="article-hero">
            <div className="article-hero-media">
              <Image
                src={renderImage}
                alt={title}
                fill
                quality={70}
                sizes="(max-width: 767px) 100vw, 700px"
                style={{ objectFit: "cover" }}
                priority
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="article-hero-overlay" />
            <div className="article-hero-meta">
              <p className="article-hero-date">{displayDate}</p>
              <h1 className="article-hero-title">{title}</h1>
              {project.tags?.length ? (
                <div className="article-hero-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="article-hero-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {params.slug === "t2c-screen" ? (
            <nav className="project-mobile-toc" aria-label="Sommaire rapide">
              <a href="#t2c-overview">Vue d&apos;ensemble</a>
              <a href="#t2c-architecture">Architecture</a>
              <a href="#t2c-backend">Backend</a>
              <a href="#t2c-firmware">Firmware</a>
              <a href="#t2c-deploy">Déploiement</a>
            </nav>
          ) : null}

          <section className="article-body mdx-wrapper">
            <article className="mdx-content">{content}</article>
          </section>

          {relatedProjects.length ? (
            <section className="related-projects" aria-labelledby="related-projects-title">
              <h2 id="related-projects-title">D&apos;autres projets qui peuvent vous intéresser</h2>
              <div className="related-project-grid">
                {relatedProjects.map((entry) => (
                  <Link key={entry.slug} href={`/projets/${entry.slug}`} className="related-project-card">
                    <h3>{entry.seoTitle ?? entry.title}</h3>
                    <p>{entry.seoDescription ?? entry.description}</p>
                    <span>Voir le projet</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
      <ExploreAlso currentPath={`/projets/${params.slug}`} />
    </>
  );
}
