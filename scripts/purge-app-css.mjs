import fs from "node:fs/promises";
import process from "node:process";

const INPUT_CSS = "src/app/app.css";
const OUTPUT_CSS = "src/app/app.purged.css";
const BACKUP_CSS = "src/app/app.css.bak";

const CONTENT_GLOBS = [
  "src/**/*.{js,jsx,ts,tsx,md,mdx}",
  "content/**/*.{md,mdx}",
];

const SAFE_LIST = {
  standard: ["html", "body"],
  deep: [
    /^nav--/,
    /^is-open$/,
    /^nav-toggle$/,
    /^card-pos-/,
    /^source-section/,
    /^carousel-arrow$/,
    /^article-hero/,
    /^articleImgWrapper$/,
    /^article-hero-media$/,
    /^cardImageWrapper$/,
    /^blog-tag$/,
    /^tagBadge$/,
    /^explore-/,
  ],
};

async function loadPurgeCSS() {
  try {
    return await import("purgecss");
  } catch (error) {
    console.error("Cannot run PurgeCSS: dependency 'purgecss' is not installed.");
    console.error("Run: npm install --save-dev purgecss");
    throw error;
  }
}

async function main() {
  const shouldReplace = process.argv.includes("--replace");
  const { PurgeCSS } = await loadPurgeCSS();

  const purgeResult = await new PurgeCSS().purge({
    content: CONTENT_GLOBS,
    css: [INPUT_CSS],
    fontFace: true,
    keyframes: true,
    variables: true,
    defaultExtractor: (content) =>
      content.match(/[\w-/:%.]+(?<!:)/g) || [],
    safelist: SAFE_LIST,
  });

  if (!purgeResult.length || typeof purgeResult[0].css !== "string") {
    throw new Error("PurgeCSS returned no CSS output.");
  }

  const css = purgeResult[0].css;

  if (shouldReplace) {
    await fs.copyFile(INPUT_CSS, BACKUP_CSS);
    await fs.writeFile(INPUT_CSS, css, "utf8");
    console.log(
      `Purged CSS written to ${INPUT_CSS} (backup: ${BACKUP_CSS}).`
    );
    return;
  }

  await fs.writeFile(OUTPUT_CSS, css, "utf8");
  console.log(`Purged CSS written to ${OUTPUT_CSS}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
