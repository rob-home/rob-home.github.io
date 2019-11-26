const less = require('gulp-less');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const lazypipe = require('lazypipe');

function stringEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isLessFile(file) {
  return stringEndsWith(file.relative, 'less');
}

function isJsFile(file) {
  return stringEndsWith(file.relative, 'js');
}

const scriptTransforms = lazypipe()
  .pipe(function () {
    return gulpIf(isJsFile, uglify());
  });

const styleTransforms = lazypipe()
  .pipe(function () {
    return gulpIf(isLessFile, less());
  });

module.exports = {
  bundle: {
    main: {
      scripts: [
        './src/scripts/**/*.js',
        './target/templates/**/*.js'
      ],
      styles: [
        './src/css/**/*.less',
        './src/css/**/*.css'
      ],
      options: {
        rev: false,
        transforms: {
          // scripts: scriptTransforms,
          styles: styleTransforms
        },
        dest: './scripts'
      }
    },
    vendor: {
      scripts: [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-route/angular-route.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js'
      ],
      styles: [
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
        './node_modules/bootstrap/dist/css/bootstrap.css'
      ],
      options: {
        rev: false,
        transforms: {
          styles: styleTransforms
        },
        dest: './scripts'
      }
    }
  },
  copy: [
    {
      src: 'index.html'
    },
    {
      src: './src/resources/**/*.*',
      base: './src'
    },
    {
      src: './node_modules/bootstrap/dist/fonts/**/*.*',
      base: './node_modules/bootstrap/dist'
    }
  ]
};
