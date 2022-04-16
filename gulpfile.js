const { src, dest, series, parallel, watch } = require("gulp");
const plugins = require("gulp-load-plugins")();
const browserify = require("browserify");
const sorce = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const sass = plugins.sass(require("sass"));
const serv = require("./live-server");
const cssPath = "./sass/index.scss";
const jsPath = "./js/index.js";

const css = (cb) => {
  src(cssPath).pipe(
      plugins.sourcemaps.init({
        loadMaps: true,
      }))
    .pipe(sass().on("error", sass.logError))
    .pipe(plugins.postcss())
    .pipe(plugins.sourcemaps.write("./maps"))
    .pipe(dest("./dist/assets/css/"));
  cb();
};

const tsc = (cb) => {
  return plugins.run("tsc").exec();
  cb();
};

const js = (cb) => {
  return browserify({
    entries: [jsPath],
    debug: true,
  })
    .bundle()
    .on("error", (error) => console.log(`browserify ${error}`))
    .pipe(sorce("index.js"))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write("./maps"))
    .pipe(dest("./dist/assets/js"));
  cb();
};

exports.default = parallel(js, css);
exports.watch = () => {
  serv.default();
  watch("./sass/**/*.scss", css);
  watch("./ts/**/*.tsx", series(tsc, js, css));
  watch("./dist/*.html", series(tsc, js, css));
};
