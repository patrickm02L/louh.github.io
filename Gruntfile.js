'use strict'

module.exports = function (grunt) {
  grunt.initConfig({

    portfolio: grunt.file.readJSON('data/portfolio.json'),

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
      assemble: {
        files: ['templates/**/*.hbs', 'data/portfolio.json'],
        tasks: ['assemble:main', 'assemble:resume', 'assemble:error']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('assemble')

  grunt.registerTask('build', ['assemble:main', 'assemble:resume', 'assemble:error', 'build-portfolio'])
  grunt.registerTask('default', ['build'])

  grunt.registerTask('queue', function (project) {
    var portfolio = grunt.config.get('portfolio')

    if (portfolio.items[project]) {
      grunt.config.set('portfolio.item', portfolio.items[project])
      grunt.task.run('assemble:portfolio:' + project)
    }
    else {
      grunt.log.error('Project \'' + project + '\' does not exist. Aborting task...')
    }
  })

  grunt.registerTask('build-portfolio', function () {
    var portfolio = grunt.config.get('portfolio')

    for (var project in portfolio.items) {
      grunt.task.run('queue:' + project)
    }
  })

}
