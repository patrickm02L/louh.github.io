'use strict'

var gulp = require('gulp')

var fs = require('fs')
var del = require('del')
var assemble = require('gulp-assemble')
var autoprefix = require('gulp-autoprefixer')
var cssimport = require('gulp-cssimport')
var livereload = require('gulp-livereload')
var minifyCSS = require('gulp-minify-css')
var htmlmin = require('gulp-htmlmin')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var shell = require('gulp-shell')

gulp.task('default', ['css', 'assemble', 'watch'], function () {
  gulp.start('local-server')
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

  gulp.watch('data/portfolio.json', ['assemble-projects'])
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
gulp.task('assemble', function () {
  // Note: have to individually set up destination names and paths
  // even if the destination filename is the same as the source template
  // Because otherwise Assemble injects the index.hbs content into
  // a page twice. Is this an assemble issue or a gulp issue?

  // TODO: Improve this once gulp-assemble is released
  var options = {
    assets: '',
    partials: 'templates/partials/**/*.hbs',
    layoutdir: 'templates/layouts',
    layout: 'default.hbs'
  }

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

  gulp.start('assemble-projects')
})

gulp.task('assemble-projects', function () {
  var portfolio = JSON.parse(fs.readFileSync('data/portfolio.json'))

  // Clean out projects folder first; this removes dead projects
  del('projects/**/*', function (err) {
    if (err) {
      console.error(err)
    }
    for (var project in portfolio.items) {
      assembleProjectPage(portfolio.items[project])
    }
  })
})

gulp.task('project', function (project) {
  // TODO: Individual portfolio building
})

function assembleProjectPage (projectData) {
  console.log('Building ' + projectData.name + '...')

  var options = {
    data: projectData,
    partials: 'templates/partials/**/*.hbs',
    layoutdir: 'templates/layouts',
    layout: 'default.hbs'
  }

  gulp.src('templates/pages/project.hbs')
    .pipe(assemble(options))
    .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, removeComments: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./projects/' + projectData.id))
}
