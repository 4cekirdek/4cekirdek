const sass = require("sass");
const fs = require("fs");
const path = require("path");
const csso = require("csso");

// SCSS giriş dosyaları
const inputFiles = {
  index: path.join(__dirname, "src/index.scss"),
  fonts: path.join(__dirname, "src/styles/_fonts.scss"),
  typography: path.join(__dirname, "src/styles/_typography.scss"),
  ui: path.join(__dirname, "src/styles/_ui.scss"),
  border: path.join(__dirname, "src/styles/_border.scss"),
  spacing: path.join(__dirname, "src/styles/_spacing.scss"),
  sizing: path.join(__dirname, "src/styles/_sizing.scss"),
  gridSystem: path.join(__dirname, "src/styles/_grid-system.scss"),
  effect: path.join(__dirname, "src/styles/_effect.scss"),
  table: path.join(__dirname, "src/styles/_table.scss"),
  transition: path.join(__dirname, "src/styles/_transition.scss"),
};

// CSS çıkış dosyaları
const outputFiles = {
  index: path.join(__dirname, "dist/index.css"),
  fonts: path.join(__dirname, "dist/fonts.css"),
  typography: path.join(__dirname, "dist/typography.css"),
  ui: path.join(__dirname, "dist/ui.css"),
  border: path.join(__dirname, "dist/border.css"),
  spacing: path.join(__dirname, "dist/spacing.css"),
  sizing: path.join(__dirname, "dist/sizing.css"),
  gridSystem: path.join(__dirname, "dist/grid-system.css"),
  effect: path.join(__dirname, "dist/effect.css"),
  table: path.join(__dirname, "dist/table.css"),
  transition: path.join(__dirname, "dist/transition.css"),
};

// SCSS derleme ve minify etme fonksiyonu
function compileAndMinifyScss(inputPath, outputPath) {
  try {
    // SCSS derle
    const result = sass.compile(inputPath);

    // Minify işlemi
    const minified = csso.minify(result.css).css;

    // Minify edilmiş CSS'i yaz
    fs.writeFileSync(outputPath, minified);
    console.log(`Başarıyla minify edildi: ${outputPath}`);
  } catch (err) {
    console.error(`Hata oluştu (${inputPath}):`, err.message);
  }
}

// Tüm dosyaları işleme al
function processFiles() {
  for (const [key, inputPath] of Object.entries(inputFiles)) {
    const outputPath = outputFiles[key];
    compileAndMinifyScss(inputPath, outputPath);
  }
}

// İşlemi başlat
processFiles();
