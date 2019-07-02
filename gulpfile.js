const gulp = require("gulp");
const sass = require("gulp-sass");
const del = require("del");
const browserSync = require("browser-sync").create();

function style() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./src/css"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch("./src/scss/**/*.scss", style);
  gulp.watch("./src/**/*.html", browserSync.reload);
  gulp.watch("./src/js/**/*.js", browserSync.reload);
}

function copyToDist() {
  del.sync("dist/");
  return gulp.src(["./src/**/*.*", "!./src/scss/**"]).pipe(gulp.dest("dist"));
}

function watchDist() {
  browserSync.init({
    server: "./dist"
  });
}
exports.style = style;
exports.watch = watch;
exports.build = gulp.series(style, copyToDist, watchDist);
