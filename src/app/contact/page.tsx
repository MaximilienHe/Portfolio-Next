// /src/app/contact/page.tsx
import type { Metadata } from "next";
import "./style.css";

import images from "@/data/images";
import ImageOptimize from "@/components/imageOptimization";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

const { photoProfilMaximilien, linkedin, github } = images;
export const metadata: Metadata = {
  title: "Maximilien Herr - Contact",
};

export default function Contact() {
  const breadcrumbItems = [
    { name: "Accueil", url: "https://maximilienherr.fr" },
    { name: "Contact", url: "https://maximilienherr.fr/contact" },
  ];
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <section className="contact">
        <div className="photoProfil">
          <ImageOptimize src={photoProfilMaximilien} alt="photo de profil" />
        </div>

        <div className="contactContent">
          <h2>Me contacter</h2>
          <p>
            Que ce soit pour un projet de développement web, une collaboration en
            rédaction tech, ou pour échanger, n’hésitez pas à me joindre !
          </p>

          <div className="contactCard">
            <p>
              Vous pouvez m’écrire par mail, via LinkedIn ou GitHub. Mon numéro de
              téléphone est disponible sur demande.
            </p>
            <div className="contactLogos">
              <a
                href="https://linkedin.com/in/maximilien-herr"
                target="_blank"
                rel="noopener"
              >
                <ImageOptimize
                  src={linkedin}
                  alt="linkedin logo"
                  className="logo"
                />
              </a>
              <a
                href="https://github.com/MaximilienHe"
                target="_blank"
                rel="noopener"
              >
                <ImageOptimize
                  src={github}
                  alt="github logo"
                  className="logo"
                />
              </a>
              <p>
                <a href="mailto:maximilienherr@gmail.com">
                  maximilienherr@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* — Bloc d’infos supplémentaires — */}
          <div className="contactExtra">
            <h3>Localisation</h3>
            <p>Clermont-Ferrand, France</p>

            <h3>Réseaux</h3>
            <ul>
              <li>
                Twitter :{" "}
                <a href="https://twitter.com/Maximilien_Herr" target="_blank" rel="noopener">
                  @Maximilien_Herr
                </a>
              </li>
              <li>
                LinkedIn :{" "}
                <a href="https://linkedin.com/in/maximilien-herr" target="_blank" rel="noopener">
                  maximilienherr
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
);
}
