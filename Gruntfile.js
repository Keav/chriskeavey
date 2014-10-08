module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['dist/*']
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.jpg', '**/*.png', '**/*.gif'],
            dest: 'dist/'
          },
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
        src: ['src/index.html']
      }
    },

    htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                   // Dictionary of files
        'dist/index.html': 'src/index.html'     // 'destination': 'source'

      }
    },
  },

    sass: {
    build: {
        files: {
            'build/css/master.css': 'assets/sass/master.scss'
        }
      }
    },

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
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.css', '!**/*.min.css', '!**/*.map'],
          dest: 'dist/',
          ext: '.min.css',
          extDot: 'last'
        }]
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      uses_defaults: ['src/js/custom.js', 'Gruntfile.js'],
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'dist/',
          ext: '.min.js',
          extDot: 'last'
        }]
      }
    },

    hashres: {
      options: {
        encoding: 'utf8',
        fileNameFormat: '${name}.${hash}.${ext}',
        renameFiles: true
      },
      min: {
        // Specific options, override the global ones
        options: {
         // You can override encoding, fileNameFormat or renameFiles
         fileNameFormat: '${name}.min.${ext}',
        renameFiles: false
        },
        // Files to hash
        src: [
          // WARNING: These files will be renamed!
          'src/**/*.css', 'src/**/*.js', '!**/*.min.*'],
        // File that refers to above files and needs to be updated with the hashed name
        dest: 'dist/index.html',
      },
      prod: {
        // Specific options, override the global ones
        options: {
         // You can override encoding, fileNameFormat or renameFiles
        },
        // Files to hash
        src: [
          // WARNING: These files will be renamed!
          'dist/css/custom.min.css',
          'dist/js/custom.min.js'],
        // File that refers to above files and needs to be updated with the hashed name
        dest: 'dist/index.html',
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [
                '**/*',
                '!**/*.css',
                '!**/*.js',
                '!**/*.html',
                '!**/*.scss',
                '!**/*.less',
                '!**/*.php',
                '!**/*.map',
                '!**/*.jpg',
                '!**/*.png',
                '!**/*.gif',
                '!**/less/**',
                '!**/scss/**'
                ],
          dest: 'dist/',
        }]
      },
      jquery: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['js/jquery**.min.js'],
          dest: 'dist/',
        }]
      },
    },

    shell: {
      bumpVersion: {
        command: 'npm version patch'
      }
    },

    watch: {
      proj: {
        files: ['**/*'],
        tasks: ['all']
      },
    }

  });

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  
  // HTML tasks.
  grunt.registerTask('buildhtml',  ['htmlhint']);

  // CSS tasks.
  grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
  
  // Cache busting tasks.
  // grunt.registerTask('cachebust', ['cachebreaker', 'hash']);

  // Bump release version numbers
  grunt.registerTask('release', ['shell:bumpVersion']);

  grunt.registerTask('distcode', ['clean', 'htmlmin', 'uglify', 'cssmin', 'hashres', 'copy']);

  // Interim Deployment
  grunt.registerTask('all', ['clean', 'imagemin', 'htmlmin', 'uglify', 'cssmin', 'hashres', 'copy']);

  grunt.registerTask('copysrc', ['clean', 'copy']);

};