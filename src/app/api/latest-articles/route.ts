// src/app/api/latest-articles/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { getAllLatestArticles } from "@/lib/fetchArticles";

export const revalidate = 600; // ISR de 10 min

function clampInt(
  raw: string | null,
  min: number,
  max: number,
  fallback: number,
): number {
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = clampInt(searchParams.get("page"), 1, 20, 1);
  const perSource = clampInt(searchParams.get("perSource"), 1, 30, 10);
  const maxTotal = perSource * 3 + 6; // garde-fou

  try {
    const articles = await getAllLatestArticles({
      perDroidsoft: perSource,
      perLcdg: perSource,
      perFrandroid: perSource,
      maxTotal,
      page,
    });

    // hasMore : on regarde si les sources WordPress paginables (DroidSoft + LCDG)
    // renvoient encore un lot complet. Frandroid étant un RSS non paginable,
    // on l'ignore pour cette heuristique.
    const paginableCount = articles.filter(
      (a) => a.source === "DroidSoft" || a.source === "Le Café du Geek",
    ).length;
    const hasMore = paginableCount >= perSource;

    return NextResponse.json(
      { articles, page, perSource, hasMore },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60",
        },
      },
    );
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur inconnue" },
      { status: 500 },
    );
  }
}
