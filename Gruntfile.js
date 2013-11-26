'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          includePaths: ['stylesheets/', 'stylesheets/foundation/'],
          outputStyle: 'compressed'
        },
        files: {
          'stylesheets/styles.css': 'stylesheets/styles.scss'
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'stylesheets/**/*.scss',
        tasks: ['sass']
      }
    }
  })

  grunt.loadNpmTasks('grunt-sass')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('build', ['sass'])
  grunt.registerTask('default', ['build','watch'])
  
}
