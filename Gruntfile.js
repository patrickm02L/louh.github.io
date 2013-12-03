'use strict'

var path = require('path')

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['stylesheets/', 'stylesheets/foundation/'],
        outputStyle: 'compact'
      },
      site: {
        files: {
          'stylesheets/styles.css': 'stylesheets/styles.scss'
        }
      }
    },

    assemble: {
      options: {
        assets:    '',
        layoutdir: 'templates/layouts',
        layout:    'default.hbs',
        partials:  'templates/partials/**/*.hbs',
      },
/*
      site: {
        options: {

        },
        files: {
          'index.html': ['index.hbs']
        }
      },
*/
      resume: {
        files: {
          'resume/index.html': ['templates/layouts/resume.hbs']
        }
      }
      /*,
      portfolio: {
        options: {
          assets:   'portfolio/'
          data:     'portfolio.json',
          layout:   'project.hbs',
        },
        files: {
          'portfolio/': ['portfolio//*.hbs' ]
        }
      }*/
    },

    watch: {
      grunt: { 
        files: ['Gruntfile.js'],
        tasks: ['sass']
      },

      sass: {
        files: 'stylesheets/**/*.scss',
        tasks: ['sass']
      }
    }
  })

  grunt.loadNpmTasks('grunt-sass')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-newer')
  grunt.loadNpmTasks('assemble')

  grunt.registerTask('build', ['sass'])
  grunt.registerTask('make', ['assemble'])
  grunt.registerTask('default', ['build', 'watch'])
  
}
