const {src, dest, series, parallel, watch} = require("gulp")
const plugins = require("gulp-load-plugins")()
const browserify = require("browserify")
const sorce = require("vinyl-source-stream")
const buffer = require("vinyl-buffer")
const sass = plugins.sass(require("sass"))

const css = (cb) => {
    src("./sass/index.scss")
    .pipe(plugins.sourcemaps.init({loadMaps:true}))
    .pipe(sass().on("error", sass.logError))
    .pipe(plugins.postcss())
    .pipe(plugins.sourcemaps.write("./maps"))
    .pipe(dest("./assets/css"))
cb();
}

const js = (cb) => {
    return browserify({
        entries:["./dist/js/index.js"],
        debug:true
    }).bundle()
    .on("error", error => console.log(`browserify ${error}`))
    .pipe(sorce("index.js"))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps:true}))
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write("./maps"))
    .pipe(dest("./assets/js"))
    cb();
}

exports.default = series(parallel(js,css))