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
        images: [{ url: image, width: 1200, height: 630 }],
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
      <main className="container">
        <article className="article-page">
        <div className="article-hero">
          {image ? (
            <div className="article-hero-media">
              <Image
                src={image}
                alt={project.title}
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

          {relatedProjects.length ? (
            <section className="related-projects" aria-labelledby="related-projects-title">
              <h2 id="related-projects-title">D&apos;autres projets qui peuvent vous intéresser</h2>
              <div className="related-project-grid">
                {relatedProjects.map((entry) => (
                  <Link key={entry.slug} href={`/projets/${entry.slug}`} className="related-project-card">
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
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
