"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sass_1 = __importDefault(require("sass"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csso_1 = __importDefault(require("csso"));
// Kullanıcı yapılandırmasını işlemek için fonksiyon
function processConfig() {
    const configPath = path_1.default.join(process.cwd(), "4cekirdek.config.ts");
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
    if (fs_1.default.existsSync(configPath)) {
        userConfig = require(configPath).default || {};
    }
    // Varsayılan yapılandırmayı kullanıcı yapılandırmasıyla birleştir
    const mergedConfig = Object.assign(Object.assign({}, defaultConfig), userConfig);
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
// SCSS giriş dosyaları
const inputFile = path_1.default.join(__dirname, "src/index.scss");
// CSS çıkış dosyaları
const outputFile = path_1.default.join(__dirname, "index.css");
// SCSS derleme ve minify etme fonksiyonu
function compileAndMinifyScss() {
    try {
        // Kullanıcı yapılandırmasını SCSS değişkenlerine çevir
        const userVariables = processConfig();
        // SCSS derle
        const result = sass_1.default.compile(inputFile);
        // CSS'i minify et
        const minified = csso_1.default.minify(result.css).css;
        // Minify edilmiş CSS'i çıkış dosyasına yaz
        fs_1.default.writeFileSync(outputFile, minified);
        console.log(`Başarıyla derlendi ve minify edildi: ${outputFile}`);
    }
    catch (err) {
        console.error(`Hata oluştu (${inputFile}):`, err === null || err === void 0 ? void 0 : err.message);
    }
}
// İşlemi başlat
compileAndMinifyScss();
