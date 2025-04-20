
import "./style.css";
import type { Metadata } from "next";
import Quote from "./_sections/quote";
import Xp from "./_sections/xp";
import Skills from "./_sections/skills";
import Interest from "./_sections/interest";
import Formations from "./_sections/formations";
import Download from "./_sections/download";

export const metadata: Metadata = {
  title: "Maximilien Herr - CV",
};

export default function Cv() {
  return (
    <>
      <Quote />
      <Xp />
      <Formations />
      <Skills />
      <Interest />
      <Download />
    </>
  );
}
