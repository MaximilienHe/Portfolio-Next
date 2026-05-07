// /src/app/_sections/projets.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllEntries } from "@/lib/content";

export default function Projets() {
  const projects = getAllEntries("projets").slice(0, 3);

  return (
    <section className="projets" aria-labelledby="projets-title">
      <span className="section-label">03 · Réalisations</span>
      <h2 id="projets-title">Mes projets.</h2>
      <div className="cards">
        {projects.map((proj, i) => {
          const num = `N° 0${i + 1}`;
          return (
            <Link
              key={proj.slug}
              href={`/projets/${proj.slug}`}
              className="card"
            >
              <div className="cardImageWrapper" data-num={num}>
                {proj.cover ? (
                  <Image
                    src={proj.cover}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 2rem), 360px"
                    style={{ objectFit: "cover" }}
                    priority={false}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="article-hero-placeholder" aria-hidden />
                )}
              </div>
              <div className="cardDetail">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                {proj.date ? (
                  <div className="cardMetaRow">
                    <span className="cardMeta">
                      {new Date(proj.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
      <Link href="/projets" className="button">
        Voir tous les projets
      </Link>
    </section>
  );
}
