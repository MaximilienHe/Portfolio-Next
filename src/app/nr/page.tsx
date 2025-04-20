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
        <h2>Le Numérique Responsable, des compétences à mobiliser</h2>
        <p>
          Au cours de ma formation en BUT Informatique Graphique, une part non
          négligeable des enseignements se dirigent vers le Numérique
          Responsable. C&apos;est parfois un enseignement direct de cette
          notion, ou une application de celle-ci.
        </p>
        <ImageOptimize src={numeriqueResponsable} alt="Numérique Responsable" />
        <h2>Le Numérique Responsable au sein des projets</h2>
        <p>
          J&apos;en parle plus dans
          <Link href="/projets/droidsoft-app/#GreenIT">
            la page de mon projet sur l&apos;application pour DroidSoft
          </Link>
          , mais des choix dans la technologie employée ou le design peuvent
          avoir un impact. Dans le cas de ce projet justement, c&apos;est le
          design qui est notable, avec une utilisation d&apos;un mode sombre
          plus écologique.
        </p>
        <h2>Hackathon du Numérique Responsable</h2>
        <p>
          Comme je le disais, cette démarche numérique responsable
          s&apos;inscrit dans la formation. C&apos;est pourquoi dès le début de
          cette 2e année de BUT, nous sommes allées à Lyon, pour suivre les
          journées du Numérique Responsable. Organisées sur le Campus Région du
          Numérique, un hackathon était organisé le second jour. Durant
          celui-ci, nous devions donc créer un projet et le défendre face à un
          jury et aux autres participants.
          <a href="https://ig.iut-clermont.fr/news/les-journees-du-numerique-responsable-2-jours-pour-programmer-vert/">
            Le projet de mon équipe a été retenu comme le plus pertinent
          </a>
          , et a donc conquis le Jury 🏆!
        </p>
      </section>
    </>
  );
}
