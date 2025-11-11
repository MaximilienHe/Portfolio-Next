import "../style.css";
import "../projetstyle.css";
import type { Metadata } from "next";

import logos from "@/data/logos";
import ImageOptimize from "@/components/imageOptimization";
import imagesTwo from "@/data/ImagesTwo";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
export const metadata: Metadata = {
  title: "Maximilien Herr - Réchauffement climatique",
};

const { cppLogo, visualStudioLogo, gitLogo, logoSourcesProjet } = logos;
const { raiesDeCouleur, graphiqueClairFonce, graphiqueSpirale } = imagesTwo;

export default function Game() {
  const breadcrumbRechauffement = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
    { name: "Projets", url: "https://maximilienherr.fr/projets" },
    {
      name: "Graphiques réchauffement climatique",
      url: "https://maximilienherr.fr/projets/rechauffement-climatique",
    },
  ];
  return (
    <>
      <head>
        <title>Graphiques réchauffement climatique - Maximilien Herr</title>
        <meta
          name="description"
          content="Découvrez mon projet de graphiques pour la visualisation du réchauffement climatique, réalisé en C++."
        />
        <link
          rel="canonical"
          href="https://maximilienherr.fr/projets/rechauffement-climatique"
        />
      </head>
      <BreadcrumbJsonLd items={breadcrumbRechauffement} />
      <section className="content">
        <h1>
          Développement Logiciel - Graphiques pour la visualisation du
          réchauffement climatique
        </h1>
        <ImageOptimize
          src={raiesDeCouleur}
          alt="Graphique raies de couleur"
          className="image"
        />
        <p>
          Dans le contexte d&lsquo;une base de données sur les statistiques de
          climat de ces dernières années, nous avons développé une application
          en C++ permettant la visualisation claire et simple de ces données.
          Cela passe donc par de multiples graphes, qui utilisent les valeurs de
          la base de données.
        </p>
        <h2>Caractéristiques techniques du projet</h2>
        <h3>Langages / technologies utilisées</h3>
        <p>
          Pour ce projet, j&lsquo;ai utilisé le langage de programmation{" "}
          <b>C++</b>, ainsi que la bibliothèque graphique LibGraph2. J&lsquo;ai
          également utilisé
          <b>Visual Studio</b> pour l&lsquo;environnement de développement, de
          pair avec
          <b>Git</b>.
        </p>
        <h3>Combien de temps, qui et quoi ?</h3>
        <p>
          Ce projet a été réalisé en une semaine, avec l&lsquo;aide de
          <a
            href="https://www.linkedin.com/in/lucas-chalmandrier/"
            target="_blank"
            rel="noopener"
          >
            Lucas Chalmandrier
          </a>
          et
          <a
            href="https://www.linkedin.com/in/florian-mure-9b335422b/"
            target="_blank"
            rel="noopener"
          >
            Florian Mure
          </a>
          . Ce projet a été réalisé dans le cadre d&lsquo;une Situation
          d&lsquo;Apprentissage et d&lsquo;Évaluation (SAE) pour notre formation
          en BUT Informatique Graphique.
        </p>
        <h2>Détails du projet</h2>
        <p>
          Le projet consistait à réaliser plusieurs graphiques pour visualiser
          l&lsquo;évolution des températures moyennes en France métropolitaine
          sur les 30 dernières années. L&lsquo;un des graphiques réalisés était
          le graphique spiral, qui permettait de visualiser l&lsquo;évolution
          des températures moyennes mensuelles sur une période de 30 ans.
        </p>
        <h3>Théorie pour le graphe spirale</h3>
        <p>
          Pour réaliser ce graphique, nous avons dû nous baser sur des éléments
          mathématiques. Nous avons considéré 6 axes pour répartir les 12 mois
          de l&lsquo;année sur un repère orthonormé. En utilisant des formules
          dépendant de la différence entre la valeur de moyenne courante et la
          valeur d&lsquo;index, nous avons calculé les coordonnées des points de
          chaque année. Cependant, pour adapter ce repère à notre modèle de
          Libgraph2, nous avons dû faire un correctif en ajoutant la moitié de
          la taille de la fenêtre sur les coordonnées X et Y des points.
        </p>
        <h3>Programmation</h3>
        <p>
          Nous avons commencé par boucler du premier janvier de la 2ᵉ année
          jusqu&lsquo;à la fin des données, puis avons calculé la valeur de T en
          multipliant par 48 les valeurs et en ajoutant 5 pour éviter les
          valeurs négatives. Ensuite, nous avons utilisé un switch sur les
          différents mois de l&lsquo;année pour créer un point avec les formules
          des coordonnées correspondantes et pousser dans un vecteur contenant
          toutes les informations. Enfin, nous avons parcouru tout le vecteur et
          dessiné un trait entre deux points consécutifs pour donner le rendu
          &quot;spirale&quot;. En fonction de la valeur de i, nous avons changé
          la couleur du trait d&lsquo;année en années.
        </p>
        <ImageOptimize
          src={graphiqueSpirale}
          alt="Graphique spirale"
          className="image"
        />
        <h2>Auto-critique du résultat</h2>
        <p>
          Bien que le projet ait été réalisé dans un temps limité, je suis assez
          satisfait du résultat obtenu. J&lsquo;ai réussi à créer les trois
          types de graphiques demandés, malgré quelques problèmes techniques
          avec la bibliothèque graphique LibGraph2. Toutefois, je pense que le
          projet aurait pu être amélioré avec un jeu de données plus importantes
          et une présentation plus esthétique des graphiques. Malgré tout, ce
          projet m&lsquo;a permis de développer mes compétences en programmation
          en C++ et en utilisation de la bibliothèque graphique LibGraph2, ainsi
          que de mieux comprendre l&lsquo;impact du changement climatique en
          France métropolitaine.
        </p>
        <ImageOptimize
          src={graphiqueClairFonce}
          alt="Graphique barres"
          className="image"
        />
        <div className="logos">
          <ImageOptimize src={cppLogo} alt="CPP logo" className="logo" />
          <ImageOptimize
            src={visualStudioLogo}
            alt="VisualStudio logo"
            className="logo"
          />
          <ImageOptimize src={gitLogo} alt="Git" className="logo" />
        </div>
        <h2>Sources du projet</h2>
        <div className="sources">
          <a
            href="https://github.com/lucaschlm/Graphiques-Rechauffement-Climatique"
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
