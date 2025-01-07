const sass = require("sass");
const fs = require("fs");
const path = require("path");
const csso = require("csso");

// Kullanıcı yapılandırmasını işlemek için fonksiyon
function processConfig() {
  const configPath = path.join(process.cwd(), "4cekirdek.config.ts");
  const defaultConfig = {
    colors: {
      primary: "#0d6efd",
      secondary: "#6c757d",
      success: "#198754",
      danger: "#dc3545",
      warning: "#ffc107",
      info: "#0dcaf0",
      light: "#f8f9fa",
      dark: "#212529",
    },
    spacers: [0, 4, 8, 16, 32, 64],
  };

  let userConfig = {};

  // Kullanıcının `4cekirdek.config.ts` dosyasını yükle
  if (fs.existsSync(configPath)) {
    userConfig = require(configPath).default || {};
  }

  // Varsayılan yapılandırmayı kullanıcı yapılandırmasıyla birleştir
  const mergedConfig = { ...defaultConfig, ...userConfig };

  // SCSS değişkenleri oluştur
  let scssVariables = "";

  // Renkleri SCSS formatına çevir
  Object.entries(mergedConfig.colors).forEach(([key, value]) => {
    scssVariables += `$${key}: ${value};\n`;
  });

  // Spacer'ları SCSS formatına çevir
  scssVariables += `$spacers: (${mergedConfig.spacers.join(", ")});\n`;

  return scssVariables;
}

// SCSS giriş ve CSS çıkış dosyaları
const inputFile = path.join(__dirname, "src/index.scss");
const outputFile = path.join(__dirname, "dist/index.css");

// SCSS derleme ve minify etme fonksiyonu
function compileAndMinifyScss() {
  try {
    // Kullanıcı yapılandırmasını SCSS değişkenlerine çevir
    const userVariables = processConfig();

    // SCSS dosyasını oku ve kullanıcı değişkenlerini ekle
    const scssContent = `${userVariables}\n${fs.readFileSync(
      inputFile,
      "utf8"
    )}`;

    // SCSS'i derle
    const result = sass.compileString(scssContent);

    // CSS'i minify et
    const minified = csso.minify(result.css).css;

    // Minify edilmiş CSS'i çıkış dosyasına yaz
    fs.writeFileSync(outputFile, minified);
    console.log(`Başarıyla derlendi ve minify edildi: ${outputFile}`);
  } catch (err) {
    console.error(`Hata oluştu (${inputFile}):`, err.message);
  }
}

// İşlemi başlat
compileAndMinifyScss();
