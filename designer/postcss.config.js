module.exports = {
  plugins: [
    require("postcss-import"),
    require("autoprefixer"),
    purgecss({
      content: ["./**/*.{js,jsx,ts,tsx,html}"],
      safelist: [],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
