'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const mergeStream = require('merge-stream');
const path = require('path');

gulp.task('build:css', function () {
    const stylusStream = gulp.src('src/stylus/index.styl').pipe(stylus());
    const cssStream = gulp.src('node_modules/prismjs/themes/prism-okaidia.css');

    let plugins = [
        cssnano({
            autoprefixer: {
                browsers: ['last 2 versions'],
            },
        }),
    ];

    return mergeStream(cssStream, stylusStream)
        .pipe(postcss(plugins))
        .pipe(concat('blog.css'))
        .pipe(gulp.dest('assets/'));
});

gulp.task('build:js', function () {
    let jsFiles = [
        'node_modules/prismjs/prism.js',
        'node_modules/prismjs/components/prism-bash.js',
        'node_modules/prismjs/components/prism-clike.js',
        'node_modules/prismjs/components/prism-css.js',
        'node_modules/prismjs/components/prism-css-extras.js',
        'node_modules/prismjs/components/prism-git.js',
        'node_modules/prismjs/components/prism-javascript.js',
        'node_modules/prismjs/components/prism-json.js',
        'node_modules/prismjs/components/prism-jsx.js',
        'node_modules/prismjs/components/prism-markdown.js',
        'node_modules/prismjs/components/prism-markup.js',
        'node_modules/prismjs/components/prism-nginx.js',
        'node_modules/prismjs/components/prism-php.js',
        'node_modules/prismjs/components/prism-php-extras.js',
        'node_modules/prismjs/components/prism-stylus.js',
        'src/js/*.js',
    ];

    return gulp.src(jsFiles)
        .pipe(concat('blog.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/'));
});

gulp.task('build', ['build:css', 'build:js']);

gulp.task('watch', function () {
    gulp.watch('src/stylus/**/*.styl', ['build:css', browserSync.reload]);
    gulp.watch('src/js/**/*.js', ['build:js', browserSync.reload]);
});

gulp.task('browser-sync', function() {
    browserSync({
        proxy: 'http://localhost:2368',
        open: false,
    });
});

gulp.task('default', ['build', 'watch', 'browser-sync']);
