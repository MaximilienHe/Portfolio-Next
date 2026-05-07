"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";

const SearchBar = dynamic(
  () => import("@/components/SearchBar").then((mod) => mod.SearchBar),
  {
    ssr: false,
    loading: () => (
      <Link href="/recherche" className="search-trigger" aria-label="Aller à la recherche">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="search-trigger-text">Rechercher</span>
      </Link>
    ),
  },
);

type HeaderInteractiveProps = {
  brand: ReactNode;
  children: ReactNode;
};

export function HeaderInteractive({ brand, children }: HeaderInteractiveProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && navRef.current && !navRef.current.contains(target)) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleNavItemClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest("a, button.search-trigger")) {
      closeMenu();
    }
  };

  return (
    <header className="header">
      <nav
        ref={navRef}
        className={`nav ${isOpen ? "nav--open" : ""}`}
        aria-label="Navigation principale"
      >
        <div className="nav-header">
          <div className="nav-title">{brand}</div>
        </div>
        <div className="nav-btn">
          <button
            type="button"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            onClick={toggleMenu}
            className={`nav-toggle ${isOpen ? "is-open" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`nav-links ${isOpen ? "is-open" : ""}`} onClick={handleNavItemClick}>
          {children}
          <SearchBar />
        </div>
      </nav>
    </header>
  );
}
