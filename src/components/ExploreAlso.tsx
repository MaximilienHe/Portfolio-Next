// src/components/ExploreAlso.tsx
import Link from "next/link";

type ExploreItem = {
  href: string;
  title: string;
  description: string;
};

const ALL_PAGES: ExploreItem[] = [
  { href: "/", title: "Accueil", description: "Portfolio de Maximilien Herr" },
  { href: "/projets", title: "Projets", description: "Réalisations techniques et applications" },
  { href: "/cv", title: "CV", description: "Parcours, expériences et compétences" },
  { href: "/articles", title: "Articles", description: "Publications sur Frandroid, DroidSoft et LCDG" },
  { href: "/blog", title: "Blog", description: "Notes et retours d'expérience" },
  { href: "/contact", title: "Contact", description: "Me joindre par mail ou LinkedIn" },
  { href: "/nr", title: "Numérique Responsable", description: "Approche sobriété et performance" },
];

/**
 * Affiche un bloc de liens internes vers les autres pages principales.
 * Exclure la page courante via `currentPath`.
 */
export function ExploreAlso({ currentPath }: { currentPath: string }) {
  const links = ALL_PAGES.filter((p) => p.href !== currentPath).slice(0, 5);

  return (
    <section className="explore-also" aria-label="Explorer aussi">
      <h2>Explorer aussi</h2>
      <div className="explore-grid">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="explore-card">
            <p className="explore-card-title">{item.title}</p>
            <p className="explore-card-desc">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}