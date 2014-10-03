module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['dist']
    }

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['images/**/*.jpg'],
            dest: 'dist/',
            ext: '.jpg'
          },
          {
            expand: true,
            cwd: 'dist/',
            src: ['images/**/*.png'],
            dest: 'dist/',
            ext: '.png'
          }
        ]
      }
    },
    

    htmlhint: {
    build: {
        options: {
            'tag-pair': true,
            'tagname-lowercase': true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'doctype-first': true,
            'spec-char-escape': true,
            'id-unique': true,
            'head-script-disabled': true,
            'style-disabled': true
        },
        src: ['index.html']
      }
    }

    htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                   // Dictionary of files
        'dist/index.html': 'src/index.html',     // 'destination': 'source'
        'dist/contact.html': 'src/contact.html'
      }
    },
    dev: {                                       // Another target
      files: {
        'dist/index.html': 'src/index.html',
        'dist/contact.html': 'src/contact.html'
      }
    }
  },

    sass: {
    build: {
        files: {
            'build/css/master.css': 'assets/sass/master.scss'
        }
      }
    }

    cssc: {
    build: {
        options: {
            consolidateViaDeclarations: true,
            consolidateViaSelectors:    true,
            consolidateMediaQueries:    true
        },
        files: {
            'dist/css/master.css': 'src/css/master.css'
        }
      }
    },

    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'dist/css/custom.min.css' : ['src/css/custom.css'],
          'dist/css/animations.min.css' : ['src/css/animations.css']
        }
      }
    },

    jshint: {
       options: {
          "bitwise": true,
          "browser": true,
          "curly": true,
          "eqeqeq": true,
          "eqnull": true,
          "esnext": true,
          "immed": true,
          "jquery": true,
          "latedef": true,
          "newcap": true,
          "noarg": true,
          "node": true,
          "strict": false,
          "trailing": true,
          "undef": true,
          "globals": {
             "jQuery": true,
             "alert": true
          }
       },
       dist: ['Gruntfile.js','src/js/custom.js'
       ]
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'dist/js/custom.min.js' : 'src/js/custom.js'
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
      },
      js: {
          src: 'src/js/custom.custom',  //all your css that needs a hash appended to it
          dest: 'dist/js/' //where the new files will be created
      }
    },

    cachebreaker: {
      css: {
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
          },

      js: {
          options: {
              match: ['custom.js'],
              replacement: 'md5',
              position: 'filename',
              src: {
                  path: 'src/js/custom.js'
              }
          },
          files: {
              src: ['dist/index.html']
          }
      }
    },

    shell: {
      bumpVersion: {
        command: 'npm version patch'
      }
    },

    watch: {
      html: {
        files: ['index.html'],
        tasks: ['htmlhint']
      }
      js: {
        files: ['src/js/custom.js', 'src/owl-carousel/owl-carousel.js'],
        tasks: ['uglify']
      }
      css: {
        files: ['src/css/custom.css', 'src/owl-carousel/owl-carousel.css'],
        tasks: ['buildcss']
      }
    }

  });


  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-hash');
  // grunt.loadNpmTasks('grunt-cache-breaker');
  // grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  
  // CSS tasks.
  grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
  
  // Cache busting tasks.
  grunt.registerTask('cachebust', ['hash', 'cachebreaker']);

  // Bump release version numbers
  grunt.registerTask('release', ['shell:bumpVersion']); 

};