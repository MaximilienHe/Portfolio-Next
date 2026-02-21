// /src/app/contact/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import "./style.css";

import images from "@/data/images";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";

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
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Banniere Maximilien Herr",
      },
    ],
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
      <section className="contact">
        <div className="photoProfil">
          <Image
            src={photoProfilMaximilien.image}
            width={photoProfilMaximilien.width}
            height={photoProfilMaximilien.height}
            quality={72}
            alt="Portrait de Maximilien Herr, ingenieur logiciel et journaliste tech"
            sizes="(max-width: 767px) 72vw, 300px"
            priority
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="contactContent">
          <h2>Me contacter</h2>
          <p>
            Que ce soit pour une proposition de recrutement, une nouvelle pour un
            média ou pour échanger, n&apos;hesitez pas à me joindre.
          </p>

          <div className="contactCard">
            <p>
              Vous pouvez m&apos;écrire par mail, via LinkedIn ou GitHub. Mon
              numéro de téléphone est disponible sur demande.
            </p>
            <div className="contactLogos">
              <a
                href="https://linkedin.com/in/maximilien-herr"
                target="_blank"
                rel="noopener"
              >
                <Image
                  src={linkedin.image}
                  width={linkedin.width}
                  height={linkedin.height}
                  quality={70}
                  alt="Logo LinkedIn menant au profil de Maximilien Herr"
                  className="logo"
                  sizes="50px"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                href="https://github.com/MaximilienHe"
                target="_blank"
                rel="noopener"
              >
                <Image
                  src={github.image}
                  width={github.width}
                  height={github.height}
                  quality={70}
                  alt="Logo GitHub menant au profil de Maximilien Herr"
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
          </div>

          <div className="contactExtra">
            <h3>Localisation</h3>
            <p>Clermont-Ferrand, France</p>
          </div>
        </div>
      </section>

      <ExploreAlso currentPath="/contact" />
    </>
  );
}
