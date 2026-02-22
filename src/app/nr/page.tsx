import "./style.css";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import images from "@/data/images";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExploreAlso } from "@/components/ExploreAlso";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo";

const { numeriqueResponsable } = images;
const pagePath = "/nr";
const pageUrl = getCanonicalUrl(pagePath);

export const metadata: Metadata = buildPageMetadata({
  path: pagePath,
  title: "Numérique Responsable",
  description:
    "Approche et réalisations de Maximilien Herr autour du numérique responsable et de la sobriété logicielle.",
  ogTitle: "Numérique Responsable | Maximilien Herr",
  ogDescription: "Optimisations, hackathon et bonnes pratiques en sobriété numérique.",
  type: "article",
  keywords: ["numérique responsable", "sobriété logicielle", "performance", "green IT"],
  imageAlt: "Bannière Numérique Responsable",
});

export default function Nr() {
  const breadcrumbItems = [
    { name: "Accueil", url: getCanonicalUrl("/") },
    { name: "Numérique Responsable", url: pageUrl },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <section className="nr">
        <div className="inner">
          <h1>Numérique Responsable</h1>

          <h2>Le numérique responsable : penser performance et efficience</h2>
          <p>
            Je n&apos;aborde pas le numérique responsable par idéologie, ni comme un
            sujet politique ou d&apos;image. Pris uniquement sous cet angle, je trouve
            l&apos;approche souvent peu concluante. Ma logique est d&apos;abord technique :
            un site ou un logiciel bien optimisé consomme moins de ressources, ce
            qui est effectivement plus sobre, mais c&apos;est surtout plus agréable et
            plus fiable pour les utilisateurs.
          </p>
          <p>
            Au fil de ma formation et de mes missions d&apos;ingénierie, j&apos;ai donc
            privilégié des actions concrètes : réduire les requêtes inutiles,
            limiter les transferts réseau, optimiser le rendu et mesurer les
            performances. Cette démarche demande des audits réguliers, du
            profilage, des choix d&apos;outils adaptés et un suivi par métriques
            (latence, CPU, volume de données) pour prioriser ce qui améliore
            réellement l&apos;expérience.
          </p>

          <Image
            src={numeriqueResponsable.image}
            width={numeriqueResponsable.width}
            height={numeriqueResponsable.height}
            quality={72}
            alt="Schéma d'efficience numérique"
            sizes="(max-width: 991px) calc(100vw - 4rem), 560px"
            loading="lazy"
            decoding="async"
          />

          <h2>Applications concrètes dans mes réalisations</h2>
          <p>
            Dans&nbsp;
            <Link href="/projets/droidsoft-app/#GreenIT">DroidSoft</Link>
            , l&apos;un des enjeux majeurs a été la sobriété logicielle. En évaluant le
            coût énergétique de chaque dépendance, j&apos;ai limité l&apos;ajout de
            bibliothèques externes et favorisé des composants natifs, plus
            performants. Le passage à un mode sombre optimisé a réduit la
            sollicitation GPU sur les appareils AMOLED, diminuant la
            consommation d&apos;énergie jusqu&apos;à 20 % selon mes mesures.
          </p>
          <p>
            Sur un autre projet interne, j&apos;ai mis en place un système de mise en
            cache à différents niveaux (navigateur, CDN, serveur). En combinant
            l&apos;usage de HTTP/2 et d&apos;un bundler configuré pour le tree-shaking, nous
            sommes parvenus à réduire de 35 % le volume de données échangées, tout
            en maintenant un temps de réponse sous la barre des 200 ms.
          </p>

          <h2>Participation à un hackathon dédié</h2>
          <p>
            En début de 2<sup>e</sup> année de BUT, nous nous sommes rendus à Lyon
            pour les Journées du Numérique Responsable, ponctuées d&apos;un hackathon
            d&apos;une journée. L&apos;exercice consistait à concevoir un prototype en
            quelques heures et à le défendre devant un jury et les autres
            participants. Le&nbsp;
            <a href="https://ig.iut-clermont.fr/news/les-journees-du-numerique-responsable-2-jours-pour-programmer-vert/">
              projet de mon équipe a été retenu comme le plus pertinent
            </a>
            &nbsp;et a conquis le Jury.
          </p>

          <h2>Perspectives et bonnes pratiques</h2>
          <p>
            Le numérique responsable est un processus continu : veille technologique,
            mise à jour régulière des dépendances, audits de performance et
            sensibilisation des équipes restent indispensables. Je m&apos;appuie sur
            l&apos;utilisation d&apos;outils open-source pour mesurer les performances et
            sur des guidelines internes pour garantir une approche cohérente au
            sein des projets.
          </p>
          <p>
            Cette vision, issue de ma formation et consolidée par mes expériences
            professionnelles, place la performance au cœur de tout développement,
            faisant du numérique responsable un atout pour la durabilité et la
            compétitivité des solutions.
          </p>
        </div>
      </section>
      <ExploreAlso currentPath="/nr" />
    </>
  );
}

