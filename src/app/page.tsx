import Landing from "./_sections/landing";
import Xp from "./_sections/xp";
import Projets from "./_sections/projets";
import Articles from "./_sections/articles";
import Skills from "./_sections/skills";
import ArticlesDyn from "./_sections/articles-dyn";

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Maximilien Herr \u2014 Portfolio",
  url: "https://maximilienherr.fr",
  mainEntity: {
    "@id": "https://maximilienherr.fr#person",
  },
  dateCreated: "2023-01-01",
  dateModified: "2026-02-18",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://maximilienherr.fr",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema),
        }}
      />
      <Landing />
      <Xp />
      <Projets />
      {/* <Articles /> */}
      <ArticlesDyn />
      <Skills />
    </>
  );
}
