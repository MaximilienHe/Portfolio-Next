import fs from "node:fs";
import path from "node:path";

type CheckResult = {
  name: string;
  ok: boolean;
  details: string;
};

function readFile(relativePath: string): string {
  const filePath = path.join(process.cwd(), relativePath);
  return fs.readFileSync(filePath, "utf8");
}

function fileExists(relativePath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), relativePath));
}

function countMatches(input: string, pattern: RegExp): number {
  return (input.match(pattern) || []).length;
}

function runChecks(): CheckResult[] {
  const checks: CheckResult[] = [];

  const contactPage = readFile("src/app/contact/page.tsx");
  const nrPage = readFile("src/app/nr/page.tsx");

  checks.push({
    name: "Contact has exactly one H1",
    ok: countMatches(contactPage, /<h1[\s>]/g) === 1,
    details: `count=${countMatches(contactPage, /<h1[\s>]/g)}`,
  });

  checks.push({
    name: "NR has exactly one H1",
    ok: countMatches(nrPage, /<h1[\s>]/g) === 1,
    details: `count=${countMatches(nrPage, /<h1[\s>]/g)}`,
  });

  const metadataFiles = [
    "src/app/articles/page.tsx",
    "src/app/blog/page.tsx",
    "src/app/contact/page.tsx",
    "src/app/cv/page.tsx",
    "src/app/nr/page.tsx",
    "src/app/projets/page.tsx",
  ];

  for (const file of metadataFiles) {
    const content = readFile(file);
    checks.push({
      name: `${file} uses buildPageMetadata`,
      ok: content.includes("buildPageMetadata("),
      details: content.includes("buildPageMetadata(") ? "ok" : "missing",
    });
  }

  checks.push({
    name: "Middleware fallback exists",
    ok: fileExists("middleware.ts"),
    details: fileExists("middleware.ts") ? "present" : "missing",
  });

  checks.push({
    name: "SEO helper exists",
    ok: fileExists("src/lib/seo.ts"),
    details: fileExists("src/lib/seo.ts") ? "present" : "missing",
  });

  const robots = readFile("src/app/robots.ts");
  checks.push({
    name: "Robots points to canonical sitemap",
    ok: robots.includes("sitemap: `${SITE_URL}/sitemap.xml`"),
    details: robots.includes("SITE_URL") ? "ok" : "missing SITE_URL",
  });

  const legacyImageReferences = [
    "/images/blog/blog-construction.png",
    "/images/Projects/t2c-screen/hero.png",
    "/images/Images/projects/droidsoft_app_horizontal.png",
  ];

  const contentTree = [
    "content/blog/blog-en-construction.mdx",
    "content/projets/t2c-screen.mdx",
    "content/projets/droidsoft-app.mdx",
    "src/data/images.tsx",
  ]
    .map(readFile)
    .join("\n");

  for (const imagePath of legacyImageReferences) {
    checks.push({
      name: `Legacy image removed from references: ${imagePath}`,
      ok: !contentTree.includes(imagePath),
      details: contentTree.includes(imagePath) ? "still referenced" : "ok",
    });
  }

  checks.push({
    name: "Disavow file exists",
    ok: fileExists("seo/disavow-2026-02-22.txt"),
    details: fileExists("seo/disavow-2026-02-22.txt") ? "present" : "missing",
  });

  return checks;
}

const results = runChecks();
const failures = results.filter((result) => !result.ok);

for (const result of results) {
  const marker = result.ok ? "PASS" : "FAIL";
  // eslint-disable-next-line no-console
  console.log(`${marker} - ${result.name} (${result.details})`);
}

if (failures.length > 0) {
  // eslint-disable-next-line no-console
  console.error(`\nSEO check failed with ${failures.length} issue(s).`);
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log(`\nSEO check passed (${results.length} checks).`);
