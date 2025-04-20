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
  nextjsLogo,
  vuejsLogo,
  vscodeLogo,
  xamppLogo,
  rustLogo,
  javaLogo,
  kotlinLogo,
  androidStudioLogo,
  threeDsMaxLogo,
  threeDFZephyrLogo,
  substancePainterLogo,
  pythonLogo,
} = logos;

export default function Skills() {
  return (
    <>
      <section className="skills">
        <h1>Logiciels et technologies utilisées</h1>
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
        <div className="logos">
          <ImageOptimize src={nextjsLogo} alt="NextJS logo" className="logo" />
          <ImageOptimize src={vuejsLogo} alt="VueJS logo" className="logo" />
          <ImageOptimize src={vscodeLogo} alt="VSCode logo" className="logo" />
          <ImageOptimize src={xamppLogo} alt="XAMPP logo" className="logo" />
        </div>
        <h2>Développement Logiciel</h2>
        <div className="logos">
          <ImageOptimize src={cLogo} alt="C logo" className="logo" />
          <ImageOptimize src={cppLogo} alt="C++ logo" className="logo" />
          <ImageOptimize src={csLogo} alt="C# logo" className="logo" />
          <ImageOptimize src={pythonLogo} alt="Python logo" className="logo" />
          <ImageOptimize
            src={visualStudioLogo}
            alt="VisualStudio logo"
            className="logo"
          />
        </div>
        <div className="logos">
          <ImageOptimize src={rustLogo} alt="Rust logo" className="logo" />
          <ImageOptimize src={javaLogo} alt="Java logo" className="logo" />
          <ImageOptimize src={kotlinLogo} alt="Kotlin logo" className="logo" />
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
      </section>

      {/* heading */}
      <h1>Centres d&apos;intérêt</h1>
    </>
  );
}
