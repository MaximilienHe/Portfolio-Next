// /src/common/header.tsx
import Image from "next/image";
import Link from "next/link";
import { HeaderInteractive } from "./HeaderInteractive";

export default function Header() {
  return (
    <HeaderInteractive
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
