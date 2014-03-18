var gulp = require('gulp');

var sass       = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    cssimport  = require('gulp-cssimport'),
    minifyCSS  = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    clean      = require('gulp-clean');

// var watcher = gulp.watch('src/stylesheets/**/*.scss', ['css', 'reload']);
/*
watcher.on('change', function (event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
*/

// Default task
// Cleans the destination files first
// Then runs tasks concurrently
gulp.task('default', ['clean'], function () {
    // place code for your default task here
    gulp.start('css', 'js');
});

gulp.task('clean', function () {
    gulp.src('./portfolio/**/*', { read: false })
        .pipe(clean());
});

gulp.task('css', function () {
    gulp.src('./stylesheets/styles.scss')
        .pipe(sass())
        .pipe(autoprefix('last 2 versions'))
        .pipe(cssimport())
        .pipe(minifyCSS({ keepSpecialComments: 0 }))
        .pipe(gulp.dest('./stylesheets'));
//        .pipe(livereload());
});
