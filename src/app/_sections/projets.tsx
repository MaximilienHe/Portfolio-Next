// /src/app/_sections/projets.tsx
"use client";

import ImageOptimize from "@/components/imageOptimization";
import projects from "@/data/projetsSection";
import images from "@/data/images";

export default function Projets() {
  return (
    <div className="container">
      <section className="projets">
      <h1>Projets</h1>
        <div className="cards">
          {projects.map((proj) => (
            <div key={proj.id} className="card">
              <ImageOptimize
                src={images[proj.imageKey]}
                alt={proj.alt}
                width={images[proj.imageKey].width}
                height={images[proj.imageKey].height}
              />
              <div className="cardDetail">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <a href={proj.href} className="button">
                  Voir le projet
                </a>
              </div>
            </div>
          ))}
        </div>
        <a href="/projets" className="button" style={{ marginTop: "5vh" }}>
          Voir tous les projets
        </a>
      </section>
    </div>
  );
}
