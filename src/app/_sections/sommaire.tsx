// /src/app/_sections/sommaire.tsx

const items = [
  {
    num: "01",
    title: "Le code",
    desc: "Plusieurs années à concevoir des architectures, des APIs, des interfaces propres.",
  },
  {
    num: "02",
    title: "La plume",
    desc: "Cinq ans de journalisme tech à Frandroid, Droidsoft, Le Café du Geek et Clubic.",
  },
  {
    num: "03",
    title: "Les chantiers",
    desc: "Projets d'études, expérimentations, livrables, pas-à-pas.",
  },
  {
    num: "04",
    title: "Les rubriques",
    desc: "Compétences, parcours, prises de parole, numérique responsable.",
  },
];

export default function Sommaire() {
  return (
    <section className="sommaire" aria-labelledby="sommaire-title">
      <h2 id="sommaire-title">Au sommaire de cette édition</h2>
      <div className="sommaire-grid">
        {items.map((item) => (
          <article key={item.num} className="sommaire-item">
            <span className="num">{item.num}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
