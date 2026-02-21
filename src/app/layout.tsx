// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Montserrat, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./app.css";
import "../assets/Product Sans/stylesheet.css";
import Header from "@/common/header";
import Footer from "@/common/footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maximilienherr.fr"),
  title: {
    default:
      "Maximilien Herr — Ingénieur Logiciel & Journaliste Tech | Portfolio",
    template: "%s | Maximilien Herr",
  },
  description:
    "Maximilien Herr, ingénieur logiciel chez Smartfluence et journaliste tech (Frandroid, DroidSoft, Le Café du Geek). Découvrez mon portfolio : projets, CV, compétences et articles.",
  openGraph: {
    type: "website",
    url: "https://maximilienherr.fr",
    siteName: "Maximilien Herr",
    locale: "fr_FR",
    images: [
      {
        url: "https://maximilienherr.fr/banniere_dev_redac.png",
        width: 1200,
        height: 630,
        alt: "Bannière portfolio Maximilien Herr — Ingénieur logiciel et journaliste tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://maximilienherr.fr/banniere_dev_redac.png"],
  },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Maximilien Herr",
  url: "https://maximilienherr.fr",
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
      name: "Numerique Responsable",
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
  url: "https://maximilienherr.fr",
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${montserrat.variable}`}
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
