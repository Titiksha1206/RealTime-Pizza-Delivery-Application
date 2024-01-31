let mix = require("laravel-mix");

// first parameter means konsi file aapko compile krni h.
// second parameter means kaha pr aapko usko store krna h, compile hone ke baad.
mix
  .js("resources/js/app.js", "public/js/app.js")
  .sass("resources/scss/app.scss", "public/css/app.css");

mix.babelConfig({
  plugins: ["@babel/plugin-proposal-class-properties"],
});
