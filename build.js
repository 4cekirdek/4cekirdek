const sass = require("sass");
const fs = require("fs");
const path = require("path");

const inputIndexFile = path.join(__dirname, "src/index.scss");
const inputFonts = path.join(__dirname, "src/styles/_fonts.scss");
const inputTypography = path.join(__dirname, "src/styles/_typography.scss");
const inputUi = path.join(__dirname, "src/styles/_ui.scss");
const inputBorder = path.join(__dirname, "src/styles/_border.scss");
const inputSpacing = path.join(__dirname, "src/styles/_spacing.scss");
const inputSizing = path.join(__dirname, "src/styles/_sizing.scss");
const inputGridSystem = path.join(__dirname, "src/styles/_grid-system.scss");
const inputEffect = path.join(__dirname, "src/styles/_effect.scss");
const inputTable = path.join(__dirname, "src/styles/_table.scss");
const inputTransition = path.join(__dirname, "src/styles/_transition.scss");

const outputIndexFile = path.join(__dirname, "dist/index.css");
const outputFonts = path.join(__dirname, "dist/fonts.css");
const outputTypography = path.join(__dirname, "dist/typography.css");
const outputUi = path.join(__dirname, "dist/ui.css");
const outputBorder = path.join(__dirname, "dist/border.css");
const outputSpacing = path.join(__dirname, "dist/spacing.css");
const outputSizing = path.join(__dirname, "dist/sizing.css");
const outputGridSystem = path.join(__dirname, "dist/grid-system.css");
const outputEffect = path.join(__dirname, "dist/effect.css");
const outputTable = path.join(__dirname, "dist/table.css");
const outputTransition = path.join(__dirname, "dist/transition.css");

function compileScss() {
  try {
    const resultIndexFile = sass.compile(inputIndexFile);
    const resultFonts = sass.compile(inputFonts);
    const resultTypography = sass.compile(inputTypography);
    const resultUi = sass.compile(inputUi);
    const resultBorder = sass.compile(inputBorder);
    const resultSpacing = sass.compile(inputSpacing);
    const resultSizing = sass.compile(inputSizing);
    const resultGridSystem = sass.compile(inputGridSystem);
    const resultEffect = sass.compile(inputEffect);
    const resultTable = sass.compile(inputTable);
    const resultTransition = sass.compile(inputTransition);

    fs.writeFileSync(outputIndexFile, resultIndexFile.css);
    fs.writeFileSync(outputFonts, resultFonts.css);
    fs.writeFileSync(outputTypography, resultTypography.css);
    fs.writeFileSync(outputUi, resultUi.css);
    fs.writeFileSync(outputBorder, resultBorder.css);
    fs.writeFileSync(outputSpacing, resultSpacing.css);
    fs.writeFileSync(outputSizing, resultSizing.css);
    fs.writeFileSync(outputGridSystem, resultGridSystem.css);
    fs.writeFileSync(outputEffect, resultEffect.css);
    fs.writeFileSync(outputTable, resultTable.css);
    fs.writeFileSync(outputTransition, resultTransition.css);

    console.log(`SCSS başarıyla ${outputIndexFile} dosyasına dönüştürüldü!`);
  } catch (err) {
    console.error("Hata oluştu:", err.message);
  }
}

// Derleme işlemini başlat
compileScss();
