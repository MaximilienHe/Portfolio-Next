// /src/app/cv/_sections/skills.tsx
import ImageOptimize from "@/components/imageOptimization";
import logos from "@/data/logos";

const {
  htmlLogo,
  cssLogo,
  javascriptLogo,
  phpLogo,
  nextjsLogo,
  nodeLogo,
  mysqlLogo,
  redisLogo,
  dockerLogo,
  gitLogo,
  pythonLogo,
  cLogo,
  cppLogo,
  csLogo,
  javaLogo,
  kotlinLogo,
  rustLogo,
  visualStudioLogo,
  vscodeLogo,
  androidStudioLogo,
  unityLogo,
  unrealLogo,
  threeDsMaxLogo,
  threeDFZephyrLogo,
  substancePainterLogo,
} = logos;

export default function Skills() {
  return (
    <>
      <section className="skills">
        <div className="inner">
          <h1>Logiciels et technologies utilisées</h1>
          <h2>Web & API</h2>
          <div className="logos">
            <ImageOptimize src={htmlLogo} alt="HTML5 logo" className="logo" />
            <ImageOptimize src={cssLogo} alt="CSS3 logo" className="logo" />
            <ImageOptimize
              src={javascriptLogo}
              alt="JavaScript logo"
              className="logo"
            />
            <ImageOptimize src={phpLogo} alt="PHP logo" className="logo" />
            <ImageOptimize src={nextjsLogo} alt="NextJS logo" className="logo" />
            <ImageOptimize src={nodeLogo} alt="Node.js logo" className="logo" />
            <ImageOptimize src={mysqlLogo} alt="MySQL logo" className="logo" />
          </div>

          <h2>Data, IA & Infrastructure</h2>
          <div className="logos">
            <ImageOptimize src={pythonLogo} alt="Python logo" className="logo" />
            <ImageOptimize src={redisLogo} alt="Redis logo" className="logo" />
            <ImageOptimize src={dockerLogo} alt="Docker logo" className="logo" />
            <ImageOptimize src={gitLogo} alt="Git logo" className="logo" />
            <ImageOptimize src={vscodeLogo} alt="VSCode logo" className="logo" />
          </div>

          <h2>Développement Logiciel</h2>
          <div className="logos">
            <ImageOptimize src={cLogo} alt="C logo" className="logo" />
            <ImageOptimize src={cppLogo} alt="C++ logo" className="logo" />
            <ImageOptimize src={csLogo} alt="C# logo" className="logo" />
            <ImageOptimize src={javaLogo} alt="Java logo" className="logo" />
            <ImageOptimize src={kotlinLogo} alt="Kotlin logo" className="logo" />
            <ImageOptimize src={rustLogo} alt="Rust logo" className="logo" />
            <ImageOptimize
              src={visualStudioLogo}
              alt="VisualStudio logo"
              className="logo"
            />
            <ImageOptimize
              src={androidStudioLogo}
              alt="AndroidStudio logo"
              className="logo"
            />
          </div>
          <h2>3D & Jeu-vidéo</h2>
          <div className="logos">
            <ImageOptimize src={unityLogo} alt="Unity logo" className="logo" />
            <ImageOptimize src={unrealLogo} alt="Unreal logo" className="logo" />
          </div>
          <div className="logos">
            <ImageOptimize
              src={threeDsMaxLogo}
              alt="3DsMax logo"
              className="logo"
            />
            <ImageOptimize
              src={threeDFZephyrLogo}
              alt="3DFZephyr logo"
              className="logo"
            />
            <ImageOptimize
              src={substancePainterLogo}
              alt="Substance Painter logo"
              className="logo"
            />
          </div>
        </div>
      </section>

      {/* heading */}
      <h1>Centres d&apos;intérêt</h1>
    </>
  );
}
