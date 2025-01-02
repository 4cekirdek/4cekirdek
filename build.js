const sass = require("sass");
const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "src/index.scss");

const outputFile = path.join(__dirname, "style.css");

function compileScss() {
  try {
    const result = sass.compile(inputFile);

    fs.writeFileSync(outputFile, result.css);
    console.log(`SCSS başarıyla ${outputFile} dosyasına dönüştürüldü!`);
  } catch (err) {
    console.error("Hata oluştu:", err.message);
  }
}

// Derleme işlemini başlat
compileScss();
