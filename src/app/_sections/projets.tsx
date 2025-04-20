// /src/app/_sections/projets.tsx
import ImageOptimize from "@/components/imageOptimization";
import images from "@/data/images";
const { droidsoftAppHorizontal, asciiArtIllustration, comparaisonAlgo } =
  images;
export default function projets() {
  return (
    <div className="container">
      <h1>Projets</h1>
      <section className="projets">
        <div className="cards">
          <div className="card">
            <ImageOptimize
              src={droidsoftAppHorizontal}
              alt="DroidSoft App poster"
            />
            <div className="cardDetail">
              <h3>DroidSoft App</h3>
              <p>
                Une application Android pour le média DroidSoft, permettant la
                consultation des articles du site.
              </p>
              <a href="./projets/droidsoft-app/" className="button">
                Voir le projet
              </a>
            </div>
          </div>
          <div className="card">
            <ImageOptimize src={asciiArtIllustration} alt="ASCII Art poster" />
            <div className="cardDetail">
              <h3>PGM to ASCII Art</h3>
              <p>
                Logiciel permettant de convertir des images en PGM en caractères
                de la table ASCII.
              </p>
              <a href="./projets/ascii-art/" className="button">
                Voir le projet
              </a>
            </div>
          </div>
          <div className="card">
            <ImageOptimize src={comparaisonAlgo} alt="comparaison_algo poster" />
            <div className="cardDetail">
              <h3>Comparaison Algorithmique</h3>
              <p>
                Programme regroupant plusieurs algorithmes de tris, avec export de
                ces données pour un traitement ultérieur.
              </p>
              <a href="./projets/comparaison-algorithmique/" className="button">
                Voir le projet
              </a>
            </div>
          </div>
        </div>
        <a href="./projets" className="button" style={{ marginTop: "5vh" }}>
          Voir tous les projets
        </a>
      </section>
    </div>
  );
}
