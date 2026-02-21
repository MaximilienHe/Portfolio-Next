// /src/app/cv/_sections/xp.tsx
import React from "react";
import Image from "next/image";
import images from "@/data/images";

const {
  smartfluence,
  itmi,
  humanoid,
  cafeDuGeek,
  droidsoft,
  clubic,
  agenceGeek,
} = images;

const xpImageProps = {
  sizes: "(max-width: 767px) 100vw, 50vw",
  loading: "lazy" as const,
  decoding: "async" as const,
};

export default function Xp() {
  return (
    <section className="XP">
      <div className="inner">
        <h1>Expériences</h1>
        <div className="experiences">

          <div className="singleXP">
            <Image
              src={smartfluence.image}
              width={smartfluence.width}
              height={smartfluence.height}
              {...xpImageProps}
              alt="Logo Smartfluence, experience de Maximilien Herr en Big Data et IA"
            />
            <div className="contentRight">
              <h2>Ingénieur Big Data & IA</h2>
              <p>Septembre 2023 - Présent</p>
              <h4>Smartfluence - AI Global Influence</h4>
              <ul>
                <li>
                  Conception de l&apos;architecture technique interne avec un focus
                  data, IA et scalabilité.
                </li>
                <li>
                  Stack principale : Django, PostgreSQL, Redis, S3 et pipelines
                  de collecte/traitement de données.
                </li>
                <li>
                  Développement d&apos;un outil d&apos;analyse/agrégation de données
                  sociales sur plus de 2 millions de chaînes et profils.
                </li>
                <li>
                  Mise en place d&apos;une chaîne CI/CD fiable avec supervision et
                  monitoring des services.
                </li>
                <li>
                  Développement de sites de présentation marketing livrés en
                  délai très court selon les besoins business.
                </li>
              </ul>
            </div>
          </div>

          <div className="singleXP">
            <Image
              src={humanoid.image}
              width={humanoid.width}
              height={humanoid.height}
              {...xpImageProps}
              alt="Logo Humanoid et Frandroid, experience de pigiste tech de Maximilien Herr"
            />
            <div className="contentRight">
              <h2>Pigiste tech</h2>
              <p>Septembre 2023 - Présent</p>
              <h4>Frandroid (Humanoid)</h4>
              <ul>
                <li>Articles d&apos;actualité & tests de produits</li>
                <li>Couverture de salons et conférences tech</li>
              </ul>
            </div>
          </div>

          <div className="singleXP">
            <Image
              src={cafeDuGeek.image}
              width={cafeDuGeek.width}
              height={cafeDuGeek.height}
              {...xpImageProps}
              alt="Logo Le Cafe du Geek, media de redaction de Maximilien Herr"
            />
            <div className="contentRight">
              <h2>Journaliste tech</h2>
              <p>Septembre 2022 - Présent</p>
              <h4>Le Café du Geek</h4>
              <ul>
                <li>Tests produits & actualités</li>
                <li>Rédaction orientée audience tech</li>
              </ul>
            </div>
          </div>

          <div className="singleXP">
            <Image
              src={droidsoft.image}
              width={droidsoft.width}
              height={droidsoft.height}
              {...xpImageProps}
              alt="Logo DroidSoft, media tech ou publie Maximilien Herr"
            />
            <div className="contentRight">
              <h2>Journaliste tech</h2>
              <p>Août 2020 - Présent</p>
              <h4>DroidSoft</h4>
              <ul>
                <li>Rédaction d&apos;articles, guides et tests</li>
                <li>SEO & intégration HTML/CSS</li>
              </ul>
            </div>
          </div>

          <div className="singleXP">
            <Image
              src={itmi.image}
              width={itmi.width}
              height={itmi.height}
              {...xpImageProps}
              alt="Logo ITMI, stage ingenieur informatique de Maximilien Herr au Quebec"
            />
            <div className="contentRight">
              <h2>Stagiaire Ingénieur Informatique</h2>
              <p>Juin 2025 - Août 2025</p>
              <h4>
                Institut Technologique de Maintenance Industrielle (ITMI),
                Sept-Îles, Québec, Canada
              </h4>
              <ul>
                <li>Stage ingénieur informatique de 3 mois en environnement industriel.</li>
                <li>
                  Expérience internationale en collaboration avec des équipes
                  locales sur site.
                </li>
              </ul>
            </div>
          </div>

          <div className="singleXP">
            <Image
              src={clubic.image}
              width={clubic.width}
              height={clubic.height}
              {...xpImageProps}
              alt="Logo Clubic, experience de redacteur tech de Maximilien Herr"
            />
            <div className="contentRight">
              <h2>Rédacteur Tech</h2>
              <p>Février 2023 - Juillet 2024</p>
              <h4>CLUBIC</h4>
              <ul>
                <li>Fiches logiciels : prises en main, comparatifs et guides d&apos;utilisation.</li>
                <li>Actualités IA émergentes (arrivée de ChatGPT, Code Interpreter et premiers usages).</li>
              </ul>
            </div>
          </div>

          <div className="singleXP">
            <Image
              src={agenceGeek.image}
              width={agenceGeek.width}
              height={agenceGeek.height}
              {...xpImageProps}
              alt="Logo Agence Geek Media, mission developpeur web de Maximilien Herr"
            />
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
