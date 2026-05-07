"use client";
// /src/app/_sections/landing.tsx
import Image from "next/image";
import React, { useEffect, useState } from "react";

const words = [
  "concevoir",
  "apprendre",
  "réaliser",
  "expliquer",
  "comprendre",
  "raconter",
];

export default function Landing() {
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setFadeIn(true);
      }, 240);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="landing" aria-labelledby="landing-title">
      <div className="landing__copy">
        <span className="section-label">01 · L&apos;éditorial</span>
        <h1 id="landing-title">
          Je sais{" "}
          <span
            className="word-cycle"
            style={{ opacity: fadeIn ? 1 : 0 }}
            aria-live="polite"
          >
            {words[index]}
          </span>
          <span className="h1-rest">et je sais en raconter l&apos;histoire.</span>
        </h1>
        <p className="landing__lead">
          Software Engineer le jour, journaliste tech dès que j&apos;en ai
          l&apos;occasion. J&apos;architecture des produits et je raconte
          l&apos;industrie qui les fabrique — pour que tech, produit et
          business avancent ensemble.
        </p>
      </div>

      <div className="landing__art" aria-hidden="true">
        <Image
          src="/images/brand/logo-mh-blanc.png"
          alt=""
          width={70}
          height={92}
          className="landing__art-arch"
        />
      </div>
    </section>
  );
}
