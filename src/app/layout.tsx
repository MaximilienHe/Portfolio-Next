// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "./app.css";
import "../assets/Product Sans/stylesheet.css";
import Header from "@/common/header";
import Footer from "@/common/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://maximilienherr.fr"),
  title: { default: "Maximilien Herr", template: "%s | Maximilien Herr" },
  description:
    "Portfolio de Maximilien Herr : projets, CV, et articles.",
  openGraph: {
    type: "website",
    url: "https://maximilienherr.fr",
    siteName: "Maximilien Herr",
    locale: "fr_FR",
    images: [{
      url: "https://maximilienherr.fr/banniere_dev_redac.png",
      width: 1200,
      height: 630,
      alt: "Bannière Maximilien Herr"
    }],
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
  sameAs: [
    "https://www.linkedin.com/in/maximilienherr",
    "https://github.com/maximilienherr",
  ],
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "Accueil", url: "https://maximilienherr.fr/" },
    { "@type": "SiteNavigationElement", position: 2, name: "Projets", url: "https://maximilienherr.fr/projets" },
    { "@type": "SiteNavigationElement", position: 3, name: "Blog", url: "https://maximilienherr.fr/blog" },
    { "@type": "SiteNavigationElement", position: 4, name: "Articles", url: "https://maximilienherr.fr/articles" },
    { "@type": "SiteNavigationElement", position: 5, name: "Numerique Responsable", url: "https://maximilienherr.fr/nr" },
    { "@type": "SiteNavigationElement", position: 6, name: "Contact", url: "https://maximilienherr.fr/contact" },
    { "@type": "SiteNavigationElement", position: 7, name: "CV", url: "https://maximilienherr.fr/cv" },
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://maximilienherr.fr",
  name: "Maximilien Herr",
  inLanguage: "fr-FR",
  about: {
    "@id": "https://maximilienherr.fr#person"
  },
  hasPart: siteNavigationSchema.itemListElement.map((item) => ({
    "@type": "WebPage",
    url: item.url,
    name: item.name,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
      </body>
    </html>
  );
}
