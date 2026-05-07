// /src/app/cv/_sections/skills.tsx

const rows: { cat: string; tags: string[] }[] = [
  {
    cat: "Web & Backend",
    tags: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "Django",
      "FastAPI",
      "Vue.js",
      "PHP",
      "WordPress",
      "HTML / CSS",
    ],
  },
  {
    cat: "Bases de données & Infra",
    tags: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "MongoDB",
      "S3",
      "Sequelize",
      "Docker",
      "Nginx",
      "CI/CD",
      "Monitoring",
    ],
  },
  {
    cat: "Logiciel",
    tags: ["C", "C++", "C#", "Python", "Java", "Kotlin", "Rust"],
  },
  {
    cat: "Data & IA",
    tags: [
      "Machine Learning",
      "Deep Learning",
      "PyTorch",
      "CUDA",
      "IA générative",
      "Reinforcement Learning",
      "Q-Learning",
      "DQN",
      "PPO",
      "SAC",
    ],
  },
  {
    cat: "Mobile & IoT",
    tags: ["Android", "Kotlin", "Flutter / Dart", "ESP32", "Firebase"],
  },
  {
    cat: "3D & Jeu vidéo",
    tags: ["Unity", "Unreal Engine", "3ds Max", "Substance Painter", "3DF Zephyr"],
  },
  {
    cat: "Plume",
    tags: [
      "Tests produits",
      "News",
      "Dossiers",
      "Guides d’achat",
      "Salons tech",
      "Lancements produits",
      "Interviews",
      "Longs formats",
      "SEO éditorial",
    ],
  },
  {
    cat: "Outils & DX",
    tags: ["Git", "GitHub", "Visual Studio", "VS Code", "Android Studio", "Excel", "Notion"],
  },
];

export default function Skills() {
  return (
    <>
      <section className="skills cv-skills">
        <div className="inner">
          <h2 className="cv-section-title">Logiciels et technologies utilisées</h2>

          {rows.map((row) => (
            <div key={row.cat} className="cv-skills-row">
              <p className="cat">{row.cat}</p>
              <div className="tags">
                {row.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <h2 className="cv-section-title cv-interest-title">
        Centres d&apos;intérêt
      </h2>
    </>
  );
}
