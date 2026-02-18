// src/app/recherche/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recherche",
  description:
    "Recherchez parmi les projets, articles de blog et pages du portfolio de Maximilien Herr.",
  alternates: { canonical: "https://maximilienherr.fr/recherche" },
  robots: { index: false, follow: true }, // on n'indexe pas la page de résultats vide
};

export default function RechercheLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
