// /src/app/_sections/skills.tsx
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
      <h1>Compétences</h1>
      <h2>Développement Web</h2>
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
      <h2>Développement Logiciel</h2>
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
      <h2>3D & Jeu-vidéo</h2>
      <div className="logos">
        <ImageOptimize src={unityLogo} alt="Unity logo" className="logo" />
        <ImageOptimize src={unrealLogo} alt="Unreal logo" className="logo" />
      </div>
      <a href="./cv" className="button">
        Découvrir toutes les technos et langages
      </a>
    </section>
  );
}
