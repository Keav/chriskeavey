module.exports = function (grunt) {

    "use strict";

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['dist/css/custom**.*', 'dist/js/custom**.*'],
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.jpg', '**/*.png', '**/*.gif'],
                    dest: 'dist/'
                }, ]
            },
            test: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'dist/temp/',
                    src: ['**/*.jpg', '**/*.png', '**/*.gif'],
                    dest: 'dist/temp/min/'
                }, ]
            }
        },

        responsive_images: {
            resimg: {
                options: {
                    newFilesOnly: false,
                    engine: 'im',
                    quality: 80,
                    upscale: false,
                    sizes: [{
                        width: 320
                    }, {
                        width: 768
                    }, {
                        width: 1024
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.{jpg,gif,png}'],
                    dest: 'dist/temp/'
                }]
            },
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'src/index.html' // 'destination': 'source'

                }
            },
        },

        sass: {
            build: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none',
                    precision: 10,
                },
                files: {
                    'src/css/sass.css': 'src/scss/sass.scss' // 'destination': 'source'
                }
            }
        },

        uncss: {
            options: {
                ignore: [
                    /(#|\.)fancybox(\-[a-zA-Z]+)?/,
                    // needed for Bootstrap's transitions
                    ".fade",
                    ".fade.in",
                    ".collapse",
                    ".collapse.in",
                    ".navbar-collapse",
                    ".navbar-collapse.in",
                    ".collapsing",
                    // needed for the <noscript> warning; remove when fixed in uncss
                    ".alert-danger",
                    ".visible-xs",
                    ".noscript-warning",
                    ".fadeIn",
                    ".fade-in",
                    ".fade-out",
                ],
                report: 'min',
                timeout: 1000,
                ignoreSheets: ['/fonts.googleapis/'],
            },
            dist: {
                files: {
                    'dist/css/tidy.css': ['src/index.html']
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9']
            },

            // prefix all files
            files: {
                expand: true,
                flatten: true,
                cwd: 'src/css/',
                src: '*.css',
                dest: 'src/css/'
            }
        },

        uglify: {
            options: {
                preserveComments: 'some'
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

        cssmin: {
            options: {
                keepSpecialComments: 1
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

        hashres: {
            options: {
                encoding: 'utf8',
                fileNameFormat: '${name}.${hash}.${ext}',
                renameFiles: true
            },
            // This part doesn't actually do anything with the files due to renameFiles: false
            // It simply renames all references to these files WITHIN index.html, en masse
            // i.e. in index.html changes ref from style.css to syle.min.css
            min: {
                options: {
                    fileNameFormat: '${name}.min.${ext}',
                    renameFiles: false
                },
                src: [
                    'src/**/*.css', 'src/**/*.js', '!**/*.min.*'
                ],
                dest: 'dist/index.html',
            },
            // Once CSSMIN and UGLIFY have run, and the above hashres:min has completed on index.html, we are ready to do our actual cache busting and add a hash to the following files, also updating the reference in index.html
            prod: {
                options: {
                },
                src: [
                    'dist/css/custom.min.css',
                    'dist/js/custom.min.js'
                ],
                dest: 'dist/index.html',
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    timestamp: true,
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
            others: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['js/jquery**.min.js', '**/.htaccess'],
                    dest: 'dist/',
                }]
            },
        },

        shell: {
            bumpVersion: {
                command: 'npm version patch'
            }
        },

        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                // commitFiles: ['package.json'],
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false
            }
        },

        watch: {
            options: {
            //    livereload: true
            },
            sass: {
                files: ['src/scss/sass.scss'],
                tasks: ['sass'],
            },
            livereload: {
                files: ['src/**/*.html', 'src/**/*.css', 'src/**/*.js'],
                options: {livereload: true}
            }
        }

    });

    // Default task(s).
    grunt.registerTask('default', ['watch']);

    // Build for Staging
    grunt.registerTask('build', ['clean', 'autoprefixer', 'newer:imagemin:dist', 'htmlmin', 'newer:uglify', 'newer:cssmin', 'hashres:min', 'newer:copy', 'hashres:prod']);

    // Bump release version numbers
    grunt.registerTask('release', ['bump:major']);

    grunt.registerTask('code', ['clean', 'newer:htmlmin', 'newer:uglify', 'newer:cssmin', 'newer:copy', 'hashres']);

    // Interim Deployment
    grunt.registerTask('deploy', ['clean', 'newer:imagemin', 'htmlmin', 'newer:uglify', 'newer:cssmin', 'newer:copy', 'hashres']);

    grunt.registerTask('copysrc', ['clean', 'copy']);

};
