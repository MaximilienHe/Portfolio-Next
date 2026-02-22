import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Recherche",
  description:
    "Recherchez parmi les projets, articles de blog et pages du portfolio de Maximilien Herr.",
  alternates: { canonical: getCanonicalUrl("/recherche") },
  robots: { index: false, follow: true },
};

export default function RechercheLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
