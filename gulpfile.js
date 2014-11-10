'use strict';

var gulp          = require('gulp')

var del           = require('del'),
    assemble      = require('gulp-assemble'),
    autoprefix    = require('gulp-autoprefixer'),
    cssimport     = require('gulp-cssimport'),
    debug         = require('gulp-debug'),
    livereload    = require('gulp-livereload'),
    minifyCSS     = require('gulp-minify-css'),
    htmlmin       = require('gulp-htmlmin'),
    rename        = require('gulp-rename'),
    sass          = require('gulp-sass')

// Default task
// Cleans the destination files first
// Then runs tasks concurrently
gulp.task('default', ['clean'], function () {
  // place code for your default task here
  gulp.start('css', 'assemble', 'watch')
})

gulp.task('clean', function () {
  // del('projects/**/*')
})

gulp.task('watch', function () {
  livereload.listen()

  var watcher = gulp.watch('stylesheets/**/*.scss', ['css'])

  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
    livereload.changed
  })

})

gulp.task('css', function () {
  gulp.src('stylesheets/styles.scss')
    .pipe(sass())
    .pipe(autoprefix('last 2 versions'))
    .pipe(cssimport())
    .pipe(minifyCSS({ keepSpecialComments: 0 }))
    .pipe(debug({ verbose: false }))
    .pipe(gulp.dest('stylesheets/'))
})

// gulp-assemble

var options = {
  assets:    '',
  partials:  'templates/partials/**/*.hbs',
  layoutdir: 'templates/layouts',
  layout:    'default.hbs'
}

gulp.task('assemble', function () {

  // Note: have to individually set up destination names and paths
  // even if the destination filename is the same as the source template
  // Because otherwise Assemble injects the index.hbs content into
  // a page twice. Is this an assemble issue or a gulp issue?

  gulp.src('templates/pages/index.hbs')
    .pipe(assemble(options))
    .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, removeComments: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))

  gulp.src('templates/pages/404.hbs')
    .pipe(assemble(options))
    .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, removeComments: true}))
    .pipe(rename('404.html'))
    .pipe(gulp.dest('./'))

  gulp.src('templates/pages/resume.hbs')
    .pipe(assemble(options))
    .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, removeComments: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./resume/'))
})


