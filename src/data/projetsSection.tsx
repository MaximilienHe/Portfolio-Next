// /src/data/projects.ts
import images from "./images";

export interface Project {
  id: number;
  title: string;
  description: string;
  href: string;
  imageKey: keyof typeof images;
  alt: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "DroidSoft App",
    description: "Une application Android pour le média DroidSoft, permettant la consultation des articles du site.",
    href: "/projets/droidsoft-app/",
    imageKey: "droidsoftAppHorizontal",
    alt: "DroidSoft App poster",
  },
  {
    id: 2,
    title: "PGM to ASCII Art",
    description: "Logiciel permettant de convertir des images en PGM en caractères de la table ASCII.",
    href: "/projets/ascii-art/",
    imageKey: "asciiArtIllustration",
    alt: "ASCII Art illustration",
  },
  {
    id: 3,
    title: "Comparaison Algorithmique",
    description: "Programme regroupant plusieurs algorithmes de tris, avec export de ces données pour un traitement ultérieur.",
    href: "/projets/comparaison-algorithmique/",
    imageKey: "comparaisonAlgo",
    alt: "Comparaison algorithmique poster",
  },
];

export default projects;
