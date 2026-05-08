// /src/common/header.tsx
import Image from "next/image";
import Link from "next/link";
import { HeaderInteractive } from "./HeaderInteractive";

/**
 * Construit le label "Édition · <Mois> <Année>" en français à partir
 * d'une date donnée. Exécuté côté serveur (Server Component) au moment
 * du build / SSR, donc se met à jour automatiquement à chaque
 * (re)déploiement.
 */
function formatEditionLabel(date: Date = new Date()): string {
  const monthRaw = new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(
    date,
  );
  const month = monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1);
  return `Édition · ${month} ${date.getFullYear()}`;
}

export default function Header() {
  const editionLabel = formatEditionLabel();

  return (
    <HeaderInteractive
      editionLabel={editionLabel}
      brand={
        <Link href="/" className="brand" aria-label="Accueil — Maximilien Herr">
          <Image
            src="/images/brand/logo-mh-principal.png"
            alt=""
            width={38}
            height={50}
            className="brand-logo"
            priority
          />
          <span className="brand-name">
            Maximilien Herr <em>— Software Engineer &amp; Tech Journalist</em>
          </span>
        </Link>
      }
    >
      <Link href="/">Accueil</Link>
      <Link href="/projets">Projets</Link>
      <Link href="/articles">Articles</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/nr">Numérique Responsable</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/cv" className="nav-cta">
        MON CV
      </Link>
    </HeaderInteractive>
  );
}
