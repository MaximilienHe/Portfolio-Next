// /src/app/cv/_sections/xp.tsx
import React from "react";
import ImageOptimize from "@/components/imageOptimization";
import images from "@/data/images";

const {
  smartfluence,
  humanoid,
  droidsoft,
  cafeDuGeek,
  clubic,
  agenceGeek,
} = images;

export default function Xp() {
  return (
    <section className="XP">
      <div className="inner">
        <h1>Expériences</h1>
        <div className="experiences">

          <div className="singleXP">
            <ImageOptimize src={smartfluence} alt="Smartfluence Logo" />
            <div className="contentRight">
              <h2>Ingénieur Informatique</h2>
              <p>Septembre 2023 - Présent</p>
              <h4>Smartfluence - AI Global Influence</h4>
              <ul>
                <li>Scripts Python & API Express.js</li>
                <li>Base de données MySQL/PostgreSQL</li>
                <li>Docker, Docker Compose & déploiement serveur</li>
                <li>Monitoring avec Grafana, Loki & Prometheus</li>
              </ul>
            </div>
          </div>

          <div className="singleXP">
            <ImageOptimize src={humanoid} alt="Humanoid Logo" />
            <div className="contentRight">
              <h2>Rédacteur Tech</h2>
              <p>Septembre 2023 - Présent</p>
              <h4>Frandroid (Humanoid)</h4>
              <ul>
                <li>Articles d&apos;actualité & tests de produits</li>
                <li>Couverture de salons et conférences tech</li>
              </ul>
            </div>
          </div>

          <div className="singleXP">
            <ImageOptimize src={droidsoft} alt="DroidSoft Logo" />
            <div className="contentRight">
              <h2>Rédacteur Tech</h2>
              <p>Août 2020 - Présent</p>
              <h4>DroidSoft</h4>
              <ul>
                <li>Rédaction d&apos;articles, guides et tests</li>
                <li>SEO & intégration HTML/CSS</li>
              </ul>
            </div>
          </div>

          <div className="singleXP">
            <ImageOptimize src={cafeDuGeek} alt="Le Café du Geek Logo" />
            <div className="contentRight">
              <h2>Rédacteur Tech</h2>
              <p>Septembre 2022 - Présent</p>
              <h4>Le Café du Geek</h4>
              <ul>
                <li>Tests produits & actualités</li>
                <li>Rédaction orientée audience tech</li>
              </ul>
            </div>
          </div>

          <div className="singleXP">
            <ImageOptimize src={clubic} alt="Clubic Logo" />
            <div className="contentRight">
              <h2>Rédacteur Tech</h2>
              <p>Février 2023 - Juillet 2024</p>
              <h4>CLUBIC</h4>
              <ul>
                <li>Fiches logiciels & actualités ChatGPT</li>
              </ul>
            </div>
          </div>

          <div className="singleXP">
            <ImageOptimize src={agenceGeek} alt="Agence Geek Media Logo" />
            <div className="contentRight">
              <h2>Développeur Web</h2>
              <p>Avril 2023 - Juin 2023</p>
              <h4>Agence Geek Media</h4>
              <ul>
                <li>Comparateur de produits pour DroidSoft.fr</li>
                <li>Génération automatisée d&apos;articles techniques</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
