import "../style.css";
import "../projetstyle.css";
import type { Metadata } from "next";

import images from "@/data/images";
import logos from "@/data/logos";
import ImageOptimize from "@/components/imageOptimization";

export const metadata: Metadata = {
  title: "Maximilien Herr - Blog sans CMS",
};

const { vuejsLogo, mysqlLogo, redisLogo, gitLogo, logoSourcesProjet } = logos;
const { blogSansCMS } = images;

export default function Blog() {
  return (
    <>
      <section className="content">
        <h1>Développement Web - Création d&apos;un blog sans CMS</h1>
        <p>
          Dans le monde du Web, il existe de nombreux CMS qui peuvent permettre
          la création de blog, comme WordPress. Mais pour continuer
          d&apos;acquérir des compétences en Web, on peut faire son blog par
          soi-même. Il s&apos;agit donc ici de permettre la consultation
          d&apos;articles, les filtrer par catégories, pouvoir commenter, et
          liker ces articles là. Également, il doit être possible de se
          connecter pour accéder à ses favoris, en tant qu&apos;utilisateur
          basique.
        </p>
        <iframe
          width="auto"
          height="400"
          src="https://www.youtube-nocookie.com/embed/QvCV1L5tSDo"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <h2>Caractéristiques techniques du projet</h2>
        <h3>Langages / technologies utilisés</h3>
        <p>
          Il y a une double facette autour de ce projet. D&apos;une part, il y a
          une partie front end (la partie visible du site, style …) qui doit
          être gérée. D&apos;autre part, la partie backend (les
          &quot;rouages&quot; du site) doit gérer le stockage des articles, des
          likes, des favoris, des commentaires, des informations des
          utilisateurs…
        </p>
        <p>
          Pour ce faire, le backend se base sur quelques technologies et un
          framework :
        </p>
        <ul>
          <li>
            <b>KoaJS</b> pour le framework
          </li>
          <li>
            <b>MySQL</b> pour la gestion de la base de données
          </li>
          <li>
            <b>Redis</b>
          </li>
        </ul>
        <p>
          Aussi, la partie front quant à elle se base sur un simple framework,
          <b>VueJS</b>. J&apos;étais d&apos;ailleurs en charge de cette partie
          front, qui devait donc exploiter les données ou permettre d&apos;en
          ajouter.
        </p>

        <h3>Combien de temps, qui et quoi ?</h3>
        <p>
          Ce projet s&apos;inscrit dans les cours de Web dispensés durant mon
          BUT Informatique. L&apos;ambition était ainsi de réaliser ce blog sans
          CMS, comme précisé plus haut. Nous étions 2 sur le projet,
          <a href="https://www.linkedin.com/in/farouk-abidi/">
            Farouk Abidi
          </a>{" "}
          et moi-même. Lui s&apos;est occupé de la partie backend, et moi la
          partie frontend.
        </p>
        <p>
          Ce projet s&apos;est étalé sur 2 mois environ, à raison d&apos;une
          trentaine d&apos;heures. Cela comprend la réalisation concrète du
          projet, mais aussi le temps de formation, pour ma part sur VueJS
          (utilisation du framework, router …).
        </p>
        <h2>Détails du projet</h2>
        <p>
          Ce projet s&apos;articule sous différents points. Il y a tout
          d&apos;abord une partie au niveau de la consultation des articles (en
          liste, et dans leur détail). Il est aussi question de la gestion du
          profil utilisateur. D&apos;une part, il y a les utilisateurs
          classiques, qui doivent pouvoir liker et commenter un article, mais
          aussi mettre en favori un article. D&apos;autre part, les
          administrateurs doivent pouvoir faire la même chose, mais aussi créer
          des articles et les poster.
        </p>
        <h3>Consultation des articles</h3>
        <p>
          L&apos;objet principal de ce blog, c&apos;est afficher tous les
          articles à la suite, pouvoir les filtrer par catégorie, et lire un
          article. Ainsi, sur la page principale, vous pouvez voir tous les
          derniers articles, par chronologie inversée de parution (plus récents
          en premier, plus anciens en dernier). En haut de la page principale,
          on peut choisir une catégorie d&apos;articles en particulier. Ici, ce
          sont &quot;Actualités&quot;, &quot;Tests&quot;, &quot;Dossier&quot; et
          &quot;Guide&quot;.
        </p>
        <p>
          Ensuite, une fois que l&apos;on s&apos;intéresse à un article
          spécialement, on peut le lire. La structure de celui-ci est comme une
          page Web classique. Cela veut donc dire que l&apos;on a une miniature
          principale avec le titre, l&apos;auteur… Mais le contenu en lui-même,
          ce sont des titres, 2 ou 3, des paragraphes… Cela passe par un WYSIWYG
          pour obtenir cette structure, mais j&apos;y reviendrai plus tard.
        </p>
        <ImageOptimize
          src={blogSansCMS}
          alt="Blog sans CMS illustration HomePage"
        />
        <h3>Profil utilisateur</h3>
        <p>
          Un utilisateur a donc la possibilité, une fois sur un article, de le
          liker s&apos;il le souhaite. Parce que l&apos;objectif, c&apos;est
          d&apos;avoir de bonnes statistiques, on ne peut pas retirer un like
          (logique). De même pour les commentaires, on peut en rajouter, avec le
          contenu et le pseudo, pseudo lié au login de l&apos;utilisateur.
        </p>
        <p>
          En effet, on peut ainsi s&apos;identifier et se créer des comptes sur
          le site, mais c&apos;est une partie plus gérée en backend, je ne
          m&apos;étalerai alors pas sur le sujet.
        </p>
        <p>
          Autrement, une autre action possible de l&apos;utilisateur, c&apos;est
          de rajouter un article en favori. Une fois que celui-ci est dans la
          liste des favoris de l&apos;utilisateur, il peut être consulté depuis
          un onglet &quot;Favori&quot; en haut à droite de l&apos;affichage.
          Tout l&apos;affichage relevant du fait que l&apos;on soit connecté ou
          non est dynamique. Ainsi, si vous n&apos;êtes pas connecté, vous ne
          voyez qu&apos;un bouton vous invitant à vous login. Si vous êtes
          effectivement connecté, ce bouton disparaît, pour laisser la
          possibilité de vous déconnecter, ou consulter vos favoris.
        </p>
        <p>
          Enfin, la partie administrateur. Si êtes un privilégié sur le site,
          vous pouvez ajouter des articles pour le blog. Cela passe donc par un
          WYSIWYG, comme précisé plus haut. On doit donc renseigner d&apos;abord
          des champs, dont le titre, l&apos;image, les catégories… Mais pour le
          contenu, on peut écrire de manière naturelle, avec une hiérarchisation
          de l&apos;information possible (H2, H3, p …).
        </p>
        <h2>Auto-critique du résultat</h2>
        <p>
          Sur ce projet, nous étions sur un temps imparti limité. Il était en
          conséquence nécessaire de remplir les objectifs, qui sont exactement
          tout ce que je vous ai cité. Parmi ceux-ci, certains étaient requis,
          d&apos;autres optionnels (commentaires et likes, ainsi que le CSS du
          site). Autrement, les fonctionnalités ont été bien implémentées au
          sein du projet, à travers Git, comme sur la plupart de mes projets
          désormais.
        </p>
        <p>
          La seule critique négative, ça serait qu&apos;il manque de feedback
          sur le site. Si nous nous trompons pour la connexion,
          l&apos;utilisateur ne sait pas si c&apos;est son login ou son mot de
          passe qui est incorrect. De même pour la partie création de compte. De
          manière générale, une partie UX serait à faire, mais ce n&apos;était
          pas l&apos;objectif ici.
        </p>
        <div className="logos">
          <ImageOptimize src={vuejsLogo} alt="VueJS" className="logo" />
          <ImageOptimize src={mysqlLogo} alt="MySQL" className="logo" />
          <ImageOptimize src={redisLogo} alt="redis" className="logo" />
          <ImageOptimize src={gitLogo} alt="Git" className="logo" />
        </div>
        <h2>Sources du projet</h2>
        <a
          href="https://github.com/MaximilienHe/Le-blog-tah-les-fous"
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
