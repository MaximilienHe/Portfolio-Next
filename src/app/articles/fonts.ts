import { Inter, Roboto, Poppins } from "next/font/google";

// Frandroid: sans moderne lisible
export const frandroidFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-frandroid",
});

// DroidSoft: style Android/WordPress courant
export const droidsoftFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-droidsoft",
});

// Le Café du Geek: titres au tracé un peu plus rond
export const lcdgFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-lcdg",
});
