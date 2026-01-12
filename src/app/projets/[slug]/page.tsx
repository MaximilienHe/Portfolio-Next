import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../projetstyle.css";
import "../style.css";
import { getAllEntries, getEntry } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { mdxComponents } from "@/lib/mdxComponents";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

const baseUrl = "https://maximilienherr.fr";

export async function generateStaticParams() {
  return getAllEntries("projets").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const project = getEntry("projets", params.slug);
    const canonical = project.canonical ?? `${baseUrl}/projets/${project.slug}`;
    const image = project.cover ?? "/banniere_dev_redac.png";

    return {
      title: project.title,
      description: project.description,
      alternates: { canonical },
      openGraph: {
        type: "article",
        url: canonical,
        title: project.title,
        description: project.description,
        images: [{ url: image }],
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description: project.description,
        images: [image],
      },
    };
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
  const canonical = project.canonical ?? `${baseUrl}/projets/${project.slug}`;
  const image = project.cover ?? "https://maximilienherr.fr/banniere_dev_redac.png";
  const displayDate = new Date(project.updated ?? project.date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const breadcrumbItems = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
    { name: "Projets", url: `${baseUrl}/projets` },
    { name: project.title, url: canonical },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: project.title,
    description: project.description,
    datePublished: project.date,
    dateModified: project.updated ?? project.date,
    image: [image],
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container">
        <article className="article-page">
          <div className="article-hero">
            {image ? (
              <img src={image} alt={project.title} loading="lazy" decoding="async" />
            ) : (
              <div className="article-hero-placeholder" aria-hidden />
            )}
            <div className="article-hero-overlay" />
            <div className="article-hero-meta">
              <p className="article-hero-date">{displayDate}</p>
              <h1 className="article-hero-title">{project.title}</h1>
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

          <section className="article-body mdx-wrapper">
            <article className="mdx-content">{content}</article>
          </section>
        </article>
      </main>
    </>
  );
}
