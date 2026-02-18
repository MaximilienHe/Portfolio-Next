import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./style.css";
import { getAllEntries } from "@/lib/content";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";
import logos from "@/data/logos";

const pageUrl = "https://maximilienherr.fr/projets";
const pageTitle = "Projets";
const fullTitle = "Projets | Portfolio de Maximilien Herr";
const pageDescription = "Découvrez mes réalisations techniques, applications et sites open-source.";
const ogImage = "https://maximilienherr.fr/banniere_dev_redac.png";

const projectLogoAltLabels: Partial<Record<keyof typeof logos, string>> = {
  htmlLogo: "HTML5",
  cssLogo: "CSS3",
  javascriptLogo: "JavaScript",
  phpLogo: "PHP",
  mysqlLogo: "MySQL",
  cppLogo: "C++",
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

  return `Logo ${readableLabel}, technologie utilisee par Maximilien Herr sur ce projet`;
}

export const metadata: Metadata = {
  title: fullTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: fullTitle,
    description: pageDescription,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Bannière Maximilien Herr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: pageDescription,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
  keywords: ["projets", "portfolio", "applications", "open-source"],
};

export default function Projets() {
  const projects = getAllEntries("projets");

  const breadcrumbItems = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
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
          name: project.title,
          description: project.description,
          url: `${pageUrl}/${project.slug}`,
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
        <h1 style={{ marginBottom: "1vh" }}>Quelques projets réalisés pour monter en compétences</h1>
        <p
          style={{
            textAlign: "center",
            marginBottom: "5vh",
            margin: "0 4vw 5vh 4vw",
          }}
        >
          A travers tous ces projets, il est clair qu&apos;il y a une certaine montée en compétences techniques. Dans
          les pages de ces projets, je précise par ailleurs ces compétences techniques. Mais de manière générale, ces
          travaux sont réalisés en groupe, cela implique donc des compétences transversales. <br />
          <br />
          C&apos;est notamment une bonne communication au sein de l&apos;équipe, à travers des outils de communication
          classiques (Discord, Slack ...). Aussi pour définir les tâches du projet, un recueil de besoins est souvent
          réalisé. Celui-ci a pour ambition de définir les tâches à faire, et en fonction de l&apos;ambition et du
          nombre de tâches, j&apos;utilise parfois un Trello ou un rétro-planning pour planifier les tâches selon le
          temps et les personnes impliquées dans le projet. <br />
          <br />
          Enfin, pour le travail en équipe, je suis souvent en charge du management, à la fois avec les outils que je
          viens de citer, mais aussi avec des techniques plus précises. Par exemple, cela peut-être la méthode SCRUM,
          mais aussi la mise en place de Git pour le partage de code.
        </p>

        {projects.map((project) => (
          <Link key={project.slug} href={`/projets/${project.slug}`} className="linkProject">
            <div className="projectCard">
              {project.cover ? (
                <div className="projectCardImage">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div className="projectCardPlaceholder" aria-hidden />
              )}
              <div className="projectContent">
                <h3 className="projectTitle">{project.title}</h3>
                <p className="projectDescription">{project.description}</p>
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
                        alt={getProjectLogoAlt(typedLogoKey)}
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
