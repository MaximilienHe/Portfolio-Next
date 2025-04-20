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
  kotlinLogo,
  javascriptLogo,
  gitLogo,
  androidStudioLogo,
  logoSourcesProjet,
} = logos;
const {
  design,
  designOLED,
  endpoints,

  droidsoftAppHorizontal,
} = images;

export default function Droid() {
  return (
    <>
      <section className="content">
        <h1>Application Mobile - DroidSoft App</h1>
        <p>
          A l&apos;occasion du projet tutoré de 2e année, j&apos;ai entrepris le
          développement d&apos;une application mobile pour DroidSoft. DroidSoft
          est un média en ligne (sous WordPress), spécialisé dans les
          technologies autour du monde d&apos;Android. Ce sont notamment les
          smartphones, les tablettes, les écouteurs, les montres connectées …
          Ainsi, dédié à ces technologies, il était pertinent d&apos;investir un
          support mobile intégré, et pas simplement la version mobile du site.
          C&apos;est donc ça la genèse du projet, mais comment l&apos;avons-nous
          fait ? ⤵️
        </p>
        <ImageOptimize src={droidsoftAppHorizontal} alt="Logo DroidSoft App" />
        <h2>Caractéristiques techniques du projet</h2>
        <h3>Langages / technologies utilisés</h3>
        <p>
          Ce projet étant assez important, plusieurs aspects sont travaillés. Il
          y a d&apos;abord l&apos;application en elle-même, qui utilise deux
          technologies :
        </p>
        <ul>
          <li>
            <b>Android Studio</b>
          </li>
          <li>
            <b>Kotlin</b>
          </li>
        </ul>
        <p>
          Le choix de Kotlin se justifie par une demande plus importante, et une
          modernité contrairement à Java.
        </p>
        <p>
          D&apos;autre part, nous avons une partie avec création d&apos;API,
          pour récupérer et créer une base de données de smartphones. Cette API
          se base sur ces technologies :
        </p>
        <ul>
          <li>
            <b>Javascript</b> (scrapping avec Cheerio)
          </li>
          <li>
            <b>Express.js</b> (Récupération des données scrappées par
            l&apos;API, pour l&apos;enregistrement dans la BDD)
          </li>
          <li>
            <b>MySQL</b> pour la gestion de la BDD
          </li>
        </ul>
        <p>
          Pour expliquer brièvement le cheminement des données, elles sont
          scrappées et une création de route se fait selon les données
          scrappées. On récupère ensuite les données scrappées pour les remplir
          en base de données, et une autre API ouvre des endpoints pour
          récupérer les données enregistrées dans la base de données.
        </p>
        <h3>Combien de temps, qui et quoi ?</h3>
        <p>
          Ce projet est le projet tutoré réalisé en 2e année, il s&apos;est donc
          étalé de novembre 2022 jusqu&apos;à fin mars 2023. En temps total
          alloué, on se place sur 150h environ par personne.
        </p>
        <p>
          Pour ce projet, nous étions 4 à le réaliser :
          <a
            href="https://www.linkedin.com/in/lucas-chalmandrier/"
            target="_blank"
            rel="noopener"
          >
            Lucas Chalmandrier
          </a>
          ,
          <a
            href="https://www.linkedin.com/in/eliot-bianchin/"
            target="_blank"
            rel="noopener"
          >
            Eliot Bianchin
          </a>
          ,
          <a
            href="https://www.linkedin.com/in/quentin-detr%C3%A9/"
            target="_blank"
            rel="noopener"
          >
            Quentin Detré
          </a>
          et moi-même.
        </p>
        <p>
          Etant à l&apos;origine partagée avec les responsables de DroidSoft de
          ce projet, j&apos;étais en charge des relations avec le média. Pour
          bien entreprendre le travail, cela me tenait à cœur de m&apos;occuper
          de la gestion de l&apos;équipe du projet, ce que j&apos;ai donc fais.
          Et en partie technique, je me suis concentré sur le développement de
          l&apos;application dans un premier temps, puis je suis parti sur la
          création de l&apos;API pour la base de données.
        </p>
        <h2>Détails du projet</h2>
        <p>
          Ce projet se concentre donc autour de 4 piliers majeurs. Il y a
          d&apos;une part toute une recherche sur le design, pour intégrer au
          mieux les notions d&apos;UI et d&apos;UX pour rendre
          l&apos;application ergonome. Aussi, il était important de maîtriser la
          communication avec des APIs, en particulier celle de WordPress, qui
          nous permet la récupération des articles, des commentaires … Le
          développement de l&apos;application est aussi au centre du projet,
          avec des technologies nouvelles (Android Studio et Kotlin) au début du
          projet. C&apos;était un pari plus risqué, mais réussi. Et enfin, la
          création de l&apos;API et de la base de données est le 4e pilier de ce
          projet.
        </p>
        <h3>Design / UI & UX</h3>
        <p>
          Je n&apos;ai pas crée directement le design, pour cette partie là,
          j&apos;étais en charge de faire des retours aux clients sur ce qui
          était fait, pour adapter en conséquence le design. Connaissant
          l&apos;ambition du projet, j&apos;ai par ailleurs aidé la personne en
          charge, afin qu&apos;elle sache quoi faire, et lui donner les éléments
          de la charte graphique du site.
        </p>
        <ImageOptimize src={design} alt="design DroidSoft App" />
        <div id="#GreenIT"></div>
        <h3>La petite touche Green IT & Numérique Responsable</h3>
        <p>
          Pour axer notre projet autour de la sensibilisation au Green IT que
          l&apos;on a en cours, nous avons placé le design au centre de cette
          réflexion Numérique Responsable.
        </p>
        <p>
          Un peu de contexte d&apos;abord. Sur le marché des smartphones, une
          technologie d&apos;écran domine le marché, à savoir l&apos;OLED. Cette
          technologie d&apos;affiche fait en sorte que chaque pixel de
          l&apos;écran s&apos;allume ou s&apos;éteigne individuellement. Ainsi,
          dans le cas de l&apos;affichage d&apos;un pixel noir, le pixel associé
          s&apos;éteindra.
        </p>
        <p>
          C&apos;est pourquoi, nous avons opté pour deux designs, un
          <i>Light Mode</i> et un <i>Dark Mode</i>. Le <i>Dark Mode</i> peut
          utiliser des teintes de couleurs sombres, ou simplement un fond noir.
          Et si le design est justement réellement noir, et non pas une teinte
          colorée, cela permet d&apos;éteindre les pixels affichés, ce qui
          augmente le contraste d&apos;ailleurs. Le bénéfice est donc à la fois
          pour l&apos;environnement, mais aussi pour l&apos;accessibilité.
        </p>
        <ImageOptimize src={designOLED} alt="Oled design vs Not Oled design" />
        <h3>Communication avec l&apos;API WordPress</h3>
        <p>
          Au sein de l&apos;application, il a fallu intégrer la communication
          avec l&apos;API de WordPress, qui est très exhaustive et complète.
          C&apos;était l&apos;avantage, nous avions une base solide pour
          interagir avec les données du site.
        </p>
        <h3>Développement de l&apos;application</h3>
        <p>
          Comme précisé plus haut, on est parti sur un développement en Kotlin,
          sous Android Studio. Dans ce développement, deux choses étaient à
          réaliser, la partie fonctionnelle, et la partie graphique de
          l&apos;application. Sur l&apos;ensemble de l&apos;application, je me
          suis placé sur les deux aspects de celle-ci.
        </p>
        <p>
          L&apos;intérêt de ce projet était d&apos;expérimenter un aspect de la
          formation que nous n&apos;avions pas vu, le développement
          d&apos;applications. Par ailleurs, en se plaçant sur des technologies
          plus récentes et plus demandées, cela permet d&apos;avoir un rendu
          presque professionnel.
        </p>
        <p>
          Nous avons aussi profité de ce projet pour travailler en mode
          `&ldquo;entreprise`&ldquo;. Cela passe par l&apos;utilisation de Git
          (GitHub) pour le partage de code, avec une rigueur dans son usage. Le
          partage de tâche s&apos;est fait selon une `&ldquo;spécialité`&ldquo;,
          design, app ou création de l&apos;API / BDD.
        </p>
        <h3>Création d&apos;API et BDD</h3>
        <p>
          Comme précisé plus haut aussi, la création de cette API se fait en
          javascript pour le <i>scraping</i>, mais aussi pour l&apos;interaction
          avec la base de données. Celle-ci est d&apos;ailleurs gérée en MySQL,
          avec une conception réfléchie pour améliorer la rapidité. Le
          <i>scraping</i> récupère des données sous un format initial, se basant
          sur un triplet de chemins d&apos;accès.
        </p>
        <ImageOptimize src={endpoints} alt="endpoints" />
        <p>
          On a le /brands qui nous donne les marques, le /brand/&#123;url&#125;
          qui nous donne tous les produits d&apos;une marque, et le
          /device/&#123;url&#125; qui nous donne les détails techniques de ce
          téléphone. Un premier script était en charge de récupérer ces données,
          et de les stocker dans une base de données. Ensuite, tous les jours,
          un second script doit comparer pour trouver les nouvelles données, et
          les enregistrer.
        </p>
        <h2>En résumé</h2>
        <p>
          Ce projet a donc été une porte ouverte sur le travail en entreprise.
          Nous avons à la fois travaillé en groupe, à travers des outils
          professionnels (Git, Trello ...), mais aussi selon un cahier des
          charges, et des tâches définies. Chacun travaillant sur un pannel de
          tâches défini, c&apos;est plus favorable à une amélioration de ses
          capacités dans ce domaine. Enfin, sur des projets en entreprise, il
          est tout à fait possible de ne pas connaître les technologies
          utilisées, c&apos;est pourquoi, nous sommes partis dans
          l&apos;inconnu, avec Android Studio et Kotlin, que nous n&apos;avions
          jamais travaillé ou vu auparavant.
        </p>
        <h2>Auto-critique du résultat</h2>
        <p>
          Pour parler un peu plus du résultat du projet, il est nécessaire
          d&apos;inclure les retours que l&apos;on a eu de la part de DroidSoft,
          qui commanditait le projet. Si nous reprenons les éléments dans
          l&apos;ordre, nous avons commencé à partir du design. Celui-ci a donc
          été réalisé au jour le jour, avec des retours au jour le jour
          également. L&apos;objectif était clair, ne pas aller droit dans le
          mur, et se baser sur les envies et les appréciations de l&apos;équipe
          de DroidSoft. Cette partie communication était aisée, simplement des
          messages sur Slack avec les éléments de design produits, en demandant
          de valider ou non.
        </p>
        <p>
          Pour la partie développement de l&apos;application, bien que nous
          partions sur une base solide, sur laquelle, nous devions ajouter plein
          d&apos;éléments, tout en se formant, ça a manqué de rapidité. Nous
          aurions pu réaliser plus de fonctionnalité, avec des deadlines plus
          courtes. Mais dans l&apos;ensemble, à la première date butoir, nous
          avions une application fonctionnelle, et qui répondait aux critères
          minimaux d&apos;une application de ce type (<i>media player</i> pour
          Android).
        </p>
        <p>
          Enfin, pour la partie création de l&apos;API des smartphones (avec
          base de données), étant donné que cela s&apos;étalait aussi sur mon
          projet de stage, j&apos;ai repris en main cette partie là sur le 3e
          sprint. Etant donné qu&apos;il y avait beaucoup d&apos;intermédiaires
          (le site que l&apos;on scrappe, une API tampon …) cela impliquait des
          contre-temps. Mais dans l&apos;ensemble, le résultat est bon. Comme je
          viens de le dire, c&apos;est lié à mon stage, donc j&apos;en
          reparlerai dans le projet `&ldquo;Stage`&ldquo; qui arrivera à la fin
          de celui-ci sur ce site !
        </p>

        <div className="logos">
          <ImageOptimize src={kotlinLogo} alt="kotlin" className="logo" />
          <ImageOptimize
            src={androidStudioLogo}
            alt="AndroidStudio"
            className="logo"
          />
          <ImageOptimize
            src={javascriptLogo}
            alt="JavaScript"
            className="logo"
          />
          <ImageOptimize src={gitLogo} alt="Git" className="logo" />
        </div>
        <h2>Sources du projet</h2>
        <div className="sources">
          <a
            href="https://github.com/MaximilienHe/DroidApp"
            target="_blank"
            rel="noopener"
          >
            <p>Sources de l&apos;application</p>
            <ImageOptimize
              src={logoSourcesProjet}
              alt="Sources du projet"
              className="logo"
            />
          </a>
          <a
            href="https://github.com/MaximilienHe/DroidApp"
            target="_blank"
            rel="noopener"
          >
            <p>Sources de l&apos;API de scrapping</p>
            <ImageOptimize
              src={logoSourcesProjet}
              alt="Sources du projet"
              className="logo"
            />
          </a>
          <a
            href="https://github.com/MaximilienHe/Phone-API-BDD"
            target="_blank"
            rel="noopener"
          >
            <p>Sources des scripts liés à l&apos;API base de données</p>
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
