// /src/app/_sections/articles.tsx
import ImageOptimize from "@/components/imageOptimization";
import articles from "@/data/articles";
import images from "@/data/images";
import logos from "@/data/logos";

const {
  S22ultraTest,
  MotorolaRazrTest,
  GalaxyUnpacked,
  asusZenbookFoldTest,
  ifa_qualcomm,
  priseEnMainThinkpadFold,
  etudiantInformatiqueGraphiquePuyEnVelayCasqueRealiteVirtuelle,
  Intro,
} = articles;

const { iutIG } = images;

const { droidSoft, icdg } = logos;

export default function Articles() {
  return (
    <section className="articles" id="articles">
      <div className="container">
        <h1>Une sélection de mes articles</h1>
        <div className="media">
          <ImageOptimize
            src={droidSoft}
            alt="DroidSoft logo"
            className="logo"
          />
          <h2 style={{ marginBottom: 0 }}>DroidSoft</h2>
        </div>
        <div className="multiArticles">
          <a
            href="https://droidsoft.fr/2022/10/14/test-samsung-galaxy-s22-ultra-la-masterclass-de-lannee/"
            target="_blank"
            rel="noopener"
            className="singleArticle"
          >
            <div className="article">
              <ImageOptimize
                src={S22ultraTest}
                alt="Samsung S22 Ultra article image"
              />
              <div className="articleDetail">
                <h3>
                  TEST - Samsung Galaxy S22 Ultra : la masterclass de l’année
                </h3>
              </div>
            </div>
          </a>
          <a
            href="https://droidsoft.fr/2023/02/11/test-motorola-razr-2022-la-modernite-prend-le-pas-sur-la-nostalgie/"
            target="_blank"
            rel="noopener"
            className="singleArticle"
          >
            <div className="article">
              <ImageOptimize src={MotorolaRazrTest} alt="Motorola_razr_test" />
              <div className="articleDetail">
                <h3>
                  TEST – Motorola Razr 2022, la modernité prend le pas sur la
                  nostalgie
                </h3>
              </div>
            </div>
          </a>
          <a
            href="https://droidsoft.fr/2023/02/01/samsung-unpacked-2023-quavez-vous-rate-de-la-grande-messe-de-samsung/"
            target="_blank"
            rel="noopener"
            className="singleArticle"
          >
            <div className="article">
              <ImageOptimize src={GalaxyUnpacked} alt="Galaxy_Unpacked image" />
              <div className="articleDetail">
                <h3>
                  Samsung Unpacked 2023, qu’avez-vous raté de la grande messe de
                  Samsung ?
                </h3>
              </div>
            </div>
          </a>
        </div>
        <div className="media">
          <ImageOptimize src={icdg} alt="LeCaféDuGeek logo" className="logo" />
          <h2 style={{ marginBottom: 0 }}>Le Café Du Geek</h2>
        </div>
        <div className="multiArticles">
          <a
            href="https://lecafedugeek.fr/test-asus-zenbook-fold/"
            target="_blank"
            rel="noopener"
            className="singleArticle"
          >
            <div className="article">
              <ImageOptimize
                src={asusZenbookFoldTest}
                alt="asus_zenbook_fold_test article image"
              />
              <div className="articleDetail">
                <h3>
                  Test – Asus Zenbook Fold : les PC pliants ont de l’avenir !
                </h3>
              </div>
            </div>
          </a>
          <a
            href="https://lecafedugeek.fr/ifa-2022-qualcomm-a-une-nouvelle-strategie-pour-concurrencer-apple/"
            target="_blank"
            rel="noopener"
            className="singleArticle"
          >
            <div className="article">
              <ImageOptimize
                src={ifa_qualcomm}
                alt="ifa_qualcomm article image"
              />
              <div className="articleDetail">
                <h3>
                  IFA 2022 : Qualcomm a une nouvelle stratégie pour concurrencer
                  Apple
                </h3>
              </div>
            </div>
          </a>
          <a
            href="https://lecafedugeek.fr/lenovo-thinkpad-x1-fold-2022-le-pc-pliant-prend-ses-marques-mais-pas-le-pli/"
            target="_blank"
            rel="noopener"
            className="singleArticle"
          >
            <div className="article">
              <ImageOptimize
                src={priseEnMainThinkpadFold}
                alt="prise-en-main_thinkpad-fold image"
              />
              <div className="articleDetail">
                <h3>
                  Prise en main du Lenovo Thinkpad X1 Fold (2022), le PC pliant
                  prend ses marques
                </h3>
              </div>
            </div>
          </a>
        </div>
        <div className="media">
          <ImageOptimize
            src={iutIG}
            alt="IUT Informatique Graphique logo"
            className="logo"
          />
          <h2>IUT Informatique Graphique Le Puy-en-Velay</h2>
        </div>
        <div className="multiArticles two-column">
          <a
            href="https://ig.iut-clermont.fr/news/un-lieu-pour-liberer-le-potentiel-creatif-de-nos-futurs-informaticiens/"
            target="_blank"
            rel="noopener"
            className="singleArticle"
          >
            <div className="article">
              <ImageOptimize
                src={
                  etudiantInformatiqueGraphiquePuyEnVelayCasqueRealiteVirtuelle
                }
                alt="Salle créativité article"
              />
              <div className="articleDetail">
                <h3>
                  Un lieu pour libérer le potentiel créatif de nos futurs
                  informaticiens
                </h3>
              </div>
            </div>
          </a>
          <a
            href="https://ig.iut-clermont.fr/news/les-journees-du-numerique-responsable-2-jours-pour-programmer-vert/"
            target="_blank"
            rel="noopener"
            className="singleArticle"
          >
            <div className="article">
              <ImageOptimize src={Intro} alt="Article Numérique" />
              <div className="articleDetail">
                <h3>
                  Les journées du Numérique Responsable, deux jours pour
                  programmer vert
                </h3>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
