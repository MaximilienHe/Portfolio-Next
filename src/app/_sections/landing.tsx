"use client";
// /src/app/_sections/landing.tsx
import React, { useEffect, useState } from "react";

const words = ["Concevoir", "Apprendre", "Réaliser", "Expliquer", "Comprendre", "Raconter"];

export default function Landing() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 4000);
    return () => clearInterval(id);
  }, []);

  const activeWord = words[index];

  return (
    <section className="landing">
      <div className="container landing__inner">
        <div className="landing__copy">
          <p className="kicker">Deux expertises, une vision</p>
          <h1>
            Ingénieur Logiciel <br />
            & Journaliste Tech
          </h1>
          <p className="landing__lead">
            J’architecture des produits et je les raconte avec une plume claire,
            pour que tech, produit et business avancent ensemble.
          </p>
        </div>

        <div className="landing__typeblock">
          <div className="landing__type">
            <span
              key={activeWord}
              className="landing__typeword"
              style={{ ["--chars" as any]: activeWord.trim().length }}
            >
              {activeWord.trim()}
            </span>
          </div>
          <p className="landing__typehint">Deux mains, deux rythmes, un seul fil conducteur.</p>
        </div>
      </div>
    </section>
  );
}
