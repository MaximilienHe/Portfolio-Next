import React from "react";
import ImageOptimize from "@/components/imageOptimization";
import images from "@/data/images";
const { redacteur, verveine, techos } = images;

export default function Xp() {
  return (
    <section className="XP">
      <h1>Expériences</h1>
      <div className="experiences">
        <div className="singleXP">
          <ImageOptimize src={redacteur} alt="developpeur illustrating image" />
          <div className="contentRight">
            <h2>Rédacteur Tech</h2>
            <p>DEPUIS AOÛT 2020</p>
            <h4>Bénévolat pour DroidSoft.fr et LeCaféDuGeek.fr</h4>
            <ul>
              <li>Compétences éditoriales et prises de photos</li>
              <li>Communication écrite et verbale</li>
              <li>SEO et Web (HTML, CSS et WordPress)</li>
            </ul>
          </div>
        </div>
        <div className="singleXP">
          <div className="contentLeft">
            <h2>Conseiller Ventes</h2>
            <p>JUILLET ET AOÛT 2022</p>
            <h4>CDD au sein de l&apos;espace Pagès du Puy-en-Velay</h4>
            <ul>
              <li>Ateliers cocktails pour les clients</li>
              <li>Présentation des produits</li>
              <li>Valorisation du terroir du Velay</li>
            </ul>
          </div>
          <ImageOptimize src={verveine} alt="redacteur illustrating image" />
        </div>
        <div className="singleXP">
          <ImageOptimize
            src={techos}
            alt="technicien informatique illustrating image"
          />
          <div className="contentRight">
            <h2>Technicien Informatique</h2>
            <p>JUILLET 2019</p>
            <h4>Stage d&apos;orientation chez Brioude Informatique</h4>
            <ul>
              <li>Maintenance d&apos;ordinateurs</li>
              <li>Désassemblage d&apos;ordinateurs portables</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
