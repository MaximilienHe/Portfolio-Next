import Landing from "./_sections/landing";
import Xp from "./_sections/xp";
import Projets from "./_sections/projets";
import Articles from "./_sections/articles";
import Skills from "./_sections/skills";
import ArticlesDyn from "./_sections/articles-dyn";
export default function Home() {
  return (
    <>
      <Landing />
      <Xp />
      <Projets />
      {/* <Articles /> */}
      <ArticlesDyn />
      <Skills />
    </>
  );
}
