// /src/app/_sections/xp.tsx
import Link from "next/link";

export default function Xp() {
  return (
    <section className="XP" aria-labelledby="xp-title">
      <span className="section-label">02 · Deux expertises</span>
      <h2 id="xp-title">
        Concevoir, puis <em>raconter</em> ce qui a été conçu.
      </h2>

      <div className="experiences">
        <article className="singleXP">
          <p className="role">L&apos;ingénieur</p>
          <h3>Software Engineer</h3>
          <p>
            <span className="dropcap">L</span>e métier d&apos;ingénieur logiciel,
            je l&apos;aborde comme un éditeur aborde un manuscrit&nbsp;: avec
            rigueur, sens du rythme, et l&apos;obsession de retirer ce qui
            n&apos;est pas essentiel. Mes terrains de jeu&nbsp;: le web (Next.js,
            TypeScript), le logiciel (C++, C#), et tout ce qui touche au temps
            réel.
          </p>
          <p>
            Stages, projets d&apos;école, expériences professionnelles —
            chacun a creusé une compétence différente.
          </p>
          <Link href="/cv" className="button">
            Plus de détails sur mon CV
          </Link>
        </article>

        <article className="singleXP">
          <p className="role">Le journaliste</p>
          <h3>Tech Journalist</h3>
          <p>
            <span className="dropcap">D</span>epuis 2020, j&apos;écris pour des
            médias tech français. Tests de produits, dossiers de fond,
            interviews d&apos;industriels — l&apos;exercice m&apos;apprend
            chaque jour à formuler des idées techniques avec une langue
            accessible, sans la trahir.
          </p>
          <p>
            Parmi mes terrains de jeu&nbsp;: Frandroid, Droidsoft, Le Café du
            Geek, Clubic.
          </p>
          <Link href="/articles" className="button">
            Lire quelques articles
          </Link>
        </article>
      </div>
    </section>
  );
}
