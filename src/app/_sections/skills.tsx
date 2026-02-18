// /src/app/_sections/skills.tsx
import Link from "next/link";
import Image from "next/image";
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
        <Image
          src={htmlLogo.image}
          width={htmlLogo.width}
          height={htmlLogo.height}
          alt="Logo HTML5, technologie maitrisee par Maximilien Herr en developpement web"
          className="logo"
        />
        <Image
          src={cssLogo.image}
          width={cssLogo.width}
          height={cssLogo.height}
          alt="Logo CSS3, competence front-end de Maximilien Herr"
          className="logo"
        />
        <Image
          src={javascriptLogo.image}
          width={javascriptLogo.width}
          height={javascriptLogo.height}
          alt="Logo JavaScript, langage utilise par Maximilien Herr pour des interfaces web"
          className="logo"
        />
        <Image
          src={phpLogo.image}
          width={phpLogo.width}
          height={phpLogo.height}
          alt="Logo PHP, langage back-end utilise par Maximilien Herr"
          className="logo"
        />
        <Image
          src={mysqlLogo.image}
          width={mysqlLogo.width}
          height={mysqlLogo.height}
          alt="Logo MySQL, base de donnees maitrisee par Maximilien Herr"
          className="logo"
        />
      </div>
      <h3>Developpement Logiciel</h3>
      <div className="logos">
        <Image
          src={cLogo.image}
          width={cLogo.width}
          height={cLogo.height}
          alt="Logo langage C, competence en developpement logiciel de Maximilien Herr"
          className="logo"
        />
        <Image
          src={cppLogo.image}
          width={cppLogo.width}
          height={cppLogo.height}
          alt="Logo C++, langage de programmation maitrise par Maximilien Herr"
          className="logo"
        />
        <Image
          src={csLogo.image}
          width={csLogo.width}
          height={csLogo.height}
          alt="Logo C#, technologie logicielle utilisee par Maximilien Herr"
          className="logo"
        />
        <Image
          src={visualStudioLogo.image}
          width={visualStudioLogo.width}
          height={visualStudioLogo.height}
          alt="Logo Visual Studio, environnement de developpement de Maximilien Herr"
          className="logo"
        />
      </div>
      <h3>3D & Jeu-video</h3>
      <div className="logos">
        <Image
          src={unityLogo.image}
          width={unityLogo.width}
          height={unityLogo.height}
          alt="Logo Unity, moteur de jeu utilise par Maximilien Herr"
          className="logo"
        />
        <Image
          src={unrealLogo.image}
          width={unrealLogo.width}
          height={unrealLogo.height}
          alt="Logo Unreal Engine, competence 3D de Maximilien Herr"
          className="logo"
        />
      </div>
      <Link href="/cv" className="button">
        Decouvrir toutes les technos et langages
      </Link>
    </section>
  );
}
