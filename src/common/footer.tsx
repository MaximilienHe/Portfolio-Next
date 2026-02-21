import React from "react";
import Link from "next/link";
import { APP_VERSION } from "@/generated/app-version";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <p>
          &copy; Maximilien Herr | {new Date().getFullYear()} | {APP_VERSION}
        </p>
        <nav className="footer-nav" aria-label="Liens principaux">
          <Link href="/">Accueil</Link>
          <Link href="/projets">Projets</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/nr">Numérique Responsable</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cv">CV</Link>
        </nav>
      </div>
      <div className="socials">
        <a
          href="https://www.linkedin.com/in/maximilien-herr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>LinkedIn</p>
        </a>
        <a
          href="https://github.com/MaximilienHe"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>GitHub</p>
        </a>
      </div>
    </footer>
  );
}
