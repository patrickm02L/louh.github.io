'use strict';

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
        assets: '_assets',
        data:   'config.json',
        layout: '_layouts/default.hbs'
      },
      site: {
        options: {

        },
        files: {
          'index.html': ['_layouts/index.hbs']
        }
      },
      resume: {
        files: {
          'resume/index.html': ['_layouts/resume.hbs']
        }
      },
      portfolio: {
        options: {
          layout: '_layouts/project.hbs',
          partials: '_partials/**/*.hbs' 
        },
        files: {
          'portfolio/': ['portfolio/**/*.hbs' ]
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
  grunt.loadNpmTasks('grunt-newer')
  grunt.loadNpmTasks('assemble')

  grunt.registerTask('build', ['sass'])
  grunt.registerTask('assemble', ['newer:assemble'])
  grunt.registerTask('default', ['build', 'watch'])
  
}
