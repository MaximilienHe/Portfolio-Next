// /src/app/cv/_sections/interest.tsx
import images from "@/data/images";
import Image from "next/image";

const { writer, plane, smartphone } = images;

export default function Interest() {
  return (
    <section className="interest">
      <div className="inner">
        <div className="interestCard">
          <div className="title">
            <Image
              src={writer.image}
              width={writer.width}
              height={writer.height}
              alt="Icone ecriture, centre d'interet de Maximilien Herr pour la redaction tech"
            />
            <h5>Écrire et rédiger</h5>
          </div>
          <p>
            J&lsquo;ai un goût prononcé pour les mots, ce qui explique cet attrait
            pour la rédaction.
          </p>
          <p>
            Par ailleurs, la rédaction démontre mon souci du détail, et le fait
            que j&lsquo;aime prendre de l&lsquo;avance dans mes projets, notamment
            dans les articles.
          </p>
        </div>
        <div className="interestCard">
          <div className="title">
            <Image
              src={plane.image}
              width={plane.width}
              height={plane.height}
              alt="Icone conference tech, veille technologique de Maximilien Herr"
            />
            <h5>Conférences tech</h5>
          </div>
          <p>
            Qu&lsquo;elles soient en ligne ou en présentiel, j&lsquo;apprécie
            grandement assister à des conférences d&lsquo;annonces dans le domaine
            des nouvelles technologies.
          </p>
          <p>
            Parcourir les salons tech, c&lsquo;est aussi l&lsquo;occasion pour moi
            de faire d&lsquo;incroyables rencontres.
          </p>
        </div>
        <div className="interestCard">
          <div className="title">
            <Image
              src={smartphone.image}
              width={smartphone.width}
              height={smartphone.height}
              alt="Icone smartphone, passion high-tech de Maximilien Herr"
            />
            <h5>High Tech</h5>
          </div>
          <p>
            Mon activité de rédacteur tech m&lsquo;amène à m&lsquo;intéresser au
            monde en constante évolution des nouvelles technologies. C&lsquo;est à
            la fois de l&lsquo;émerveillement et de la curiosité, alors je me pose
            plein de questions sur pourquoi et comment ces technologies sont
            fabriquées !
          </p>
        </div>
      </div>
    </section>
  );
}
