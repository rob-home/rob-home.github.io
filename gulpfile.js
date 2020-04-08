const gulp = require('gulp');
const bundle = require('gulp-bundle-assets');
const debug = require('gulp-debug');
const angularTemplateCache = require('gulp-angular-templatecache');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const addStream = require('add-stream');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const ngAnnotate = require('gulp-ng-annotate');
const less = require('gulp-less');
const uglify = require('gulp-uglify');

function prepareTemplates() {
  return gulp.src('site/**/*.html').pipe(debug({ title: 'template_cache' })).pipe(angularTemplateCache({ module: 'Spa' }));
}

gulp.task('vendor.css', function () {
  return gulp.src([
    './resources/dev/bootstrap/bootstrap.less',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
  ])
    .pipe(debug({ title: 'vendor.css' }))
    .pipe(less())
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
});

gulp.task('css', function () {
  return gulp.src([
    './resources/css/**/*.*'
  ])
    .pipe(debug({ title: 'main.css' }))
    .pipe(less())
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
});

gulp.task('vendor.js', function() {
  return gulp.src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/angular/angular.js',
    './node_modules/angular-route/angular-route.js',
    './node_modules/angular-filter/dist/angular-filter.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
    './node_modules/moment/moment.js',
    './node_modules/numeral/numeral.js'
    ])
    .pipe(debug({ title: 'vendor.js' }))
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('site', function() {
  return gulp.src(['site/**/*.js'])
    .pipe(debug({ title: 'main.js' }))
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('vendor.fonts', function () {
  return gulp.src([
    './node_modules/bootstrap/fonts/**/*'
  ])
    .pipe(debug({ title: 'vendor.fonts' }))
    .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('index.html', function() {
  return gulp.src(['index.html'])
    .pipe(debug({ title: 'index.html' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['vendor.js', 'vendor.css', 'vendor.fonts', 'site', 'css', 'index.html']);
