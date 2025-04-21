// /src/data/articleSections.ts
import type { Article } from "@/data/articles";  // optionnel : pour typer imageKey
export interface SectionConfig {
  sourceName: string;
  logoKey: keyof typeof import("./logos").default;
  articles: Array<{
    id: number;
    title: string;
    href: string;
    imageKey: keyof typeof import("./articles").default;
    alt: string;
  }>;
}

const articleSections: SectionConfig[] = [
    {
    sourceName: "DroidSoft",
    logoKey: "droidSoft",
    articles: [
      {
        id: 1,
        title: "TEST - Samsung Galaxy S22 Ultra : la masterclass de l’année",
        href: "https://droidsoft.fr/2022/10/14/test-samsung-galaxy-s22-ultra-la-masterclass-de-lannee/",
        imageKey: "S22ultraTest",
        alt: "Samsung S22 Ultra article image",
      },
      {
        id: 2,
        title: "TEST – Motorola Razr 2022, la modernité prend le pas sur la nostalgie",
        href: "https://droidsoft.fr/2023/02/11/test-motorola-razr-2022-la-modernite-prend-le-pas-sur-la-nostalgie/",
        imageKey: "MotorolaRazrTest",
        alt: "Motorola Razr 2022 article image",
      },
      {
        id: 3,
        title: "Samsung Unpacked 2023, qu’avez-vous raté de la grande messe de Samsung ?",
        href: "https://droidsoft.fr/2023/02/01/samsung-unpacked-2023-quavez-vous-rate-de-la-grande-messe-de-samsung/",
        imageKey: "GalaxyUnpacked",
        alt: "Galaxy Unpacked 2023",
      },
    ],
  },
  {
    sourceName: "Le Café Du Geek",
    logoKey: "icdg",
    articles: [
      {
        id: 4,
        title: "Test – Asus Zenbook Fold : les PC pliants ont de l’avenir !",
        href: "https://lecafedugeek.fr/test-asus-zenbook-fold/",
        imageKey: "asusZenbookFoldTest",
        alt: "Asus Zenbook Fold article image",
      },
      {
        id: 5,
        title: "IFA 2022 : Qualcomm a une nouvelle stratégie pour concurrencer Apple",
        href: "https://lecafedugeek.fr/ifa-2022-qualcomm-a-une-nouvelle-strategie-pour-concurrencer-apple/",
        imageKey: "ifa_qualcomm",
        alt: "IFA Qualcomm 2022",
      },
      {
        id: 6,
        title: "Prise en main du Lenovo Thinkpad X1 Fold (2022), le PC pliant prend ses marques",
        href: "https://lecafedugeek.fr/lenovo-thinkpad-x1-fold-2022-le-pc-pliant-prend-ses-marques-mais-pas-le-pli/",
        imageKey: "priseEnMainThinkpadFold",
        alt: "Thinkpad X1 Fold",
      },
    ],
  },
  {
    sourceName: "IUT Informatique Graphique Le Puy-en-Velay",
    logoKey: "iutIG",
    articles: [
      {
        id: 7,
        title: "Un lieu pour libérer le potentiel créatif de nos futurs informaticiens",
        href: "https://ig.iut-clermont.fr/news/un-lieu-pour-liberer-le-potentiel-creatif-de-nos-futurs-informaticiens/",
        imageKey: "etudiantInformatiqueGraphiquePuyEnVelayCasqueRealiteVirtuelle",
        alt: "Salle créativité IUT",
      },
      {
        id: 8,
        title: "Les journées du Numérique Responsable, deux jours pour programmer vert",
        href: "https://ig.iut-clermont.fr/news/les-journees-du-numerique-responsable-2-jours-pour-programmer-vert/",
        imageKey: "Intro",
        alt: "Numérique Responsable",
      },
      {
        id: 9,
        title: "Le média DroidSoft.fr se dote d’une nouvelle application mobile grâce au travail de nos étudiants",
        href: "https://ig.iut-clermont.fr/news/le-media-droidsoft-fr-se-dote-dune-nouvelle-application-mobile-grace-au-travail-de-nos-etudiants/",
        imageKey: "appDroidsoft",
        alt: "IUT Informatique Graphique",
      }
    ],
  },
];

export default articleSections;
