import "./style.css";
import "./projetstyle.css";
import logos from "@/data/logos";
import ImageOptimize from "@/components/imageOptimization";
import images from "@data/images";
import imagesTwo from "@/data/ImagesTwo";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

const {
	droidsoftAppHorizontal,
	asciiArtIllustration,
	Comparaison,
	baseDeDonneesGameJam,
	SAE3D,
	TwitchTracking,
	blogSansCMS,
} = images;

const {
	redisLogo,
	htmlLogo,
	cssLogo,
	javascriptLogo,
	phpLogo,
	mysqlLogo,
	vuejsLogo,
	xamppLogo,
	cppLogo,
	visualStudioLogo,
	kotlinLogo,
	androidStudioLogo,
	unrealLogo,
	threeDsMaxLogo,
	substancePainterLogo,
	gitLogo,
	excelLogo,
	wordLogo,
} = logos;

const { graphiqueClairFonce } = imagesTwo;

export default function projets() {
	const breadcrumbItems = [
		{ name: "Accueil", url: "https://maximilienherr.fr" },
		{ name: "Projets", url: "https://maximilienherr.fr/projets" },
	];
	return (
		<>
			<head>
				<title>Projets – Portfolio de Maximilien Herr</title>
				<meta
					name="description"
					content="Découvrez mes réalisations techniques, applications et sites open‑source."
				/>
				<link rel="canonical" href="https://maximilienherr.fr/projets" />
			</head>
			<BreadcrumbJsonLd items={breadcrumbItems} />
			<section className="projets">
				<h1 style={{ marginBottom: "1vh" }}>
					Quelques projets réalisés pour monter en compétences
				</h1>
				<p
					style={{
						textAlign: "center",
						marginBottom: "5vh",
						margin: "0 4vw 5vh 4vw",
					}}
				>
					A travers tous ces projets, il est clair qu&apos;il y a une certaine
					montée en compétences techniques. Dans les pages de ces projets, je
					précise par ailleurs ces compétences techniques. Mais de manière
					générale, ces travaux sont réalisés en groupe, cela implique donc des
					compétences transversales. <br />
					<br />
					C&apos;est notamment une bonne communication au sein de l&apos;équipe,
					à travers des outils de communication classiques (Discord, Slack ...).
					Aussi pour définir les tâches du projet, un recueil de besoins est
					souvent réalisé. Celui-ci a pour ambition de définir les tâches à
					faire, et en fonction de l&apos;ambition et du nombre de tâches,
					j&apos;utilise parfois un Trello ou un rétro-planning pour planifier
					les tâches selon le temps et les personnes impliquées dans le projet.
					<br />
					<br />
					Enfin, pour le travail en équipe, je suis souvent en charge du
					management, à la fois avec les outils que je viens de citer, mais
					aussi avec des techniques plus précises. Par exemple, cela peut-être
					la méthode SCRUM, mais aussi la mise en place de Git pour le partage
					de code.
				</p>
				<Link href="/projets/droidsoft-app" className="linkProject">
					<div className="projectCard">
						<ImageOptimize
							src={droidsoftAppHorizontal}
							alt="droidsoft poster"
						/>
						<div className="projectContent">
							<h3>Application Mobile - DroidSoft App</h3>
							<p>
								Une app mobile réalisée en Kotlin sous Android Studio pour le
								média DroidSoft
							</p>
							<div className="languages">
								<ImageOptimize src={androidStudioLogo} alt="android logo" />
								<ImageOptimize src={kotlinLogo} alt="kotlin logo" />
								<ImageOptimize src={javascriptLogo} alt="javascript logo" />
								<ImageOptimize src={gitLogo} alt="Git logo" />
							</div>
						</div>
					</div>
				</Link>

				<Link href="/projets/temple-3D/" className="linkProject">
					<div className="projectCard">
						<ImageOptimize src={SAE3D} alt="droidsoft poster" />
						<div className="projectContent">
							<h3>3D et JV - Création d&apos;un musée en 3D</h3>
							<p>
								Un jeu pour découvrir un temple ancien contenant des oeuvres
								contemporaines, le tout en 3D !
							</p>
							<div className="languages">
								<ImageOptimize src={threeDsMaxLogo} alt="3DSMax logo" />
								<ImageOptimize
									src={substancePainterLogo}
									alt="Substance logo"
								/>
								<ImageOptimize src={unrealLogo} alt="UnrealEngine logo" />
								<ImageOptimize src={gitLogo} alt="Git logo" />
							</div>
						</div>
					</div>
				</Link>

				<Link href="/projets/ascii-art/" className="linkProject">
					<div className="projectCard">
						<ImageOptimize src={asciiArtIllustration} alt="ASCII Art poster" />
						<div className="projectContent">
							<h3>Développement Logiciel - ASCII Art</h3>
							<p>
								Un petit logiciel qui permet de convertir des images au format
								PGM en fichier texte, reproduisant l&apos;image selon la table
								ASCII.
							</p>
							<div className="languages">
								<ImageOptimize src={cppLogo} alt="CPP logo" />
								<ImageOptimize src={visualStudioLogo} alt="VisualStudio logo" />
								<ImageOptimize src={gitLogo} alt="Git logo" />
							</div>
						</div>
					</div>
				</Link>

				<Link
					href="/projets/comparaison-algorithmique/"
					className="linkProject"
				>
					<div className="projectCard">
						<ImageOptimize src={Comparaison} alt="ASCII Art poster" />
						<div className="projectContent">
							<h3>Développement Logiciel - Comparaison d&apos;algos</h3>
							<p>
								Programme regroupant plusieurs algorithmes de tris, avec export
								de ces données
							</p>
							<div className="languages">
								<ImageOptimize src={cppLogo} alt="CPP logo" />
								<ImageOptimize src={visualStudioLogo} alt="VisualStudio logo" />
								<ImageOptimize src={gitLogo} alt="Git logo" />
								<ImageOptimize src={excelLogo} alt="Excel logo" />
								<ImageOptimize src={wordLogo} alt="Word logo" />
							</div>
						</div>
					</div>
				</Link>

				<Link href="/projets/blog-sans-cms/" className="linkProject">
					<div className="projectCard">
						<ImageOptimize src={blogSansCMS} alt="Blog sans CMS poster" />
						<div className="projectContent">
							<h3>Développement Web - Blog sans CMS</h3>
							<p>
								Un blog qui reprend les bases des CMS classiques, mais codé à la
								main, avec création d&apos;articles, lecture de ceux-ci, like,
								commentaires ...
							</p>
							<div className="languages">
								<ImageOptimize src={vuejsLogo} alt="VueJS logo" />
								<ImageOptimize src={mysqlLogo} alt="MySQL logo" />
								<ImageOptimize src={redisLogo} alt="redis logo" />
								<ImageOptimize src={gitLogo} alt="Git logo" />
							</div>
						</div>
					</div>
				</Link>

				<Link
					href="/projets/rechauffement-climatique/"
					className="linkProject"
				>
					<div className="projectCard">
						<ImageOptimize
							src={graphiqueClairFonce}
							alt="graphique projet réchauffement climatique"
						/>
						<div className="projectContent">
							<h3>
								Développement Logiciel - Visualiser le réchauffement climatique
							</h3>
							<p>
								Créer des graphiques pour visualiser le réchauffement climatique
							</p>
							<div className="languages">
								<ImageOptimize src={visualStudioLogo} alt="VisualStudio logo" />
								<ImageOptimize src={cppLogo} alt="CPP logo" />
								<ImageOptimize src={gitLogo} alt="Git logo" />
							</div>
						</div>
					</div>
				</Link>

				<Link href="/projets/game-jam-bdd/" className="linkProject">
					<div className="projectCard">
						<ImageOptimize
							src={baseDeDonneesGameJam}
							alt="base de données game jam poster"
						/>
						<div className="projectContent">
							<h3>
								Développement Web - Création d&apos;une base de données pour
								Game Jam
							</h3>
							<p>
								Créer une base de données pour gérer le site d&apos;une Game Jam
							</p>
							<div className="languages">
								<ImageOptimize src={xamppLogo} alt="XAMPP logo" />
								<ImageOptimize src={mysqlLogo} alt="MySQL logo" />
								<ImageOptimize src={gitLogo} alt="Git logo" />
							</div>
						</div>
					</div>
				</Link>

				<Link href="/projets/twitch-tracker/" className="linkProject">
					<div className="projectCard">
						<ImageOptimize src={TwitchTracking} alt="website poster" />
						<div className="projectContent">
							<h3>Développement Web - Twitch Tracker</h3>
							<p>
								Un tracker de données obtenues via des APIs, pour appréhender
								les bases du Web / base de données
							</p>
							<div className="languages">
								<ImageOptimize src={htmlLogo} alt="html logo" />
								<ImageOptimize src={cssLogo} alt="css logo" />
								<ImageOptimize src={javascriptLogo} alt="javascript logo" />
								<ImageOptimize src={phpLogo} alt="php logo" />
								<ImageOptimize src={mysqlLogo} alt="mysql logo" />
							</div>
						</div>
					</div>
				</Link>
			</section>
		</>
	);
}
