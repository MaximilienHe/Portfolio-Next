// /src/app/_sections/xp.tsx
import Link from "next/link";
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
              <h2>Ingenieur logiciel</h2>
              <h4>
                Je me suis lance a fond dans le dev pour mes etudes, et ce, a
                travers differents projets.
              </h4>
              <Link href="/cv" className="button">
                Plus de details sur mon CV
              </Link>
            </div>
          </div>
          <div className="singleXP">
            <div className="contentLeft">
              <h2>Journaliste</h2>
              <h4>
                Cela fait depuis 2020 que je suis journaliste tech a cote de mes etudes
              </h4>
              <Link href="/articles" className="button">
                Lire quelques articles
              </Link>
            </div>
            <ImageOptimize src={redacteur} alt="redacteur illustrating image" />
          </div>
        </div>
      </div>
    </section>
  );
}
