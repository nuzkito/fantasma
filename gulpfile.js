var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');

gulp.task('stylus', function () {
  gulp.src('src/stylus/index.styl')
    .pipe(stylus())
    .pipe(rename('blog.css'))
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('watch', function () {
  gulp.watch(['src/stylus/**/*.styl'], ['stylus']);
});

gulp.task('default', ['stylus', 'watch']);
