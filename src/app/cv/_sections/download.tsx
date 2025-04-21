// /src/app/cv/_sections/download.tsx
import React from "react";

export default function Download() {
  return (
    <section className="download">
      <div className="inner">
        <h1>Télécharger mon CV</h1>
        <a
          href="../../../assets/images/Images/HERR_Maximilien_-_CV.pdf"
          className="button"
          target="_blank"
          rel="noopener"
        >
          TÉLÉCHARGER
        </a>
      </div>
    </section>
  );
}