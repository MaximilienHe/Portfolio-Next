// /src/common/footer.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_VERSION } from "@/generated/app-version";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-col-left">
          <h4>Suivre l&apos;édition</h4>
          <a href="mailto:maximilienherr@gmail.com">maximilienherr@gmail.com</a>
          <a
            href="https://www.linkedin.com/in/maximilien-herr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/maximilien-herr
          </a>
          <a
            href="https://github.com/MaximilienHe"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/MaximilienHe
          </a>
        </div>

        <div className="footer-col-center">
          <Image
            src="/images/brand/logo-mh-principal.png"
            alt="Monogramme MH"
            width={56}
            height={72}
          />
          <p className="signature">&laquo; Concevoir, puis raconter. &raquo;</p>
        </div>

        <div className="footer-col-right">
          <h4>Naviguer</h4>
          <nav className="footer-nav" aria-label="Liens principaux">
            <Link href="/">Accueil</Link>
            <Link href="/projets">Projets</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/nr">Numérique Responsable</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cv">CV</Link>
          </nav>
        </div>
      </div>

      <div className="footer-credit">
        <span>
          &copy; Maximilien Herr · {year} · {APP_VERSION}
        </span>
        <div className="footer-socials">
          <a
            href="https://www.linkedin.com/in/maximilien-herr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/MaximilienHe"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
