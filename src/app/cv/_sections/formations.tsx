import ImageOptimize from "@/components/imageOptimization";
import images from "@/data/images";

const { iutIG, saintJulien } = images;

export default function Formations() {
  return (
    <section className="formation">
      <h1>Formation</h1>
      <div className="singleXP">
        <ImageOptimize src={iutIG} alt="IUT Informatique Graphique Logo" />
        <div className="contentFormation">
          <h2>BUT Informatique Graphique</h2>
          <p>2021 - 2024</p>
          <h4>IUT du Puy-en-Velay, Université Clermont-Auvergne</h4>
          <ul>
            <li>👨‍💻 Développement de logiciels en C++ moderne et QT</li>
            <li>📱 Développement d&apos;applications Android</li>
            <li>
              🌐 Développement Web (FullStack) en HTML/CSS, Javascript et PHP
              (Frameworks ou non) et gestion / conception de base de données en
              MySQL
            </li>
            <li>
              🖥️ Modélisation 3D avec 3Ds Max, Substance, Zephyr et After
              Effects
            </li>
            <li>
              🎮 Conception de jeux-vidéos avec Unity2D, 3D et Unreal Engine
            </li>
          </ul>
        </div>
      </div>
      <div className="singleXP">
        <div className="contentFormation">
          <h2>Baccalauréat Maths, Physique et Maths Expertes</h2>
          <p>2018 - 2021</p>
          <h4>Lycée Saint-Julien, Brioude</h4>
          <ul>
            <li>
              📚 Tle : Spécialité Mathématiques et Physique-Chimie + Option
              Mathématiques Expertes
            </li>
            <li>
              📚 1ère : Spécialité Histoire, Géographique, Géopolitique et
              Sciences Politiques
            </li>
            <li>🧑‍🎓 Mention Très Bien</li>
          </ul>
        </div>
        <ImageOptimize src={saintJulien} alt="Lycée Jean Monnet Logo" />
      </div>
    </section>
  );
}
