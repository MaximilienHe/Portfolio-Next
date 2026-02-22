import type { Metadata } from "next";
import Image from "next/image";
import "./style.css";

import images from "@/data/images";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo";

const { photoProfilMaximilien, linkedin, github } = images;
const pagePath = "/contact";
const pageUrl = getCanonicalUrl(pagePath);
const pageTitle = "Contact";
const fullTitle = "Contact | Maximilien Herr";
const pageDescription =
  "Contactez-moi pour échanger sur des sujets d'ingénierie logicielle ou proposer des opportunités côté rédaction / journalisme tech.";
const contactEmail = "maximilienherr@gmail.com";

export const metadata: Metadata = buildPageMetadata({
  path: pagePath,
  title: pageTitle,
  description: pageDescription,
  ogTitle: fullTitle,
  keywords: ["contact", "ingénierie logicielle", "journalisme tech", "portfolio"],
});

export default function Contact() {
  const breadcrumbItems = [
    { name: "Accueil", url: getCanonicalUrl("/") },
    { name: "Contact", url: pageUrl },
  ];

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: fullTitle,
    url: pageUrl,
    description: pageDescription,
    mainEntityOfPage: pageUrl,
    potentialAction: {
      "@type": "ContactAction",
      target: `mailto:${contactEmail}`,
    },
    publisher: {
      "@type": "Person",
      name: "Maximilien Herr",
      url: getCanonicalUrl("/"),
      sameAs: [
        "https://linkedin.com/in/maximilien-herr",
        "https://github.com/MaximilienHe",
        "https://www.frandroid.com/author/aximilietech",
        "https://droidsoft.fr/author/micmac/",
        "https://lecafedugeek.fr/author/maximilien/",
      ],
    },
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <main className="contact-page">
        <section className="contact">
          <div className="photoProfil">
            <Image
              src={photoProfilMaximilien.image}
              width={photoProfilMaximilien.width}
              height={photoProfilMaximilien.height}
              quality={72}
              alt="Portrait de Maximilien Herr"
              sizes="(max-width: 767px) 72vw, 300px"
              priority={false}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="contactContent">
            <h1>Me contacter</h1>
            <p>
              Cette page est ouverte à l&apos;échange autour de deux axes : l&apos;ingénierie
              logicielle et le journalisme / la rédaction tech.
            </p>

            <div className="contactInfoGrid">
              <section className="contactPanel">
                <h2>Côté ingénierie</h2>
                <p>
                  Vous pouvez me contacter pour discuter d&apos;architecture, de
                  performance, de SEO technique, de data/IA ou d&apos;un retour
                  d&apos;expérience sur un projet.
                </p>
                <p>
                  Je ne propose pas de prestation freelance ici : l&apos;objectif est
                  surtout d&apos;échanger et de creuser des sujets techniques.
                </p>
              </section>

              <section className="contactPanel">
                <h2>Côté rédaction / journalisme</h2>
                <p>
                  Je suis également joignable pour des propositions éditoriales :
                  piges, tests, analyses, sujets tech grand public ou contenus plus
                  experts.
                </p>
                <p>
                  Si vous avez un sujet, un angle ou une proposition, vous pouvez
                  me l&apos;envoyer directement par email.
                </p>
              </section>
            </div>

            <div className="contactCard">
              <h2>Canaux de contact</h2>
              <div className="contactLogos" aria-label="Canaux de contact">
                <a href="https://linkedin.com/in/maximilien-herr" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={linkedin.image}
                    width={linkedin.width}
                    height={linkedin.height}
                    quality={70}
                    alt="Profil LinkedIn"
                    className="logo"
                    sizes="50px"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <a href="https://github.com/MaximilienHe" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={github.image}
                    width={github.width}
                    height={github.height}
                    quality={70}
                    alt="Profil GitHub"
                    className="logo"
                    sizes="50px"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <p>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </p>
              </div>
              <p className="contact-meta">Localisation : Clermont-Ferrand, France.</p>
            </div>
          </div>
        </section>
      </main>

      <ExploreAlso currentPath="/contact" />
    </>
  );
}
