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
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 1rem",
        gap: "1.5rem",
      }}
    >
      <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.1rem", color: "#555", maxWidth: 480, margin: 0 }}>
        Cette page n&apos;existe pas ou a été déplacée.
        <br />
        Vous pouvez revenir à l&apos;accueil ou explorer les sections ci-dessous.
      </p>

      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
          marginTop: "1rem",
        }}
        aria-label="Navigation principale"
      >
        <Link href="/" className="button">
          Accueil
        </Link>
        <Link href="/projets" className="button">
          Projets
        </Link>
        <Link href="/cv" className="button">
          CV
        </Link>
        <Link href="/articles" className="button">
          Articles
        </Link>
        <Link href="/blog" className="button">
          Blog
        </Link>
        <Link href="/contact" className="button">
          Contact
        </Link>
      </nav>
    </main>
  );
}