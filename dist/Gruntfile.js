module.exports = function (grunt) {
  // time
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        sourceMap: true
      },

      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.min.css': 'source/scss/app.scss'
        }
      }
    },

    copy: {
      slickfonts: {
        expand: true,
        cwd: 'node_modules/slick-carousel/slick/',
        src: ['fonts/**','ajax-loader.gif'],
        flatten: 'true',
        dest: 'fonts/slickfonts'
      },

      iconfonts: {
        expand: true,
        cwd: 'node_modules/@fortawesome/fontawesome-free/webfonts',
        src: ['*.woff', '*.woff2'],
        flatten: 'true',
        dest: 'fonts/'
      },

    },
    'string-replace': {
      fontawesome: {
        files: {
          'node_modules/@fortawesome/fontawesome-free/scss/_variables.scss': 'node_modules/@fortawesome/fontawesome-free/scss/_variables.scss'
        },
        options: {
          replacements: [
            {
              pattern: '../webfonts',
              replacement: '../fonts'
            }
          ]
        }
      },
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
        sourceMap :true,
      },
      dist: {
        src: [

          //'node_modules/inview/inview.js',

          // Include your own custom scripts (located in the custom folder)
          'source/js/custom.js',  

        ],
        // Finally, concatinate all the files above into one single file
        dest: 'js/build.min.js',
      },
    },

    uglify: {
      options : {
        sourceMap : true,
        sourceMapIncludeSources : true,
        sourceMapIn : 'js/build.min.js.map'
      },
      my_target: {
        files: {
          'js/build.min.js': ['js/build.min.js']
        }
      }
    },

    watch: {
      options: {
        spawn: false
      },

      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'source/scss/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true,
        }
      },
      js: {
        files: 'source/js/**/*.js',
        tasks: ['concat', 'uglify'],
        options: {
          livereload: true,
        }
      },

      all: {
        files: '**/*.php',
        options: {
          livereload: true,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('build', ['copy', 'string-replace:fontawesome', 'sass', 'concat', 'uglify']);
  grunt.registerTask('default', ['watch']);
};