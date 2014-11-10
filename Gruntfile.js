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
      portfolio: {
        files: {
          'projects/<%= portfolio.item.id %>/index.html': 'templates/layouts/project.hbs'
        }
      }
    }
  })

  grunt.loadNpmTasks('assemble')

  grunt.registerTask('default', ['build-portfolio'])

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
