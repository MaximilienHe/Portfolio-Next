import type { SearchEntry } from "@/lib/search";

let cachedIndex: SearchEntry[] | null = null;
let inFlight: Promise<SearchEntry[]> | null = null;

export async function loadSearchIndex(): Promise<SearchEntry[]> {
  if (cachedIndex) return cachedIndex;
  if (inFlight) return inFlight;

  inFlight = fetch("/api/search-index")
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Impossible de charger l'index (${response.status})`);
      }
      return (await response.json()) as SearchEntry[];
    })
    .then((data) => {
      cachedIndex = data;
      return data;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}

