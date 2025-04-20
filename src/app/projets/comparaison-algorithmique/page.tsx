import "../style.css";
import "../projetstyle.css";
import type { Metadata } from "next";

import images from "@/data/images";
import logos from "@/data/logos";
import ImageOptimize from "@/components/imageOptimization";

export const metadata: Metadata = {
  title: "Maximilien Herr - Blog sans CMS",
};

const {
  visualStudioLogo,
  cppLogo,
  gitLogo,
  wordLogo,
  excelLogo,
  logoSourcesProjet,
} = logos;
const { comparaisonAlgo } = images;

export default function Blog() {
  return (
    <>
      <section className="content">
        <h1>Développement logiciel - Comparaison algorithmiques en C++</h1>
        <ImageOptimize src={comparaisonAlgo} alt="Comparaison algorithmique" />
        <p>
          L&apos;objectif de ce projet est de découvrir différents algorithmes
          de tris et la comparaison de ceux-ci. En l&apos;occurrence, ces
          algorithmes doivent trier différents tableaux de valeurs, dans
          l&apos;ordre arithmétique croissant. On dispose de différents tableaux
          :
        </p>
        <ul>
          <li>Un tableau généré aléatoirement</li>
          <li>
            Un tableau presque trié, chaque élément est soit à la bonne place,
            soit à une place d&apos;écart (e. g. 1 3 2 4 6 5 8 7 9 10)
          </li>
          <li>
            Un tableau dont seuls les deux premiers éléments sont inversés (e.
            g. 2 1 3 4 5 6 7 8 9 10)
          </li>
          <li>
            Un tableau presque trié également, le premier et le dernier élément
            sont inversé (e. g. 10 2 3 4 5 6 7 8 9 1)
          </li>
          <li>
            Et enfin un tableau presque trié, mais ce sont ici les deux derniers
            éléments qui sont échangés (e.g. 1 2 3 4 5 6 7 8 10 9)
          </li>
        </ul>
        <h2>Caractéristiques techniques du projet</h2>
        <p>
          Le travail étant réalisé de nouveau en binôme, nous avons de nouveau
          utilisé GitHub, permettant la réalisation de différents algorithmes de
          tri simultanément. Nous avons pu réaliser 10 algorithmes de tri dans
          le temps limité de 12 heures.
        </p>
        <p>
          Les algorithmes de tri ont été codés en C++, on a donc utilisé de
          nouveau Visual Studio. Nous devions exporter des données de nombre de
          comparaisons selon le type de tableau trié, et selon l&apos;algorithme
          de tri employé.
        </p>
        <p>
          En plus d&apos;utiliser Word pour le rendu, nous avons également
          employé Excel afin d&apos;exploiter les données exportées par le
          logiciel. On a ainsi analysé les données avec des graphiques pour
          afficher le nombre de comparaison, selon le type de tableau trié et sa
          taille, permettant de mettre en évidence quel est le degré de
          complexité de l&apos;algorithme de tri.
        </p>
        <ImageOptimize
          src={comparaisonAlgo}
          alt="Comparaison des algorithmes"
        />
        <h2>Compétences acquises</h2>
        <p>
          Au cours de ces 12 heures imparti, nous avons pu atteindre la fin du
          sujet. En plus des algorithmes de tri &ldquo;obligatoires&ldquo; dans
          le sujet, nous avons pu intégrer 6 algorithmes supplémentaires.
        </p>
        <p>
          La gestion de fichiers en sortie, et les algorithmes de tri en général
          étaient les compétences clefs travaillées dans cette SAE d&apos;un
          point de vue algorithmique. Étant donné que les différents algorithmes
          de tri étaient déjà quasiment écrits, en pseudo-code tout du moins, il
          ne restait qu&apos;à les réécrire en C++.
        </p>
        <p>
          Le compte rendu était donc important, en particulier les graphiques
          sur Excel, et la présentation Word. Il y avait également des
          connaissances et savoirs mathématiques impliqués, notamment pour la
          complexité, qui était en N² ou N*ln(N), il fallait au minima savoir
          qu&apos;est-ce que c&apos;était.
        </p>
        <h2>Auto-critique du résultat</h2>
        <p>
          Ce projet portait à la fois sur des compétences en programmation, mais
          aussi des compétences mathématiques. Nécessairement, nous devions
          coder plusieurs algorithmes de tri, ce que l&apos;on a bien réussi. Il
          fallait en faire un minimum parmi une liste, nous les avons tous fais,
          et en avons fait d&apos;autres en plus. Mais aussi, il s&apos;agissait
          de déterminer, selon les résultats, la complexité de ceux-ci, et selon
          les cas cités en début de cette page. Il n&apos;y avait donc pas de
          démonstration nécessaire, nous aurions pu le faire pour certains très
          rapidement, c&apos;est dommage. Pour autant, le compte-rendu était
          exhaustif et clair, pour fournir les données importantes de ce projet
          réussi.
        </p>
        <div className="logos">
          <ImageOptimize src={cppLogo} alt="CPP" className="logo" />
          <ImageOptimize
            src={visualStudioLogo}
            alt="Visual Studio"
            className="logo"
          />
          <ImageOptimize src={gitLogo} alt="Git" className="logo" />
          <ImageOptimize src={wordLogo} alt="Word" className="logo" />
          <ImageOptimize src={excelLogo} alt="Excel" className="logo" />
        </div>
        <h2>Sources du projet</h2>
        <a
          href="https://github.com/Florian-Mure/Comparaison-algorithmes-de-tris"
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
