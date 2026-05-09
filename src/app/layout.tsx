// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./app.css";
import Header from "@/common/header";
import Footer from "@/common/footer";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

// Self-hosted fonts (latin subset). Évite tout fetch réseau pendant le build
// — nécessaire pour les builds Docker offline / arm64 sous qemu.
const lora = localFont({
  src: [
    { path: "../assets/fonts/Lora-Variable.woff2", weight: "400 600", style: "normal" },
    { path: "../assets/fonts/Lora-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-lora",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "../assets/fonts/Poppins-300.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/Poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/Poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/Poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/Poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Maximilien Herr | Ingénieur Logiciel & Journaliste Tech | Portfolio",
    template: "%s | Maximilien Herr",
  },
  description:
    "Maximilien Herr, ingénieur logiciel et journaliste tech (Frandroid, DroidSoft, Le Café du Geek). Découvrez mon portfolio : projets, CV, compétences et articles.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Maximilien Herr",
    locale: "fr_FR",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Bannière portfolio Maximilien Herr, ingénieur logiciel et journaliste tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/" },
  // Les icônes sont prises automatiquement depuis :
  //   - public/favicon.ico (legacy /favicon.ico)
  //   - src/app/icon.png   → <link rel="icon">
  //   - src/app/apple-icon.png → <link rel="apple-touch-icon">
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Maximilien Herr",
  url: SITE_URL,
  "@id": "https://maximilienherr.fr#person",
  image: "https://maximilienherr.fr/photo.jpg",
  jobTitle: "Ingénieur Logiciel",
  worksFor: {
    "@type": "Organization",
    name: "Smartfluence",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "ISIMA - Clermont Auvergne INP",
    },
    {
      "@type": "EducationalOrganization",
      name: "IUT du Puy-en-Velay, Université Clermont-Auvergne",
    },
  ],
  knowsAbout: [
    "développement web",
    "intelligence artificielle",
    "machine learning",
    "journalisme tech",
    "Node.js",
    "Python",
    "React",
    "Next.js",
  ],
  sameAs: [
    "https://www.linkedin.com/in/maximilien-herr",
    "https://github.com/MaximilienHe",
    "https://www.frandroid.com/author/aximilietech",
    "https://droidsoft.fr/author/micmac/",
    "https://lecafedugeek.fr/author/maximilien/",
    "https://www.clubic.com/auteur/457398-maximilien-herr.html",
    "https://x.com/Maximilien_Herr",
    "https://muckrack.com/maximilien-herr",
  ],
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "SiteNavigationElement",
      position: 1,
      name: "Accueil",
      url: "https://maximilienherr.fr/",
    },
    {
      "@type": "SiteNavigationElement",
      position: 2,
      name: "Projets",
      url: "https://maximilienherr.fr/projets",
    },
    {
      "@type": "SiteNavigationElement",
      position: 3,
      name: "Blog",
      url: "https://maximilienherr.fr/blog",
    },
    {
      "@type": "SiteNavigationElement",
      position: 4,
      name: "Articles",
      url: "https://maximilienherr.fr/articles",
    },
    {
      "@type": "SiteNavigationElement",
      position: 5,
      name: "Numérique Responsable",
      url: "https://maximilienherr.fr/nr",
    },
    {
      "@type": "SiteNavigationElement",
      position: 6,
      name: "Contact",
      url: "https://maximilienherr.fr/contact",
    },
    {
      "@type": "SiteNavigationElement",
      position: 7,
      name: "CV",
      url: "https://maximilienherr.fr/cv",
    },
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "Maximilien Herr",
  inLanguage: "fr-FR",
  description:
    "Portfolio de Maximilien Herr, ingénieur logiciel et journaliste tech.",
  about: {
    "@id": "https://maximilienherr.fr#person",
  },
  author: {
    "@id": "https://maximilienherr.fr#person",
  },
  hasPart: siteNavigationSchema.itemListElement.map((item) => ({
    "@type": "WebPage",
    url: item.url,
    name: item.name,
  })),
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://maximilienherr.fr/recherche?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${lora.variable} ${poppins.variable}`}
    >
      <body className="layout-root">
        <Header />
        <main className="layout-content">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationSchema),
          }}
        />
      </body>
    </html>
  );
}
