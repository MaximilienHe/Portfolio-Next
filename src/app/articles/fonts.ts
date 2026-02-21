import { Inter, Open_Sans, Titillium_Web } from "next/font/google";

// Frandroid: sans moderne lisible
export const frandroidFont = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-frandroid",
});

// DroidSoft: style Android/WordPress courant
export const droidsoftFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-droidsoft",
});

// Le Café du Geek: titres au tracé un peu plus rond
export const lcdgFont = Titillium_Web({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-lcdg",
});
