'use strict'

module.exports = function (grunt) {
  grunt.initConfig({

    portfolio: grunt.file.readJSON('data/portfolio.json'),

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
      main: {
        files: {
          'index.html': ['templates/layouts/main.hbs']
        }
      },
      resume: {
        files: {
          'resume/index.html': ['templates/layouts/resume.hbs']
        }
      },
      error :{
        files : {
          '404.html': ['templates/layouts/404.hbs']
        }
      },
      portfolio: {
        options: {
          data: 'portfolio.json',
        },
        files: {
          'portfolio/': ['templates/layouts/project.hbs']
        }
      }
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
  grunt.loadNpmTasks('assemble')

  grunt.registerTask('build', ['sass'])
  grunt.registerTask('make', ['assemble'])
  grunt.registerTask('default', ['build', 'watch'])

  grunt.registerTask('haha', function () {
    var portfolio = grunt.config.get(['portfolio'])
    for (var i = 0; i < portfolio.items.length; i++) {
      grunt.log.write(portfolio.items[i].id + '\n')
    }
  })
  
}
