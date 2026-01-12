// /src/app/contact/page.tsx
import type { Metadata } from "next";
import "./style.css";

import images from "@/data/images";
import ImageOptimize from "@/components/imageOptimization";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

const { photoProfilMaximilien, linkedin, github } = images;
const pageUrl = "https://maximilienherr.fr/contact";
const pageTitle = "Contact";
const fullTitle = "Contact | Maximilien Herr";
const pageDescription =
  "Contactez Maximilien Herr pour un projet web, une collaboration de redaction tech ou toute autre demande.";
const ogImage = "https://maximilienherr.fr/banniere_dev_redac.png";
const contactEmail = "maximilienherr@gmail.com";

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
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "contact",
    "developpeur web",
    "redaction technique",
    "portfolio",
    "Maximilien Herr",
  ],
};

export default function Contact() {
  const breadcrumbItems = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
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
      url: "https://maximilienherr.fr",
      sameAs: [
        "https://linkedin.com/in/maximilien-herr",
        "https://github.com/MaximilienHe",
        "https://www.frandroid.com/author/aximilietech",
        "https://droidsoft.fr/author/micmac/",
        "https://lecafedugeek.fr/author/maximilien/"

      ],
    },
  };

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <section className="contact">
        <div className="photoProfil">
          <ImageOptimize src={photoProfilMaximilien} alt="photo de profil" />
        </div>

        <div className="contactContent">
          <h2>Me contacter</h2>
          <p>
            Que ce soit pour un projet de developpement web, une collaboration en
            redaction tech ou pour echanger, n&apos;hesitez pas a me joindre.
          </p>

          <div className="contactCard">
            <p>
              Vous pouvez m&apos;ecrire par mail, via LinkedIn ou GitHub. Mon numero de
              telephone est disponible sur demande.
            </p>
            <div className="contactLogos">
              <a
                href="https://linkedin.com/in/maximilien-herr"
                target="_blank"
                rel="noopener"
              >
                <ImageOptimize src={linkedin} alt="logo linkedin" className="logo" />
              </a>
              <a
                href="https://github.com/MaximilienHe"
                target="_blank"
                rel="noopener"
              >
                <ImageOptimize src={github} alt="logo github" className="logo" />
              </a>
              <p>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </p>
            </div>
          </div>

          {/* Bloc d&apos;infos supplementaires */}
          <div className="contactExtra">
            <h3>Localisation</h3>
            <p>Clermont-Ferrand, France</p>

            <h3>Reseaux</h3>
            <ul>
              <li>
                Twitter :{" "}
                <a href="https://twitter.com/Maximilien_Herr" target="_blank" rel="noopener">
                  @Maximilien_Herr
                </a>
              </li>
              <li>
                LinkedIn :{" "}
                <a href="https://linkedin.com/in/maximilien-herr" target="_blank" rel="noopener">
                  maximilienherr
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
