import "../style.css";
import "../projetstyle.css";
import type { Metadata } from "next";

import images from "@/data/images";
import logos from "@/data/logos";
import ImageOptimize from "@/components/imageOptimization";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
export const metadata: Metadata = {
  title: "Maximilien Herr - Temple 3D",
};

const {
  threeDsMaxLogo,
  substancePainterLogo,
  unrealLogo,
  gitLogo,
  logoSourcesProjet,
} = logos;
const { leConfidentSAE3D, gitlab } = images;

export default function Temple() {
  const breadcrumbTemple = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
    { name: "Projets", url: "https://maximilienherr.fr/projets" },
    {
      name: "3D et JV - Création d&lsquo;un musée en 3D",
      url: "https://maximilienherr.fr/projets/temple-3D",
    },
  ];
  return (
    <>
      <head>
        <title>3D et JV - Création d&lsquo;un musée en 3D</title>
        <meta
          name="description"
          content="Découvrez mon projet de création d'un musée en 3D, réalisé en groupe."
        />
        <link
          rel="canonical"
          href="https://maximilienherr.fr/projets/temple-3D"
        />
      </head>
      <BreadcrumbJsonLd items={breadcrumbTemple} />
      <section className="content">
        <h1>3D et JV - Création d&lsquo;un musée en 3D</h1>
        <iframe
          width="auto"
          height="400"
          src="https://www.youtube-nocookie.com/embed/XE1hPm167Uo"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <p>
          Ce projet est le projet de fin de première année de mon BUT
          Informatique Graphique. Cette partie graphique spécifique à
          l&lsquo;IUT du Puy-en-Velay se ressent dans ce projet. En effet,
          l&lsquo;ambition du projet ici est de créer un temple 3D (fourni, mais
          non texturé). Celui-ci devra présenter des œuvres contemporaines parmi
          une liste d&lsquo;artistes déterminée. Pour visiter ce musée, il faut
          le faire sous un format jeu-vidéo.
        </p>

        <h2>Caractéristiques techniques du projet</h2>
        <h3>Langages et technologies utilisées</h3>
        <p>
          Ce projet s&lsquo;articule autour de plusieurs parties, nécessitant
          des outils différents. Premièrement, il y a toute la partie
          modélisation et création des œuvres. Pour cela, nous avons utilisé ces
          outils et logiciels :
        </p>
        <ul>
          <li>
            <b>3DsMax</b> pour la modélisation
          </li>
          <li>
            <b>Substance Painter</b> pour la création (rapide) de textures
          </li>
        </ul>
        <p>
          Aussi, il était nécessaire de créer le jeu en tant que tel. Pour cela,
          nous avons utilisé :
        </p>
        <ul>
          <li>
            <b>Unreal Engine</b> comme moteur de jeu
          </li>
          <li>
            <b>C++ / BluePrint</b> pour créer le fonctionement du jeu
          </li>
        </ul>
        <p>
          Nous avons choisi Unreal Engine pour se défier avec un nouveau moteur
          de jeu. Les seuls jeux réalisés jusque-là étaient en 2D seulement, et
          qui plus est, sous Unity. Il y avait donc un double enjeu, ajouter une
          dimension, et découvrir un nouveau Game Engine.
        </p>
        <h3>Combien de temps, qui et quoi ?</h3>
        <p>
          Comme précisé au début, ce projet est celui de fin d&lsquo;année. Il
          s&lsquo;est déroulé sur 2 semaines de suite, à raison de 40 à 50
          heures par personne.
        </p>
        <p>
          Nous étions 5 sur ce projet, ce qui représente donc près de 200 heures
          de travail, comprenant donc la modélisation, la création de textures,
          la création du jeu, mais aussi des réunions d&lsquo;équipe … Les 5
          membres du projet sont :
          <a
            href="https://www.linkedin.com/in/eliot-bianchin/"
            target="_blank"
            rel="noopener"
          >
            Eliot Bianchin
          </a>
          ,
          <a
            href="https://www.linkedin.com/in/lucas-chalmandrier/"
            target="_blank"
            rel="noopener"
          >
            Lucas Chalmandrier
          </a>
          ,
          <a
            href="https://www.linkedin.com/in/l%C3%A9o-ricard-lissard-b358a9250/"
            target="_blank"
            rel="noopener"
          >
            Léo Ricard--Lissard
          </a>
          ,
          <a
            href="https://www.linkedin.com/in/florian-mure-9b335422b/"
            target="_blank"
            rel="noopener"
          >
            Florian Mure
          </a>
          , et moi-même.
        </p>
        <p>
          Sur ce projet, pour la partie technique, je me suis chargé des
          textures des œuvres, une fois que les autres membres les avaient
          créées. De plus, je devais m&lsquo;occuper des réunions
          d&lsquo;équipe, de l&lsquo;avancement, et de la bonne conduite du
          projet.
        </p>
        <h2>Détails du projet</h2>
        <p>
          L`objectif de notre temple est avant tout de rendre honneur aux
          artistes. En l`occurrence, nous avons été subjugués par le travail de
          Jean-Michel Othoniel, ainsi, nous avons préféré exploiter au maximum
          ces œuvres, et créer une scénographie autour de celles-ci. Pour la
          majorité des œuvres, nous avons utilisé une plane, dans la scène
          3DsMax, pour avoir une idée en permanence du résultat à produire.
        </p>
        <h3>Modélisation</h3>
        <p>
          Pour cette partie modélisation, je ne vais préciser que les œuvres que
          j&lsquo;ai réalisées. Si vous êtes intéressés par le projet, au sein
          des sources (bas de page), il est possible d&lsquo;accéder à
          l&lsquo;hébergement de nos ressources. Dans le dossier &ldquo;/Sujet
          et ressources initiales/Projet modélisation 3D - Compte
          Rendu.docx&ldquo; il y a le compte rendu.
        </p>
        <h4>&ldquo;Le confident&ldquo;, de Jean-Michel Othoniel</h4>
        <ul>
          <li>Utilisation de torus pour correspondre aux anneaux de l`œuvre</li>

          <li>Duplication de ces anneaux selon une première bande verticale</li>

          <li>
            Ajustements pour éviter de créer un motif n`étant pas présent dans
            l`œuvre
          </li>

          <li>
            Duplication horizontale pour correspondre à la taille de l`œuvre
          </li>

          <li>
            Dessin d`une ligne permettant de donner le tracé de la courbe de
            l`œuvre
          </li>

          <li>
            Plane avec 2 modifications (shell pour la profondeur, et un path
            deform pour le suivi du tracé)
          </li>

          <li>
            Ajout de deux planes correspondant aux soudures en haut et en bas de
            l`œuvre
          </li>

          <li>
            Render des anneaux + planes, pour l`utiliser en tant que Bitmap sur
            la plane (qui suit le tracé)
          </li>

          <li>
            Ajout des décorations sur le dessus de l`œuvre (suivant une ligne
            également)
          </li>

          <li>
            Ajout d`un banc (que l`on pourrait exploiter dans le développement,
            sur Unreal)
          </li>
        </ul>
        <ImageOptimize src={leConfidentSAE3D} alt="le confident SAE 3D" />
        <h4>
          &ldquo;Sans-titre&ldquo; (rebaptisée &ldquo;boules suspendues&ldquo;
          par Eliot), de Jean-Michel Othoniel
        </h4>
        <p>
          Cette œuvre est purement décorative, et se place à l`entrée de la
          salle principale du temple. Elle est par ailleurs composée de deux
          éléments principaux, les « boules suspendues », ainsi que le fil qui
          tient le tout.
        </p>
        <ul>
          <li>
            Création d&lsquo;un cylindre permettant la conduite des boules de
            l&lsquo;œuvre
          </li>
          <li>
            Ajout des boules de l&lsquo;œuvre (chacune étant différente, pas
            possible de copier/coller)
          </li>
        </ul>
        <div style={{ textAlign: "center" }}>
          <ImageOptimize
            src={substancePainterLogo}
            alt="boules suspendues SAE 3D"
            // width={"40%"}
          />
        </div>
        <h3>Texture</h3>
        <p>
          Pour texturer les œuvres, l`essentiel a été fait via les textures
          proposées par Substance Painter. Il y a une exception sur les textures
          de verre, non proposées par Substance. Nous avons donc utilisé des
          ressources externes en ligne, dédiées à Unreal Engine 4/5.
        </p>
        <p>
          Pour plus de détail sur la méthode d&lsquo;export et de texturing,
          c&lsquo;est toujours dans le compte rendu, dans le dossier
          &ldquo;/Sujet et ressources initiales/Projet modélisation 3D - Compte
          Rendu.docx&ldquo; sur GitLab.
        </p>
        <h3>Gestion de projet</h3>
        <h4>Planification des tâches</h4>
        <p>
          Pour travailler au mieux, et pour maintenir un avancement permettant
          de respecter la deadline finale, il était important de planifier les
          tâches et des réunions. Les tâches n`avaient pas une deadline précise,
          à l`heure près, l`objectif était plutôt d`avoir des réunions toutes
          les 2 ou 4 heures. Et on pouvait ainsi faire le point sur l`avancement
          de tous les membres.
        </p>
        <h4>Gestion de l&lsquo;organisation</h4>
        <p>
          L`objectif était d`avoir les différentes tâches prévues dans
          différentes listes du Trello. C`est une bonne visualisation de
          l`avancement du projet, en ayant notamment une liste prévue pour la
          liste des tâches terminées. Par ailleurs, la possibilité d`attribuer
          des étiquettes accroît cette visualisation du projet dans son
          entièreté.
        </p>
        <h4>Discussion et aide</h4>
        <p>
          Pour pouvoir discuter et poser des problèmes, questionnements… quelque
          part, nous avons utilisé Discord. Cela permettait de recenser les
          points de blocage (sur Discord ou Trello d`ailleurs), les ressources
          du projet, comme le lien vers le Trello, GitLab… Et bien évidemment,
          les discussions se faisaient aussi dans cet espace dédié.
        </p>
        <h4>Partage de fichiers</h4>
        <p>
          Nous travaillons sur de nombreux fichiers, qui plus est, lourds.
          Ainsi, il est important d`avoir un bon système pour partager les
          fichiers entre nous. Cette obligation d`avoir chacun une « casquette »
          différente, entre Infographiste, gestion des textures, développeur…
          oblige d`avoir une bonne communication également. Donc, nous avons
          utilisé GitLab, avec une structure de dossiers, pour stocker nos
          fichiers de la meilleure des manières pour tout le monde.
        </p>
        <ImageOptimize src={gitlab} alt="gitlab" />
        <h2>Auto-critique du résultat</h2>
        <p>
          Sur le plan technique du jeu, celui-ci est bon, et est amplement
          suffisant pour l&lsquo;ambition du projet. Il fallait simplement un
          personnage qui puisse se promener dans ce temple, c&lsquo;est chose
          faite. Il est même possible de voir les œuvres à travers les murs,
          fonctionnalité supplémentaire que nous avons rajouté. Plein de choses
          étaient possibles, notamment des interactions avec les œuvres
          modélisées, que nous avons initié avec des cinématiques ou des petits
          papiers d&lsquo;information. On aurait pu aller plus loin, mais le
          temps nous a contraints, et ce n&lsquo;était pas tant
          l&lsquo;objectif.
        </p>
        <p>
          Pour la modélisation, celle-ci, bien que simpliste étant donné que
          nous sommes loin d&lsquo;être des experts dans le domaine, était
          suffisante pour le projet. Sur la partie texture, faute de formation,
          nous sommes restés simples également. Nous n&lsquo;avons pas créé de
          texture par nous-même, ce sont seulement celles proposées par
          Substance Painter.
        </p>
        <p>
          Enfin, la gestion du projet a permis de rendre le projet et le
          présenter dans le temps imparti, tout en permettant à chacun de
          pouvoir démontrer ses compétences.
        </p>
        <div className="logos">
          <ImageOptimize
            src={threeDsMaxLogo}
            alt="threeDsMaxLogo"
            className="logo"
          />
          <ImageOptimize
            src={substancePainterLogo}
            alt="substancePainterLogo"
            className="logo"
          />
          <ImageOptimize
            src={unrealLogo}
            alt="UnrealEngine logo"
            className="logo"
          />
          <ImageOptimize src={gitLogo} alt="Git" className="logo" />
        </div>
        <h2>Sources du projet</h2>
        <div className="sources">
          <a
            href="https://gitlab-lepuy.iut.uca.fr/maherr/sae-3d"
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
