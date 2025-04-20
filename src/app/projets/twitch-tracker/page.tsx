import "../style.css";
import "../projetstyle.css";
import type { Metadata } from "next";

import logos from "@/data/logos";
import ImageOptimize from "@/components/imageOptimization";

export const metadata: Metadata = {
  title: "Maximilien Herr - Twitch Tracker",
};

const {
  htmlLogo,
  cssLogo,
  javascriptLogo,
  phpLogo,
  mysqlLogo,
  gitLogo,
  logoSourcesProjet,
} = logos;

export default function Temple() {
  return (
    <>
      <section className="content">
        <h1>Développement Web - Twitch Tracker</h1>
        <iframe
          width="auto"
          height="400"
          src="https://www.youtube-nocookie.com/embed/k-dUhISg9X4"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <p>
          Vous connaissez peut-être le principe d&lsquo;un Twitch Tracker, mais
          au cas-où, voici un rappel. L&lsquo;objectif, c&lsquo;est
          d&lsquo;utiliser des données de streamer, qui sont en live sur la
          plateforme. Ces données, ça peut être le nombre de viewers moyen, le
          nombre maximal de viewers … Ces données sont donc stockées dans une
          base de données, et l&lsquo;objectif est de les récupérer, et les
          mettre en page.
        </p>
        <h2>Caractéristiques techniques du projet</h2>
        <h3>Langages / technologies utilisés</h3>
        <p>
          Ce Twitch Tracker se base sur une base de données en MySQL, et les
          données sont traitées et récupérables via des points d&lsquo;accès
          (end-points). Ce traitement se fait en PHP, et pour les mettre en
          forme, on a utilisé du JavaScript. Evidemment, il y a une base de HTML
          et CSS pour une mise en page simpliste.
        </p>

        <h3>Combien de temps, qui et quoi ?</h3>
        <p>
          Le projet a duré une dizaine à vingtaine d&lsquo;heures par personne,
          avec un temps important de formation. Il a été réalisé en groupe de 3,
          par
          <a
            href="https://linkedin.com/in/lucas-chalmandrier"
            style={{ color: "#888888" }}
            target="_blank"
            rel="noopener"
          >
            Lucas Chalmandrier
          </a>
          ,
          <a
            href="https://www.linkedin.com/in/florian-mure-9b335422b/"
            target="_blank"
            rel="noopener"
          >
            Florian Mure
          </a>
          et moi-même, dans le cadre de notre formation du BUT Informatique
          Graphique.
        </p>
        <h2>Détails du projet</h2>
        <p>
          Le projet est un peu basique, mais il faut bien commencer quelque
          part. Par ailleurs, nous avons utilisé GitHub pour ce projet, sur
          lequel vous pourrez trouver plus de détails et les sources du projet.
        </p>

        <div className="logos">
          <ImageOptimize src={htmlLogo} alt="HTML5" className="logo" />
          <ImageOptimize src={cssLogo} alt="CSS" className="logo" />
          <ImageOptimize
            src={javascriptLogo}
            alt="JavaScript"
            className="logo"
          />
          <ImageOptimize src={phpLogo} alt="PHP" className="logo" />
          <ImageOptimize src={mysqlLogo} alt="MySQL" className="logo" />
          <ImageOptimize src={gitLogo} alt="Git" className="logo" />
        </div>
        <h2>Sources du projet</h2>
        <a
          href="https://github.com/lucaschlm/twitch-tracker"
          target="_blank"
          rel="noopener"
        >
          <ImageOptimize
            src={logoSourcesProjet}
            alt="Sources du projet"
            className="logo"
          />
        </a>
      </section>
    </>
  );
}
