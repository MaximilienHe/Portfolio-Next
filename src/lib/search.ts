// src/lib/search.ts
// Moteur de recherche full-front, fuzzy, sans dépendance externe

export type SearchEntry = {
  title: string;
  description: string;
  url: string;
  type: "projet" | "blog" | "page" | "article";
  tags?: string[];
  date?: string;
};

export type SearchResult = SearchEntry & {
  score: number;
  /** Fragments de titre avec <mark> pour le highlight */
  highlightedTitle: string;
  highlightedDescription: string;
};

/**
 * Normalise un texte pour la recherche :
 * minuscules, sans accents, sans caractères spéciaux
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // supprime les diacritiques
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Vérifie si `haystack` contient les mots de `needle` (dans n'importe quel ordre).
 * Retourne un score de 0 à 1 (1 = match parfait).
 */
function fuzzyMatch(needle: string, haystack: string): number {
  const needleWords = normalize(needle).split(" ").filter(Boolean);
  const haystackNorm = normalize(haystack);

  if (needleWords.length === 0) return 0;

  let matchedWords = 0;
  let exactBonus = 0;

  for (const word of needleWords) {
    if (haystackNorm.includes(word)) {
      matchedWords++;
      // Bonus si le mot est au début
      if (haystackNorm.startsWith(word)) exactBonus += 0.2;
    }
  }

  const ratio = matchedWords / needleWords.length;

  // Bonus pour match exact de la phrase complète
  if (haystackNorm.includes(normalize(needle))) {
    return Math.min(1, ratio + 0.3 + exactBonus);
  }

  return Math.min(1, ratio + exactBonus);
}

/**
 * Ajoute des <mark> autour des mots matchés
 */
function highlight(text: string, query: string): string {
  if (!query.trim()) return text;
  const words = query
    .split(/\s+/)
    .filter((w) => w.length > 1)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (words.length === 0) return text;

  const regex = new RegExp(`(${words.join("|")})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

/**
 * Recherche dans l'index. Retourne les résultats triés par score décroissant.
 */
export function search(
  index: SearchEntry[],
  query: string,
  maxResults = 20
): SearchResult[] {
  if (!query.trim()) return [];

  const scored: SearchResult[] = [];

  for (const entry of index) {
    // Score pondéré : titre (×3) + description (×1.5) + tags (×2) + type bonus
    const titleScore = fuzzyMatch(query, entry.title) * 3;
    const descScore = fuzzyMatch(query, entry.description) * 1.5;
    const tagsScore = entry.tags
      ? fuzzyMatch(query, entry.tags.join(" ")) * 2
      : 0;

    // Bonus par type (les pages principales sont boostées)
    const typeBonus = entry.type === "page" ? 0.3 : 0;

    const totalScore = titleScore + descScore + tagsScore + typeBonus;

    if (totalScore > 0.5) {
      scored.push({
        ...entry,
        score: totalScore,
        highlightedTitle: highlight(entry.title, query),
        highlightedDescription: highlight(entry.description, query),
      });
    }
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, maxResults);
}
