export const cvData = {
  personal: {
    lastName: "HERR",
    firstName: "Maximilien",
    birthDate: new Date("2003-11-22"),
    email: "maximilienherr@gmail.com",
    linkedin: "maximilien-herr",
    linkedinUrl: "https://www.linkedin.com/in/maximilien-herr",
  },

  quote:
    "Développeur et futur ingénieur informatique, je construis des solutions à l'intersection du software, de la data et de l'IA, tout en poursuivant une activité de journalisme tech. Cette double casquette me permet d'allier rigueur technique, vision produit et communication claire.",

  languages: [
    { name: "Anglais", level: "C1" },
    { name: "Allemand", level: "B1" },
  ],

  personality: [
    "Résolution de problèmes et sens du détail",
    "Structuration de solutions techniques complexes",
    "Communication technique claire (écrit/oral)",
    "Vision produit orientée impact business",
  ],

  interests: [
    {
      title: "Salons techs internationaux",
      description:
        "Depuis que je suis rédacteur, je couvre des salons techs à l'international, comme Vivatech à Paris, l'IFA à Berlin, ou encore la Gamescom à Cologne !",
    },
    {
      title: "Judoka à un niveau compétitif",
      description:
        "Sport pratiqué pendant plus de 7 ans, qui m'a permis de développer une confiance personnelle, un esprit de rigueur, et les valeurs de ce sport.",
    },
  ],

  experiences: [
    {
      title: "Ingénieur Big Data & IA",
      date: "Depuis septembre 2023",
      subtitle: "Smartfluence - AI Global Influence",
      bullets: [
        "Conception de l'architecture technique interne orientée data/IA (Django, PostgreSQL, Redis, S3).",
        "Développement d'un outil d'analyse et d'agrégation de données sociales à grande échelle (+2M de chaînes/profils).",
        "Conception de pipelines de collecte, traitement et enrichissement des données, optimisation des performances et mise en production.",
        "Mise en place de la chaîne CI/CD, supervision des services et livraison de sites marketing en délais courts.",
      ],
    },
    {
      title: "Stagiaire Ingénieur Informatique",
      date: "Juin 2025 à août 2025",
      subtitle:
        "Institut Technologique de Maintenance Industrielle (ITMI), Sept-Îles, Québec, Canada",
      bullets: [
        "Stage international de 3 mois en environnement industriel.",
        "Collaboration avec des équipes locales sur des sujets d'ingénierie informatique.",
      ],
    },
    {
      title: "Journaliste Tech Freelance",
      date: "Depuis août 2020",
      subtitle:
        "Frandroid (Humanoid), Le Café du Geek, DroidSoft, ex-Clubic",
      bullets: [
        "Rédaction d'articles d'actualité, de tests et de dossiers tech.",
        "Couverture de salons technologiques internationaux.",
        "SEO, intégration HTML/CSS et vulgarisation de sujets techniques (dont IA générative).",
      ],
    },
    {
      title: "Développeur Web",
      date: "Avril 2023 à juin 2023",
      subtitle:
        "Agence Geek Media - développement d'outils pour le média DroidSoft",
      bullets: [
        "Création d'un site de comparaison de smartphones, tablettes et montres.",
        "Développement de plugins WordPress en PHP et automatisation de contenus.",
        "Réalisation du backend, du frontend, de l'API et de scripts d'alimentation de base de données.",
      ],
    },
  ],

  formations: [
    {
      title: "Diplôme d'ingénieur Informatique",
      date: "Septembre 2023 à août 2026",
      subtitle: "Ecole d'ingénieur de l'ISIMA, Clermont-Ferrand (63)",
    },
    {
      title: "BUT Informatique Graphique",
      date: "Septembre 2021 à juin 2023",
      subtitle:
        "IUT Informatique Graphique de l'UCA, Puy-en-Velay (43)",
    },
    {
      title: "Baccalauréat Scientifique Mention TB",
      date: "Septembre 2018 à juin 2021",
      subtitle:
        "Lycée de Saint-Julien, Brioude (43). Spécialités mathématiques (options mathématiques expertes), physique-chimie, histoire, géographie, géopolitique et science politique.",
    },
  ],

  skills: [
    {
      label: "Langages de programmation",
      value: "Python, TypeScript/JavaScript, C++, C, C#",
    },
    {
      label: "Data & IA",
      value: "Machine Learning, Deep Learning, IA générative, RL (Q-Learning, DQN, PPO, SAC)",
    },
    {
      label: "Web & backend",
      value: "Django, Node.js/Express, Next.js, HTML/CSS, PHP",
    },
    {
      label: "Data stores & DevOps",
      value: "PostgreSQL, MySQL, Redis, MongoDB, Docker, CI/CD, monitoring",
    },
  ],
  skillsExtra:
    "Communication technique, rédaction web, SEO et anglais professionnel",
  skillsFooter: "Références et projets détaillés disponibles sur demande.",
};

export function computeAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
