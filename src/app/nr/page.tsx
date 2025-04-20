import "./style.css";
import type { Metadata } from "next";
import ImageOptimize from "@/components/imageOptimization";
import Link from "next/link";
import images from "@/data/images";

const { numeriqueResponsable } = images;

export const metadata: Metadata = {
  title: "Maximilien Herr - Numérique Responsable",
};

export default function Nr() {
  return (
    <>
      <section className="nr">
        <h2>Le numérique responsable : penser performance et efficience</h2>
        <p>
          Au fil de ma formation en informatique et de mes missions en
          tant qu'ingénieur informatique, j’ai progressivement compris que
          l’objectif n’était pas simplement de rendre un service « vert », mais
          de concevoir des architectures et des algorithmes dont la légèreté et
          l’optimisation sont prioritaires. Réduire le nombre de requêtes,
          minimiser l’empreinte mémoire ou optimiser les pipelines de calcul
          s’inscrit dans un souci de performance dont l’impact carbone est la
          conséquence directe.
        </p>
        <p>
          Cette démarche nécessite des compétences variées : audit de code,
          profilage, choix d’outils adaptés et mise en place de métriques de
          suivi. En entreprise, j’ai pu déployer des solutions de monitoring de
          la consommation CPU et de la latence, afin d’identifier les points de
          contention et de prioriser les optimisations.
        </p>

        <ImageOptimize src={numeriqueResponsable} alt="Schéma d'efficience numérique" />

        <h2>Applications concrètes dans mes réalisations</h2>
        <p>
          Dans&nbsp;
          <Link href="/projets/droidsoft-app/#GreenIT">DroidSoft</Link>
          , l’un des enjeux majeurs a été la sobriété logicielle. En évaluant le
          coût énergétique de chaque dépendance, j’ai limité l’ajout de
          bibliothèques externes et favorisé des composants natifs, plus
          performants. Le passage à un mode sombre optimisé a réduit la
          sollicitation GPU sur les appareils AMOLED, diminuant la
          consommation d’énergie jusqu’à 20 % selon mes mesures.
        </p>
        <p>
          Sur un autre projet interne, j’ai mis en place un système de mise en
          cache à différents niveaux (navigateur, CDN, serveur). En combinant
          l’usage de HTTP/2 et d’un bundler configuré pour le tree-shaking, nous
          sommes parvenus à réduire de 35 % le volume de données échangées, tout
          en maintenant un temps de réponse sous la barre des 200 ms.
        </p>

        <h2>Participation à un hackathon dédié</h2>
        <p>
          En début de 2<sup>e</sup> année de BUT, nous nous sommes rendus à Lyon
          pour les Journées du Numérique Responsable, ponctuées d’un hackathon
          d’une journée. L’exercice consistait à concevoir un prototype en
          quelques heures et à le défendre devant un jury et les autres
          participants. Le 
          <a href="https://ig.iut-clermont.fr/news/les-journees-du-numerique-responsable-2-jours-pour-programmer-vert/">
            projet de mon équipe a été retenu comme le plus pertinent
          </a>
          &nbsp;et a conquis le Jury 🏆.
        </p>

        <h2>Perspectives et bonnes pratiques</h2>
        <p>
          Le numérique responsable est un processus continu : veille technologique,
          mise à jour régulière des dépendances, audits de performance et
          sensibilisation des équipes restent indispensables. Je m’appuie sur
          l’utilisation d’outils open-source pour mesurer les performances et
          sur des guidelines internes pour garantir une approche cohérente au
          sein des projets.
        </p>
        <p>
          Cette vision, issue de ma formation et consolidée par mes expériences
          professionnelles, place la performance au cœur de tout développement,
          faisant du numérique responsable un atout pour la durabilité et la
          compétitivité des solutions.
        </p>
      </section>
    </>
  );
}
