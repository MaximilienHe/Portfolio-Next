import ReactPDF from "@react-pdf/renderer";
import path from "path";
import React from "react";
import { CvDocument } from "../src/components/cv-pdf/CvDocument";

async function main() {
  const outputPath = path.resolve(process.cwd(), "public/cv-generated.pdf");

  await ReactPDF.renderToFile(
    React.createElement(CvDocument),
    outputPath
  );

  console.log(`CV PDF generated at: ${outputPath}`);
}

main().catch((err) => {
  console.error("Failed to generate CV PDF:", err);
  process.exit(1);
});
