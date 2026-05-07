import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./style.css";
import { getAllEntries } from "@/lib/content";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";
import logos from "@/data/logos";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo";

const pagePath = "/projets";
const pageUrl = getCanonicalUrl(pagePath);
const pageTitle = "Projets";
const fullTitle = "Projets | Portfolio de Maximilien Herr";
const pageDescription = "Sélection de projets logiciels, applications et expérimentations techniques.";

const projectLogoAltLabels: Partial<Record<keyof typeof logos, string>> = {
  htmlLogo: "HTML5",
  cssLogo: "CSS3",
  javascriptLogo: "JavaScript",
  phpLogo: "PHP",
  mysqlLogo: "MySQL",
  nextjsLogo: "Next.js",
  cppLogo: "C++",
  pythonLogo: "Python",
  visualStudioLogo: "Visual Studio",
  gitLogo: "Git",
  vuejsLogo: "Vue.js",
  redisLogo: "Redis",
  excelLogo: "Microsoft Excel",
  wordLogo: "Microsoft Word",
  androidStudioLogo: "Android Studio",
  kotlinLogo: "Kotlin",
  xamppLogo: "XAMPP",
  nodeLogo: "Node.js",
  dockerLogo: "Docker",
  esp32Logo: "ESP32",
  droidSoft: "DroidSoft",
  icdg: "LCDG",
  threeDsMaxLogo: "3ds Max",
  substancePainterLogo: "Substance Painter",
  unrealLogo: "Unreal Engine",
};

function getProjectLogoAlt(logoKey: keyof typeof logos): string {
  const readableLabel =
    projectLogoAltLabels[logoKey] ??
    logoKey
      .replace(/Logo$/, "")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .trim();

  return `Logo ${readableLabel}`;
}

export const metadata: Metadata = buildPageMetadata({
  path: pagePath,
  title: pageTitle,
  description: pageDescription,
  ogTitle: fullTitle,
  keywords: ["projets", "portfolio", "applications", "open-source"],
});

export default function Projets() {
  const projects = getAllEntries("projets");

  const breadcrumbItems = [
    { name: "Accueil", url: getCanonicalUrl("/") },
    { name: "Projets", url: pageUrl },
  ];

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: fullTitle,
    description: pageDescription,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.seoTitle ?? project.title,
          description: project.seoDescription ?? project.description,
          url: getCanonicalUrl(`/projets/${project.slug}`),
        },
      })),
    },
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />
      <section className="projets">
        <span className="kicker">Rubrique · Réalisations</span>
        <h1>Projets techniques sélectionnés</h1>
        <p>
          Cette sélection couvre plusieurs contextes : web, logiciel, data,
          embarqué. Chaque page projet détaille la stack, le périmètre, les
          compromis et les résultats pour garder un niveau de lecture concret.
        </p>

        {projects.map((project, idx) => (
          <Link key={project.slug} href={`/projets/${project.slug}`} className="linkProject">
            <div className="projectCard">
              {project.cover ? (
                <div className="projectCardImage">
                  <Image
                    src={project.cover}
                    alt={project.seoTitle ?? project.title}
                    fill
                    quality={68}
                    sizes="(max-width: 767px) calc(100vw - 2rem), 340px"
                    style={{ objectFit: "cover" }}
                    loading={idx === 0 ? "eager" : "lazy"}
                    priority={idx === 0}
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="projectCardPlaceholder" aria-hidden />
              )}
              <div className="projectContent">
                <h3 className="projectTitle">{project.seoTitle ?? project.title}</h3>
                <p className="projectDescription">{project.seoDescription ?? project.description}</p>
                {project.tags?.length ? (
                  <div className="projectTags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tagBadge">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="languages">
                  {(project.logos ?? []).map((logoKey) => {
                    const typedLogoKey = logoKey as keyof typeof logos;
                    const logo = logos[typedLogoKey];
                    if (!logo) return null;
                    return (
                      <Image
                        key={logoKey}
                        src={logo.image}
                        width={logo.width}
                        height={logo.height}
                        quality={70}
                        alt={getProjectLogoAlt(typedLogoKey)}
                        sizes="70px"
                        loading="lazy"
                        decoding="async"
                      />
                    );
                  })}
                </div>
                {project.date ? (
                  <div className="projectMetaRow">
                    <span className="projectMeta">
                      {new Date(project.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </section>
      <ExploreAlso currentPath="/projets" />
    </>
  );
}
