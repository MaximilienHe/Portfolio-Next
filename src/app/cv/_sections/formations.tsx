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
            <h2>Diplôme d&apos;ingénieur Informatique</h2>
            <p>Septembre 2023 - Août 2026</p>
            <h4>ISIMA - Clermont Auvergne INP</h4>
            <ul>
              <li>
                🧠 Développement d&apos;une approche ingénieur centrée sur l&apos;analyse
                de problèmes, la structuration de solutions et le travail en mode
                projet. Renforcement des compétences transversales : communication
                technique, restitution claire, travail en équipe et anglais pro.
              </li>
              <li>
                🐍 Utilisation avancée de Python pour l&apos;algorithmique et l&apos;analyse
                de données, avec une attention portée à la qualité du code, aux
                performances et à la maintenabilité. Bases solides en conception
                logicielle et modélisation.
              </li>
              <li>
                🤖 Formation approfondie en intelligence artificielle, machine learning
                et deep learning, avec mise en pratique sur des cas concrets
                (réseaux de neurones, modèles profonds, modèles génératifs). IA
                par renforcement (Q-Learning, DQN, PPO, SAC), incluant la conception
                d&apos;agents et l&apos;expérimentation sur des environnements complexes.
              </li>
              <li>
                🏗️ Vision globale des systèmes numériques modernes, intégrant
                architecture logicielle, optimisation et enjeux de transformation
                numérique, en lien direct avec des problématiques industrielles.
              </li>
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
