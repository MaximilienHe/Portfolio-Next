import Link from "next/link";
import { HeaderInteractive } from "./HeaderInteractive";

export default function Header() {
	return (
    <HeaderInteractive
      brand={
        <Link href="/">
          <span className="brand-badge" aria-hidden="true"></span>
          <p>Maximilien Herr</p>
        </Link>
      }
    >
      <Link href="/">Accueil</Link>
      <Link href="/nr">Numérique Responsable</Link>
      <Link href="/articles">Articles</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/projets">Projets</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/cv" className="button nav-cta">
        MON CV
      </Link>
    </HeaderInteractive>
	);
}
