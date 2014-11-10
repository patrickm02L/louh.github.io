'use strict';

var gulp          = require('gulp')

var fs            = require('fs'),
    del           = require('del'),
    assemble      = require('gulp-assemble'),
    autoprefix    = require('gulp-autoprefixer'),
    cssimport     = require('gulp-cssimport'),
    debug         = require('gulp-debug'),
    livereload    = require('gulp-livereload'),
    minifyCSS     = require('gulp-minify-css'),
    htmlmin       = require('gulp-htmlmin'),
    rename        = require('gulp-rename'),
    sass          = require('gulp-sass'),
    shell         = require('gulp-shell')

var portfolio     = JSON.parse(fs.readFileSync('data/portfolio.json'))

// Default task
// Cleans the destination files first
// Then runs tasks concurrently
gulp.task('default', ['clean'], function () {
  // place code for your default task here
  gulp.start('css', 'assemble', 'watch', 'local-server')
})

gulp.task('clean', function () {
  // del('projects/**/*')
})

gulp.task('watch', function () {
  livereload.listen()

  gulp.watch('stylesheets/**/*.scss', ['css'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
    })

  gulp.watch('stylesheets/styles.css')
    .on('change', function (event) {
      livereload.changed('stylesheets/styles.css')
    })

  gulp.watch('templates/**/*.hbs', ['assemble'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
    })

  gulp.watch('**/*.html')
    .on('change', livereload.changed)

})

gulp.task('local-server', shell.task([
  'http-server',
  'open http://localhost:8080'
]))

gulp.task('css', function () {
  gulp.src('stylesheets/styles.scss')
    .pipe(sass())
    .pipe(autoprefix('last 2 versions'))
    .pipe(cssimport())
    .pipe(minifyCSS({ keepSpecialComments: 0 }))
    .pipe(gulp.dest('stylesheets/'))
})

// gulp-assemble (alpha)

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

  // TODO: Improve this once gulp-assemble is released

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

gulp.task('assemble-portfolio', function () {
  for (var project in portfolio.items) {
    assembleProject(project)
  }
})

gulp.task('portfolio', function (project) {
  // TODO: Individual portfolio building
})

function assembleProject (project) {
  if (portfolio.items[project]) {
    console.log('Building ' + project + '...')

    var options = {
      data:      portfolio.items[project],
      partials:  'templates/partials/**/*.hbs',
      layoutdir: 'templates/layouts',
      layout:    'default.hbs'
    }

    gulp.src('templates/pages/project.hbs')
      .pipe(assemble(options))
      .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, removeComments: true}))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('./projects/' + project))
  } else {
    console.error('Project \'' + project + '\' does not exist. Aborting task...')
  }
}
