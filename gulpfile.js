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

gulp.task('bundle', function () {
  return gulp.src('./bundle.config.js')
    .pipe(debug({ title: '[bundle]' }))
    .pipe(bundle())
    .pipe(gulp.dest('./dist'));
});

gulp.task('templates', function () {
  return gulp.src('src/templates/**/*.html')
    .pipe(debug({ title: '[templates]' }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(angularTemplateCache({
      module: 'Spa'
    }))
    .pipe(gulp.dest('./target/templates'));
});

function prepareTemplates() {
  return gulp.src('src/templates/**/*.html').pipe(debug({ title: 'template_cache' })).pipe(angularTemplateCache({ module: 'Spa' }));
}

const prepareTemplatesX = () => {
  return gulp.src('src/templates/**/*.html').pipe(debug({title: 'template_cache'})).pipe(angularTemplateCache({module: 'Spa'}))
};

gulp.task('vendor.css', function () {
  return gulp.src([
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
    './node_modules/bootstrap/dist/css/bootstrap.css'
  ])
    .pipe(debug({ title: 'vendor.css' }))
    .pipe(less())
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
});

gulp.task('main.css', function () {
  return gulp.src([
    './src/css/**/*.*'
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
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js'
    ])
    .pipe(debug({ title: 'vendor.js' }))
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
})

gulp.task('main.js', function() {
  return gulp.src(['src/scripts/**/*.js'])
    .pipe(debug({ title: 'main.js' }))
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['vendor.js', 'vendor.css', 'main.js', 'main.css']);
// gulp.task('default', function () {
//   runSequence('main.js');
// });