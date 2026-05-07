// src/app/not-found.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas sur le portfolio de Maximilien Herr.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="page not-found">
      <div
        style={{
          textAlign: "center",
          paddingTop: "3rem",
          paddingBottom: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <span className="kicker">Erreur · 404</span>
        <h1
          style={{
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            lineHeight: 1,
            margin: 0,
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            color: "var(--caramel)",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.2rem",
            color: "var(--mocha)",
            maxWidth: "50ch",
            margin: 0,
          }}
        >
          La page que vous cherchez n&apos;a pas été imprimée dans cette
          édition.
          <br />
          Revenez à l&apos;accueil ou parcourez les rubriques.
        </p>

        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.7rem",
            justifyContent: "center",
            marginTop: "1.5rem",
          }}
          aria-label="Navigation de secours"
        >
          <Link href="/" className="button">
            Accueil
          </Link>
          <Link href="/projets" className="button button-ghost">
            Projets
          </Link>
          <Link href="/articles" className="button button-ghost">
            Articles
          </Link>
          <Link href="/blog" className="button button-ghost">
            Blog
          </Link>
          <Link href="/cv" className="button button-ghost">
            CV
          </Link>
          <Link href="/contact" className="button button-ghost">
            Contact
          </Link>
        </nav>
      </div>
    </section>
  );
}
