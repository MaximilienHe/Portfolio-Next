// /src/app/_sections/skills.tsx
import Link from "next/link";

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
      "Docker",
      "CI/CD",
      "S3",
      "Sequelize",
      "Nginx",
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
    tags: ["Unity", "Unreal Engine", "3ds Max", "Substance Painter", "Blender"],
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
];

export default function Skills() {
  return (
    <section className="skills" aria-labelledby="skills-title">
      <div className="skills__inner">
        <span className="section-label">05 · L&apos;atelier</span>
        <h2 id="skills-title">Outils, langages, terrains.</h2>

        {rows.map((row) => (
          <div key={row.cat} className="skills-row">
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

        <Link href="/cv" className="button">
          Découvrir toutes les technos et langages
        </Link>
      </div>
    </section>
  );
}
