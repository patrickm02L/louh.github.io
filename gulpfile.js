var gulp = require('gulp')

var del           = require('del'),
    autoprefix    = require('gulp-autoprefixer'),
    cssimport     = require('gulp-cssimport'),
    debug         = require('gulp-debug'),
    entityconvert = require('gulp-entity-convert'),
    livereload    = require('gulp-livereload'),
    minifyCSS     = require('gulp-minify-css'),
    sass          = require('gulp-sass')

// Default task
// Cleans the destination files first
// Then runs tasks concurrently
gulp.task('default', ['clean'], function () {
  // place code for your default task here
  gulp.start('css', 'js')

// var watcher = gulp.watch('src/stylesheets/**/*.scss', ['css', 'reload']);
/*
watcher.on('change', function (event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
*/
})

gulp.task('clean', function () {
  del('./portfolio/**/*')
})

gulp.task('css', function () {
  gulp.src('./stylesheets/styles.scss')
    .pipe(entityconvert({ type: 'css' }))
    .pipe(sass())
    .pipe(autoprefix('last 2 versions'))
    .pipe(cssimport())
    .pipe(minifyCSS({ keepSpecialComments: 0 }))
    .pipe(debug({ verbose: false }))
    .pipe(gulp.dest('./stylesheets'))
//        .pipe(livereload());
})
