var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var critical = require('critical');
var browserSync = require('browser-sync');

gulp.task('css', function () {
  return gulp.src('src/stylus/index.styl')
    .pipe(stylus({
       "include css": true
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      remove: true
    }))
    .pipe(minifyCSS({
      debug: true,
      keepSpecialComments: 0,
      keepBreaks: true,
    }))
    .pipe(rename('blog.css'))
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('copystyles', function () {
  return gulp.src(['assets/css/blog.css'])
    .pipe(rename({
      basename: 'inline'
    }))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('critical', ['copystyles'], function () {
  critical.generate({
    base: './',
    src: 'partials/styles.html',
    css: 'assets/css/blog.css',
    dest: 'assets/css/inline.css',
    width: 320,
    height: 480,
    minify: true
  }, function(err, output){
    critical.inline({
      base: './',
      src: 'partials/styles.html',
      dest: 'partials/inline-styles.hbs',
      minify: true,
      extract: true
    });
  });
});

gulp.task('js', function () {
  return gulp.src([
      'src/js/lib/*.js',
      'src/js/*.js',
    ])
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'));
});

gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', ['css', 'js', 'lint'], function () {
  gulp.watch('src/stylus/**/*.styl', ['css', 'critical', browserSync.reload]);
  gulp.watch('src/js/**/*.js', ['js', browserSync.reload]);
  gulp.watch('src/js/*.js', ['lint']);
});

gulp.task('browser-sync', function() {
  browserSync({
    proxy: "http://localhost:2368"
  });
});

gulp.task('default', ['watch', 'browser-sync']);
