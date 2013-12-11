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
        partials:  'templates/partials/**/*.hbs'
      },
      main: {
        files: {
          'index.html': 'templates/layouts/main.hbs'
        }
      },
      resume: {
        files: {
          'resume/index.html': 'templates/layouts/resume.hbs'
        }
      },
      error: {
        files : {
          '404.html': 'templates/layouts/404.hbs'
        }
      },
      portfolio: {
        files: {
          'portfolio/<%= portfolio.item.id %>/index.html': 'templates/layouts/project.hbs'
        }
      }
    },

    watch: {
      grunt: {
        files: 'Gruntfile.js',
        tasks: ['sass']
      },
      sass: {
        files: 'stylesheets/**/*.scss',
        tasks: ['sass']
      },
      assemble: {
        files: ['templates/**/*.hbs', 'data/portfolio.json'],
        tasks: ['assemble:main', 'assemble:resume', 'assemble:error']
      }
    }
  })

  grunt.loadNpmTasks('grunt-sass')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('assemble')

  grunt.registerTask('build', ['sass', 'assemble:main', 'assemble:resume', 'assemble:error', 'build-portfolio'])
  grunt.registerTask('default', ['build', 'watch'])

  grunt.registerTask('queue', function (id) {
    var portfolio = grunt.config.get('portfolio')
    var projectFound

    for (var i = 0; i < portfolio.items.length; i++) {
      if (portfolio.items[i].id == id) {
        grunt.config.set('portfolio.item', portfolio.items[i])
        grunt.task.run('assemble:portfolio:' + id)
        projectFound = true
        break
      }
    }
    if (projectFound !== true) {
      grunt.log.error('Project \'' + id + '\' does not exist. Aborting task...')
    }
  })

  grunt.registerTask('build-portfolio', function () {
    var portfolio = grunt.config.get('portfolio')

    for (var i = 0; i < portfolio.items.length; i++) {
      grunt.task.run('queue:' + portfolio.items[i].id)
    }
  })
  
}
