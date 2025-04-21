// /src/app/cv/_sections/formations.tsx
import ImageOptimize from "@/components/imageOptimization";
import images from "@/data/images";

const { isima, iutIG, saintJulien } = images;

export default function Formations() {
  return (
    <section className="formation">
      <div className="inner">
        <h1>Formation</h1>

        <div className="singleXP">
          <ImageOptimize src={isima} alt="ISIMA Logo" />
          <div className="contentFormation">
            <h2>Diplôme d'ingénieur Informatique</h2>
            <p>Septembre 2023 - Août 2026</p>
            <h4>ISIMA - Clermont Auvergne INP</h4>
            <ul>
              <li>👨‍💻 Conception et implémentation de systèmes complexes en C++ et Python</li>
              <li>🌐 Développement Full Stack avec React, Node.js et gestion PostgreSQL</li>
              <li>🎮 Interfaces interactives pour applications web et mobiles</li>
              <li>📱 Création et déploiement d'applications Android</li>
              <li>🗣️ Anglais technique et professionnel, économie, droit et gestion de projet</li>
            </ul>
          </div>
        </div>

        <div className="singleXP">
          <ImageOptimize src={iutIG} alt="IUT Informatique Graphique Logo" />
          <div className="contentFormation">
            <h2>BUT Informatique Graphique</h2>
            <p>Septembre 2021 - Juin 2023</p>
            <h4>IUT du Puy-en-Velay, Université Clermont-Auvergne</h4>
            <ul>
              <li>👨‍💻 Développement de logiciels en C++ et Qt</li>
              <li>📱 Applications Android</li>
              <li>🌐 Web Full Stack : HTML/CSS, JavaScript, PHP & MySQL</li>
              <li>🖥️ 3D : 3Ds Max, Substance Painter, Zephyr & After Effects</li>
              <li>🎮 Jeux-vidéo : Unity (2D/3D) & Unreal Engine</li>
            </ul>
          </div>
        </div>

        <div className="singleXP">
          <ImageOptimize src={saintJulien} alt="Lycée Saint-Julien Logo" />
          <div className="contentFormation">
            <h2>Baccalauréat Scientifique</h2>
            <p>Septembre 2018 - Juin 2021</p>
            <h4>Lycée Saint-Julien, Brioude</h4>
            <ul>
              <li>Spécialités Mathématiques & Physique-Chimie, option Maths Expertes</li>
              <li>Première : Histoire, Géographie, Géopolitique & Sciences Politiques</li>
              <li>Mention Très Bien & délégué de classe</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
