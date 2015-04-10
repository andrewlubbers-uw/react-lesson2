var gulp = require('gulp');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var gu = require('gulp-util');
var webpack = require('gulp-webpack');
var rename = require('gulp-rename');
var del = require('del');

var buildDir = "build";
var jsDir = buildDir + "/js";
var cssDir = buildDir + "/css";

/*
 * Removes the build directory.
 */
gulp.task('clean', function() {
    del([buildDir], function (err, deletedFiles) {
        if (deletedFiles && deletedFiles.length > 0) {
            gu.log('Removed: ', gu.colors.magenta(deletedFiles.join(', ')));
        }
    });
});

/*
 * Concatenates CSS into a single file which is output to the build directory.
 */
gulp.task('css', function() {
   return gulp.src(['src/css/*.css'])
            .pipe(concat('app.css'))
            .pipe(gulp.dest(cssDir));
});

/*
 * Copies scripts to the build directory.
 */
gulp.task('scripts', function() {
   return gulp.src(['src/js/*.jsx', 'src/js/**/*.js'])
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(rename('main.js'))
    .pipe(gulp.dest(jsDir));
});

/**
 * Reload on change ...
 */
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/js/**/*.jsx', ['scripts']);
    gulp.watch('src/js/**/*.js', ['scripts']);  
    gulp.watch('src/css/**/*.css', ['css']);
});

/**
 * Define the default target.
 */
gulp.task('default', ['scripts', 'css']);
