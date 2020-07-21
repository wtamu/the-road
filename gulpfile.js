var gulp = require('gulp'),
  sass = require('gulp-sass'),
  replace = require('gulp-replace'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  browserSync = require('browser-sync');

browserSync.init({
  injectChanges: true,
  server: './dist'
});

gulp.task('scss', function () {
  //root scss file (import all your partials into here)
  return gulp.src('./src/styles/styles.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    // Minification of CSS liquid files.
    .pipe(minifyCSS())
    // save the file to the dist directory
    .pipe(gulp.dest('./dist/'))
    // sync changes automatically to the browser (for watch)
    .pipe(browserSync.stream({ match: '**/*.css' }));
});


gulp.task('js', function () {
  // Will look for all js in the scripts directory
  return gulp.src([
    './src/scripts/utils.js',
    './src/scripts/static.js',
    './src/scripts/classes.js',
    './src/scripts/model.js',
    './src/scripts/**/*.js'
  ])
    // Clean up stuff
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(jshint())
    .pipe(uglify())
    // You can rename the js to fit your needs. 
    .pipe(concat('scripts.js'))
    // Save the file to the dist directory
    .pipe(gulp.dest('./dist/'))
    // sync changes automatically to the browser (for watch)
    .pipe(browserSync.stream({ match: '**/*.js' }));
});

gulp.task('html', function () {
  // Will look for all js in the scripts directory
  return gulp.src('./src/**/*.html')
    // Save the file to the dist directory
    .pipe(gulp.dest('./dist/'))
    // sync changes automatically to the browser (for watch)
    .pipe(browserSync.stream({ match: '**/*.html' }));
});

// Watches for changes in scss and js files
gulp.task('default', function () {
  gulp.watch('./src/styles/**/*.scss', gulp.series('scss'));
  gulp.watch('./src/scripts/**/*.js', gulp.series('js'));
  gulp.watch('./src/**/*.html', gulp.series('html'));
});


gulp.task('build', gulp.series('js', 'scss', 'html'));
