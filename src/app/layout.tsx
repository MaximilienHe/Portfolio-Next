import { Inter } from "next/font/google";
import "./globals.css";
import "./app.css";
import "../assets/Product Sans/stylesheet.css";
import Header from "@/common/header";
import Footer from "@/common/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Je me présente, Maximilien Herr, et sur ce site, vous retrouverez mon portfolio, à travers mes projets, mon CV, et bien plus encore pour découvrir mon profil de développeur et de rédacteur tech"
          />
          <meta
            name="image"
            content="https://maximilienherr.fr/banniere_dev_redac.png"
          />
          <meta property="og:title" content="Maximilien Herr - Portfolio" />
          <meta
            property="og:description"
            content="Je me présente, Maximilien Herr, et sur ce site, vous retrouverez mon portfolio, à travers mes projets, mon CV, et bien plus encore !"
          />
          <meta
            property="og:image"
            content="https://maximilienherr.fr/banniere_dev_redac.png"
          />
          <meta property="og:url" content="https://maximilienherr.fr" />
          {/* <link rel="stylesheet" href="./Product Sans/stylesheet.css" />
          <link rel="stylesheet" href="./style.css" /> */}
          <link rel="icon" href="/favicon.ico" />

          <title>Maximilien Herr</title>
        </head>
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
