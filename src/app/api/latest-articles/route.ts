// src/app/api/latest-articles/route.ts
import { NextResponse } from "next/server";
import { getAllLatestArticles } from "@/lib/fetchArticles";

export const revalidate = 600; // ISR de 10 min

export async function GET() {
  try {
    const articles = await getAllLatestArticles({
      perDroidsoft: 10,
      perLcdg: 10,
      perFrandroid: 10,
      maxTotal: 24,
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur inconnue" },
      { status: 500 }
    );
  }
}
