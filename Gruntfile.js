module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    cssmin: {
      add_banner: {
        options: {
          banner: '/* My minified css file */'
        },
        files: {
          'dist/css/custom.min.css' : ['src/css/custom.css'],
          'src/css/custom.min.css' : ['src/css/custom.css']
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
	  build: {
	    files: {
	     	'dist/js/custom.min.js' : 'src/js/custom.js',
	     	'src/js/custom.min.js' : 'src/js/custom.js',
	    }
	  }
    },

    watch: {
      files: ['src/js/custom.js', 'src/css/custom.css'],
      tasks: ['uglify', 'cssmin'],
    }

  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};