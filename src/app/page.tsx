import Landing from "./_sections/landing";
import Sommaire from "./_sections/sommaire";
import Xp from "./_sections/xp";
import Projets from "./_sections/projets";
import Skills from "./_sections/skills";
import ArticlesDyn from "./_sections/articles-dyn";

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Maximilien Herr — Portfolio",
  url: "https://maximilienherr.fr",
  mainEntity: {
    "@id": "https://maximilienherr.fr#person",
  },
  dateCreated: "2023-01-01T00:00:00Z",
  dateModified: "2026-05-07T00:00:00Z",
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
      <Sommaire />
      <Xp />
      <Projets />
      <ArticlesDyn />
      <Skills />
    </>
  );
}
