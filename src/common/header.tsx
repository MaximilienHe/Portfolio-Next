import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <section className="header">
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <Link href="/">
              <p>Maximilien Herr</p>
            </Link>
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
          <Link href="/nr">Numerique Responsable</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/projets">Projets</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cv" className="button">
            MON CV
          </Link>
        </div>
      </div>
    </section>
  );
}
