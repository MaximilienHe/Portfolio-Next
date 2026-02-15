// /src/app/_sections/skills.tsx
import Link from "next/link";
import ImageOptimize from "@/components/imageOptimization";
import logos from "@/data/logos";

const {
  htmlLogo,
  javascriptLogo,
  phpLogo,
  mysqlLogo,
  cLogo,
  cppLogo,
  csLogo,
  visualStudioLogo,
  unityLogo,
  unrealLogo,
  cssLogo,
} = logos;

export default function Skills() {
  return (
    <section className="skills">
      <h2>Competences</h2>
      <h3>Developpement Web</h3>
      <div className="logos">
        <ImageOptimize src={htmlLogo} alt="HTML5 logo" className="logo" />
        <ImageOptimize src={cssLogo} alt="CSS3 logo" className="logo" />
        <ImageOptimize
          src={javascriptLogo}
          alt="JavaScript logo"
          className="logo"
        />
        <ImageOptimize src={phpLogo} alt="PHP logo" className="logo" />
        <ImageOptimize src={mysqlLogo} alt="MySQL logo" className="logo" />
      </div>
      <h3>Developpement Logiciel</h3>
      <div className="logos">
        <ImageOptimize src={cLogo} alt="C logo" className="logo" />
        <ImageOptimize src={cppLogo} alt="C++ logo" className="logo" />
        <ImageOptimize src={csLogo} alt="C# logo" className="logo" />
        <ImageOptimize
          src={visualStudioLogo}
          alt="VisualStudio logo"
          className="logo"
        />
      </div>
      <h3>3D & Jeu-video</h3>
      <div className="logos">
        <ImageOptimize src={unityLogo} alt="Unity logo" className="logo" />
        <ImageOptimize src={unrealLogo} alt="Unreal logo" className="logo" />
      </div>
      <Link href="/cv" className="button">
        Decouvrir toutes les technos et langages
      </Link>
    </section>
  );
}
