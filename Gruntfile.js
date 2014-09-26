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

    hash: {
      options: {
          //mapping: 'examples/assets.json', //mapping file so your server can serve the right files
          //srcBasePath: 'examples/', // the base Path you want to remove from the `key` string in the mapping file
          //destBasePath: 'out/', // the base Path you want to remove from the `value` string in the mapping file
          //flatten: false, // Set to true if you don't want to keep folder structure in the `key` value in the mapping file
          hashLength: 10, // hash length, the max value depends on your hash function
          hashFunction: function(source, encoding){ // default is md5
              return require('crypto').createHash('md5').update(source, encoding).digest('hex');
          }
      },
      css: {
          src: 'src/css/custom.css',  //all your css that needs a hash appended to it
          dest: 'dist/css/' //where the new files will be created
      }
    },

    cachebreaker: {
      dev: {
          options: {
              match: ['custom.css'],
              replacement: 'md5',
              position: 'filename',
              src: {
                  path: 'src/css/custom.css'
              }
          },
          files: {
              src: ['dist/index.html']
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
  grunt.loadNpmTasks('grunt-hash');
  grunt.loadNpmTasks('grunt-cache-breaker');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

  // My tasks.
  grunt.registerTask('versioning', ['hash', 'cachebreaker']);

};