const gulp = require('gulp');
const bundle = require('gulp-bundle-assets');
const debug = require('gulp-debug');
const angularTemplateCache = require('gulp-angular-templatecache');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');

function testX() {
  return gulp.src('./').pipe(debug({ title: '[test]' }));
}

const test1 = () => gulp.src('./').pipe(debug({ title: '[test1]' }));
const test2 = () => gulp.src('./').pipe(debug({ title: '[test2]' }));

gulp.task('bundle', function () {
  return gulp.src('./bundle.config.js')
    .pipe(debug({ title: '[bundle]' }))
    .pipe(bundle())
    .pipe(gulp.dest('./dist'));
});

gulp.task('templates', function () {
  return gulp.src('src/templates/**/*.html')
    .pipe(debug({ title: '[templates]' }))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(angularTemplateCache({
      module: 'Spa'
    }))
    .pipe(gulp.dest('./target/templates'));
});

gulp.task('default', function () {
  runSequence('templates', 'bundle');
});