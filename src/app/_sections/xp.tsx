// /src/app/_sections/xp.tsx
import ImageOptimize from "@/components/imageOptimization";

import images from "@/data/images";
const { developpeur, redacteur } = images;

export default function Xp() {
  return (
    <section className="XP">
      <div className="container">
        <div className="experiences">
          <div className="singleXP">
            <ImageOptimize
              src={developpeur}
              alt="developpeur illustrating image"
            />
            <div className="contentRight">
              <h2>Ingénieur logiciel</h2>
              <h4>
                Je me suis lancé à fond dans le dév pour mes études, et ce, à
                travers différents projets.
              </h4>
              <a href="./cv" className="button">
                Plus de détails sur mon CV
              </a>
            </div>
          </div>
          <div className="singleXP">
            <div className="contentLeft">
              <h2>Rédacteur</h2>
              <h4>
                Cela fait depuis 2020 que je suis rédacteur tech à côté de mes
                études
              </h4>
              <a href="articles" className="button">
                Lire quelques articles
              </a>
            </div>
            <ImageOptimize src={redacteur} alt="redacteur illustrating image" />
          </div>
        </div>
      </div>
    </section>
  );
}
