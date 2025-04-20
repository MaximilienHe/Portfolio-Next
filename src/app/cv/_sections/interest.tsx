import ImageOptimize from "@/components/imageOptimization";
import images from "@/data/images";

const { writer, plane, smartphone } = images;

export default function Interest() {
  return (
    <section className="interest">
      <div className="interestCard">
        <div className="title">
          <ImageOptimize src={writer} alt="writer icon" />
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
          <ImageOptimize src={plane} alt="plane icon" />
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
          <ImageOptimize src={smartphone} alt="téléphone icon" />
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
    </section>
  );
}
