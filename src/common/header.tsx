"use client";

import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { useEffect, useRef, useState } from "react";

export default function Header() {
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

	return (
		<header className="header">
			<nav
				ref={navRef}
				className={`nav ${isOpen ? "nav--open" : ""}`}
				aria-label="Navigation principale"
			>
				<div className="nav-header">
					<div className="nav-title">
						<Link href="/">
							<span className="brand-badge" aria-hidden="true"></span>
							<p>Maximilien Herr</p>
						</Link>
					</div>
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


				<div className={`nav-links ${isOpen ? "is-open" : ""}`}>
					<Link href="/" onClick={closeMenu}>
						Accueil
					</Link>
					<Link href="/nr" onClick={closeMenu}>
						Numerique Responsable
					</Link>
					<Link href="/articles" onClick={closeMenu}>
						Articles
					</Link>
					<Link href="/blog" onClick={closeMenu}>
						Blog
					</Link>
					<Link href="/projets" onClick={closeMenu}>
						Projets
					</Link>
					<Link href="/contact" onClick={closeMenu}>
						Contact
					</Link>
					<Link href="/cv" className="button nav-cta" onClick={closeMenu}>
						MON CV
					</Link>
          <SearchBar />
				</div>
			</nav>
		</header>
	);
}
