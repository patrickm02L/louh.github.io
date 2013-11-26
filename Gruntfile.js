'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          includePaths: ['stylesheets/'],
          outputStyle: 'compressed'
        },
        files: {
          'stylesheets/styles.css': 'stylesheets/styles.scss'
        }
      }
    }
  })

  grunt.registerTask('default', ['sass'])
  grunt.loadNpmTasks('grunt-sass')
  
}