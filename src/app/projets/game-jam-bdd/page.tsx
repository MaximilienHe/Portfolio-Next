import "../style.css";
import "../projetstyle.css";
import type { Metadata } from "next";

import images from "@/data/images";
import logos from "@/data/logos";
import ImageOptimize from "@/components/imageOptimization";

export const metadata: Metadata = {
  title: "Maximilien Herr - BDD Game Jam",
};

const { xamppLogo, mysqlLogo, gitLogo, logoSourcesProjet } = logos;
const { baseDeDonneesGameJam } = images;

export default function Game() {
  return (
    <>
      <section className="content">
        <h1>
          Développement Web - Création d&lsquo;une base de données pour Game Jam
        </h1>
        <ImageOptimize
          src={baseDeDonneesGameJam}
          alt="Image de la base de données Game Jam"
        />
        <p>
          Le contexte était de proposer une base de données pour des
          administrateurs d&lsquo;une Game Jam. Une Game Jam est un évènement de
          courte durée, 24, 48, voire 72h, donc un week-end bien souvent, où
          plusieurs équipes se réunissent pour créer un jeu-vidéo en un temps
          très court. Ce sont des développeurs, des graphistes, des level
          designers…
        </p>
        <p>
          Il nous fallait ainsi composer, conceptualiser et créer une base de
          données, qui permet d&lsquo;ajouter des participants, des jurys. La
          gestion des équipes et de la notation doit aussi être géré dans la
          base de données.
        </p>
        <p>
          On a également dû intégrer des données dans la base de données
          conceptualisée, et essayer nos jeux de données à travers des requêtes
          en MySQL, afin de par exemple, connaître la meilleure équipe sur une
          période donnée.
        </p>
        <h2>Outils et logiciels utilisés</h2>
        <p>
          Nous étions de nouveau en groupe de 5 élèves, avec des tâches
          partagées. La conception de la base de données étant la base, il était
          nécessaire de la travailler en groupe dans le but de partir sur une
          base solide. Ainsi, nous avons utilisé Miro, qui permet de partager un
          tableau blanc, sur lequel on rajoutait les éléments de la base de
          données.
        </p>
        <p>
          Également, une activité documentaire était à faire pour chercher
          l&lsquo;importance des données en entreprise. Pour la partie base de
          données en elle-même, avec l&lsquo;insertion de données, on a utilisé
          XAMPP, avec PHPMyAdmin.
        </p>
        <h2>Compétences acquises</h2>
        <p>
          La conception de base de données, les requêtes, et l&lsquo;insertion
          de données avaient déjà été travaillées en cours. Toutefois, le niveau
          de difficulté était plus important, et le travail était à réaliser de
          A à Z ici.
        </p>
        <p>
          C&lsquo;est, en somme, un travail plus poussé, et une polyvalence plus
          grande dans la gestion d&lsquo;une base de données, de la conception à
          l&lsquo;utilisation qui était demandée, et que l&lsquo;on a réalisé.
        </p>
        <div className="logos">
          <ImageOptimize src={xamppLogo} alt="XAMPP logo" className="logo" />
          <ImageOptimize src={mysqlLogo} alt="MySQL logo" className="logo" />
          <ImageOptimize src={gitLogo} alt="Git" className="logo" />
        </div>
        <h2>Sources du projet</h2>
        <div className="sources">
          <a
            href="https://github.com/MaximilienHe/Creation-de-BDD-Game-Jam"
            target="_blank"
            rel="noopener"
          >
            <p>Sources du projet</p>
            <ImageOptimize
              src={logoSourcesProjet}
              alt="Sources du projet"
              className="logo"
            />
          </a>
        </div>
      </section>
    </>
  );
}
