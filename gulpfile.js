var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var nodemon = require('nodemon');

var bundler = watchify(browserify('./assets/scripts/index.js', watchify.args));

gulp.task('scripts', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./public'));
}

function styler() {
  return gulp.src('./assets/styles/style.css')
    .pipe(gulp.dest('./public'));
}

gulp.task('styles', function () {
  gulp.watch('./assets/styles/style.css', styler);
  return styler()
});

gulp.task("default", ["scripts", "styles"], function() {
  nodemon({
    "script": "app.js",
    "ignore": ['./assets/', './public/']
  });
});
