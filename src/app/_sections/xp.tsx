import Link from "next/link";
import Image from "next/image";

import images from "@/data/images";
const { developpeur, redacteur } = images;

export default function Xp() {
  return (
    <section className="XP">
      <div className="container">
        <div className="experiences">
          <div className="singleXP">
            <Image
              src={developpeur.image}
              width={developpeur.width}
              height={developpeur.height}
              alt="Illustration ingénieur logiciel"
            />
            <div className="contentRight">
              <h2>Ingénieur logiciel</h2>
              <p>
                Je me suis lancé à fond dans le dev pour mes études, et ce,
                à travers différents projets.
              </p>
              <Link href="/cv" className="button">
                Plus de détails sur mon CV
              </Link>
            </div>
          </div>
          <div className="singleXP">
            <div className="contentLeft">
              <h2>Journaliste</h2>
              <p>
                Cela fait depuis 2020 que je suis journaliste tech à côté de mes
                études.
              </p>
              <Link href="/articles" className="button">
                Lire quelques articles
              </Link>
            </div>
            <Image
              src={redacteur.image}
              width={redacteur.width}
              height={redacteur.height}
              alt="Illustration journaliste tech"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
