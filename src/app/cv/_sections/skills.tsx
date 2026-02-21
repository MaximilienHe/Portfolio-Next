// /src/app/cv/_sections/skills.tsx
import logos from "@/data/logos";
import Image from "next/image";

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

const skillLogoProps = {
  sizes: "80px",
  quality: 70,
  loading: "lazy" as const,
  decoding: "async" as const,
};

export default function Skills() {
  return (
    <>
      <section className="skills">
        <div className="inner">
          <h1>Logiciels et technologies utilisées</h1>
          <h2>Web & API</h2>
          <div className="logos">
            <Image
              src={htmlLogo.image}
              width={htmlLogo.width}
              height={htmlLogo.height}
              alt="Logo HTML5, competence web de Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={cssLogo.image}
              width={cssLogo.width}
              height={cssLogo.height}
              alt="Logo CSS3, expertise front-end de Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={javascriptLogo.image}
              width={javascriptLogo.width}
              height={javascriptLogo.height}
              alt="Logo JavaScript, langage front-end et back-end maitrise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={phpLogo.image}
              width={phpLogo.width}
              height={phpLogo.height}
              alt="Logo PHP, competence back-end de Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={nextjsLogo.image}
              width={nextjsLogo.width}
              height={nextjsLogo.height}
              alt="Logo Next.js, framework React utilise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={nodeLogo.image}
              width={nodeLogo.width}
              height={nodeLogo.height}
              alt="Logo Node.js, environnement serveur utilise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={mysqlLogo.image}
              width={mysqlLogo.width}
              height={mysqlLogo.height}
              alt="Logo MySQL, base de donnees maitrisee par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
          </div>

          <h2>Data, IA & Infrastructure</h2>
          <div className="logos">
            <Image
              src={pythonLogo.image}
              width={pythonLogo.width}
              height={pythonLogo.height}
              alt="Logo Python, langage utilise par Maximilien Herr pour la data et l'IA"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={redisLogo.image}
              width={redisLogo.width}
              height={redisLogo.height}
              alt="Logo Redis, solution de cache utilisee par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={dockerLogo.image}
              width={dockerLogo.width}
              height={dockerLogo.height}
              alt="Logo Docker, containerisation maitrisee par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={gitLogo.image}
              width={gitLogo.width}
              height={gitLogo.height}
              alt="Logo Git, gestion de version utilisee par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={vscodeLogo.image}
              width={vscodeLogo.width}
              height={vscodeLogo.height}
              alt="Logo Visual Studio Code, editeur de code de Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
          </div>

          <h2>Développement Logiciel</h2>
          <div className="logos">
            <Image
              src={cLogo.image}
              width={cLogo.width}
              height={cLogo.height}
              alt="Logo langage C, competence logicielle de Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={cppLogo.image}
              width={cppLogo.width}
              height={cppLogo.height}
              alt="Logo C++, langage de programmation maitrise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={csLogo.image}
              width={csLogo.width}
              height={csLogo.height}
              alt="Logo C#, technologie de developpement maitrisee par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={javaLogo.image}
              width={javaLogo.width}
              height={javaLogo.height}
              alt="Logo Java, langage objet utilise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={kotlinLogo.image}
              width={kotlinLogo.width}
              height={kotlinLogo.height}
              alt="Logo Kotlin, langage Android maitrise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={rustLogo.image}
              width={rustLogo.width}
              height={rustLogo.height}
              alt="Logo Rust, langage systeme utilise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={visualStudioLogo.image}
              width={visualStudioLogo.width}
              height={visualStudioLogo.height}
              alt="Logo Visual Studio, IDE utilise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={androidStudioLogo.image}
              width={androidStudioLogo.width}
              height={androidStudioLogo.height}
              alt="Logo Android Studio, IDE mobile utilise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
          </div>
          <h2>3D & Jeu-vidéo</h2>
          <div className="logos">
            <Image
              src={unityLogo.image}
              width={unityLogo.width}
              height={unityLogo.height}
              alt="Logo Unity, moteur de jeu maitrise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={unrealLogo.image}
              width={unrealLogo.width}
              height={unrealLogo.height}
              alt="Logo Unreal Engine, moteur 3D utilise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
          </div>
          <div className="logos">
            <Image
              src={threeDsMaxLogo.image}
              width={threeDsMaxLogo.width}
              height={threeDsMaxLogo.height}
              alt="Logo 3ds Max, logiciel 3D utilise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={threeDFZephyrLogo.image}
              width={threeDFZephyrLogo.width}
              height={threeDFZephyrLogo.height}
              alt="Logo 3DF Zephyr, photogrammetrie pratiquee par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
            <Image
              src={substancePainterLogo.image}
              width={substancePainterLogo.width}
              height={substancePainterLogo.height}
              alt="Logo Substance Painter, texturing 3D maitrise par Maximilien Herr"
              className="logo"
            {...skillLogoProps}
            />
          </div>
        </div>
      </section>

      {/* heading */}
      <h1>Centres d&apos;intérêt</h1>
    </>
  );
}
