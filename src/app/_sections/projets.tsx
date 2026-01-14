// /src/app/_sections/projets.tsx
import Link from "next/link";
import { getAllEntries } from "@/lib/content";

export default function Projets() {
  const projects = getAllEntries("projets").slice(0, 3);

  return (
    <section className="projets">
      <h1>Projets</h1>
      <div className="cards">
        {projects.map((proj) => (
          <Link key={proj.slug} href={`/projets/${proj.slug}`} className="card">
            {proj.cover ? (
              <img src={proj.cover} alt={proj.title} loading="lazy" decoding="async" />
            ) : (
              <div className="article-hero-placeholder" aria-hidden />
            )}
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
        ))}
      </div>
      <a href="/projets" className="button" style={{ marginTop: "5vh", marginBottom: "5vh" }}>
        Voir tous les projets
      </a>
    </section>
  );
}
