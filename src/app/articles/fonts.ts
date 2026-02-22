import localFont from "next/font/local";

// Frandroid: sans moderne lisible
export const frandroidFont = localFont({
  src: [
    {
      path: "../../assets/Product Sans/product_sans_regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/Product Sans/product_sans_bold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/Product Sans/product_sans_bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-frandroid",
});

// DroidSoft: style Android/WordPress courant
export const droidsoftFont = localFont({
  src: [
    {
      path: "../../assets/Product Sans/product_sans_regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/Product Sans/product_sans_bold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-droidsoft",
});

// Le Café du Geek: titres au tracé un peu plus rond
export const lcdgFont = localFont({
  src: [
    {
      path: "../../assets/Product Sans/product_sans_bold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/Product Sans/product_sans_bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-lcdg",
});
