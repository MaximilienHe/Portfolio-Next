import "../style.css";
import "../projetstyle.css";
import type { Metadata } from "next";
import ImageOptimize from "@/components/imageOptimization";
import images from "@/data/images";
import logos from "@/data/logos";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Maximilien Herr - Numérique Responsable",
};

const { asciiArtIllustration, asciiArtResultCats } = images;
const { cppLogo, visualStudioLogo, gitLogo, logoSourcesProjet } = logos;

export default function AsciiArt() {
  const breadcrumbItems = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
    { name: "Projets", url: "https://maximilienherr.fr/projets" },
    { name: "Ascii Art", url: "https://maximilienherr.fr/projets/ascii-art" },
  ];
  return (
    <>
    <head>
      <title>Développement Logiciel - ASCII Art</title>
      <meta
        name="description"
        content="Développement d'un logiciel de traitement d'image pour convertir chaque pixel en caractères ASCII."
      />
      <link rel="canonical" href="https://maximilienherr.fr/projets/ascii-art" />

    </head>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <section className="content">
        <h1>Développement Logiciel - ASCII Art</h1>
        <p>
          Rapidement, le contexte de ce projet est de réaliser un logiciel
          capable d&apos;appliquer un traitement sur une image, pour convertir
          chaque pixel en caractères de la table ASCII. On convertit donc chaque
          composant de l&apos;image en caractères, comme &quot;W&quot;,
          &quot;w&quot;, &quot;l&quot; ...
        </p>
        <ImageOptimize
          src={asciiArtIllustration}
          alt="ascii art SAE illustration"
        />
        <h2>Caractéristiques techniques du projet</h2>
        <h3>Langages / technologies utilisés</h3>
        <p>
          Ce logiciel de traitement d&apos;image se fait à partir d&apos;un code
          en C++. Pour gérer les problèmes qui peuvent arriver dans le
          traitement d&apos;images, on a utilisé Visual Studio 2019, qui nous
          donne accès à un débuggeur très puissant. Ainsi, on a pu identifier
          l&apos;état de nos variables, notamment pour savoir si l&apos;on
          dépasse la taille de l&apos;image, si l&apos;on dépasse des valeurs…
        </p>
        <h3>Combien de temps, qui et quoi ?</h3>
        <p>
          Ce projet s&apos;inscrit dans le cadre de ma formation en BUT
          Informatique Graphique, à travers une SAE (Situation
          d&apos;Apprentissage et d&apos;Évaluation). Il a ainsi duré une
          douzaine d&apos;heures, comprenant le temps de développement, ainsi
          que le temps de rédaction du compte-rendu. J&apos;étais en
          collaboration avec
          <a
            href="https://www.linkedin.com/in/florian-mure-9b335422b/"
            target="_blank"
            rel="noopener"
          >
            Florian Mure
          </a>
          .
        </p>
        <p>
          Après avoir passé un premier temps sur du code du projet, je suis
          parti sur la création du compte-rendu de celui-ci, impliquant la bonne
          compréhension du projet.
        </p>
        <h2>Détails du projet</h2>
        <p>
          Ce projet était la première application pratique de nos compétences
          sur une durée prolongée, dans le cadre de ma formation. Pour le
          réaliser complètement à 2, nous avons utilisé GitHub, pour la première
          fois dans mon cas. Cela m&apos;a permis de me former brièvement sur
          l&apos;outil, et apprendre la collaboration à travers Git comme outil
          de partage de code.
        </p>
        <p>
          En termes de code à proprement parler, celui-ci répond aux exigences
          érigées en début de projet dans le sujet. Nous étions guidés dans sa
          réalisation (rappel : premier projet &quot;sérieux&quot;), pour
          autant, nous avons fini dans les délais, même en avance, avec un code
          qui fonctionnait dans tous les cas. En effet, comme nous traitons une
          image, il était possible que le traitement ne fonctionne pas selon
          certaines tailles d&apos;images, selon certaines configurations… Notre
          projet final est fonctionnel dans tous ces cas-là.
        </p>
        <p>
          Pour préciser un peu le déroulement de ce projet, il y avait 5
          versions, que nous devions réaliser chronologiquement, avec des
          indications au fur et à mesure :
        </p>
        <h3>Version 1</h3>
        <ul>
          entre la largeur ou la hauteur de l’image et width ou height. À partir
          <li>Récupération dimages en PGM</li>
          <li>
            Traitement des informations du fichier image (entête et corps)
          </li>
          <li>Conversion des informations du corps du fichier en ASCII Art</li>
        </ul>
        <p>
          entre la largeur ou la hauteur de l’image et width ou height. À partir
          On doit dabord utiliser un utilitaire fourni pour transformer des
          images type PNG ou JPEG en PGM.
        </p>
        <p>
          entre la largeur ou la hauteur de l’image et width ou height. À partir
          Une fois ces images transformées, lentête contient 2 informations
          importantes sur le fichier, sa largeur et sa hauteur. Ensuite, le
          corps du fichier, est composé de chaque pixel, codé sur un octet. Une
          fois la valeur convertie en ASCII (selon la palette fournie), on peut
          entre la largeur ou la hauteur de l’image et width ou height. À partir
          lafficher dans la console.
        </p>
        <h3>Version 2</h3>
        <ul>
          <li>Création d&apos;un fichier texte</li>
          <li>Exportation de l&apos;ASCII Art dans le fichier texte crée</li>
        </ul>
        <p>
          Cette partie est beaucoup plus succincte, il suffit de créer le entre
          la largeur ou la hauteur de l’image et width ou height. À partir
          fichier, que lon pourra nommer comme on le souhaite. Puis, au lieu
          entre la largeur ou la hauteur de l’image et width ou height. À partir
          dafficher dans la console, on exporte les valeurs dans le fichier
          texte créé.
        </p>
        <h3>Version 3</h3>
        <ul>
          <li>Lecture de fichiers textes &quot;palette&quot;</li>
          <li>
            Changement de l&apos;affichage de l&apos;ASCII Art selon la palette
            traitée
          </li>
        </ul>
        <p>
          On doit donc traiter les données des palettes, en ouvrant le fichier,
          qui présentent un nombre &quot;aléatoire&quot; de caractères. Du fait
          du caractère aléatoire du nombre de caractères, on doit adapter le
          programme pour afficher, avec les bons intervalles, les caractères
          ASCII de la palette.
        </p>
        <h3>Version 4</h3>
        <ul>
          <li>
            Entrée d&apos;arguments pour une exécution en invite de commande
          </li>
          <li>Affichage d&apos;un help</li>
          <li>
            Changement des arguments pour :
            <ul>
              <li>Fichier d&apos;entrée</li>
              <li>Fichier de sortie</li>
              <li>Fichier de palette</li>
            </ul>
          </li>
        </ul>
        <p>
          On doit alors utiliser des arguments en entrée du programme, qui vont
          entre la largeur ou la hauteur de l’image et width ou height. À partir
          nous permettre dafficher une aide, et de changer les paramètres du
          entre la largeur ou la hauteur de l’image et width ou height. À partir
          programme Les arguments sont de ce fait laide et les paramètres du
          programme, à savoir le chemin du fichier en entrée, du fichier de
          sortie, et du fichier palette.
        </p>
        <h3>Version 5</h3>
        <ul>
          <li>Ajout de deux arguments width et height</li>
          <li>Calcul du facteur de diminution</li>
          <li>
            Calcul de la moyenne de valeurs sur une zone et envoie des valeurs
            dans un tableau
          </li>
        </ul>
        <p>
          On rajoute désormais deux arguments width et height qui vont entre la
          largeur ou la hauteur de l’image et width ou height. À partir
          correspondre à la taille maximale que lon veut pour notre fichier.
          entre la largeur ou la hauteur de l’image et width ou height. À partir
          Seulement, on doit conserver une image propre, cest donc le facteur de
          diminution majoritaire qui va être conservé.
        </p>
        <p>
          Ce facteur de diminution sera ainsi la valeur maximale du rapport
          entre la largeur ou la hauteur de l’image et width ou height. À partir
          entre la largeur ou la hauteur de limage et width ou height. À partir
          de là, on doit parcourir de nouveau le tableau des données, en ne
          entre la largeur ou la hauteur de l’image et width ou height. À partir
          conservant quun pixel pour une zone du facteur (exemple, pour un
          facteur de diminution de 3, on remplace 9 pixels par 1).
        </p>
        <p>
          Et à la fin, ça nous donne des petits chats tout mignons en caractères
          de la table ASCII !
        </p>
        <ImageOptimize
          src={asciiArtResultCats}
          alt="Résultat du projet en version 5"
        />
        <h2>Auto-critique du résultat</h2>
        <p>
          Étant donné que nous sommes arrivés à la fin des 5 versions du projet,
          cette critique sera rapide. Nous avons bien travaillé, avec le respect
          du temps imparti. D&apos;autant plus que nous avions utilisé GitHub
          (donc Git) pour le partage de code, en se formant brièvement sur
          l&apos;outil. Cela nous a permis d&apos;avancer vraiment plus vite.
        </p>
        <div className="logos">
          <ImageOptimize src={cppLogo} alt="CPP" className="logo" />
          <ImageOptimize
            src={visualStudioLogo}
            alt="Visual Studio"
            className="logo"
          />
          <ImageOptimize src={gitLogo} alt="Git" className="logo" />
        </div>
        <h2>Sources du projet</h2>
        <a
          href="https://github.com/MaximilienHe/PGM-to-ASCII-Art"
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
