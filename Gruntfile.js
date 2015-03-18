module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'src/**/*.js']
    },

    copy: {
      main: {
        files: [
          //imgs
          {
            expand: true,
            src: ['imgs/*'],
            dest: 'build/'
          },
          // lib
          {
            expand: true,
            src: ['lib/**'],
            dest: 'build/'
          },
          //css js
          {
            expand: true,
            src: ['src/**/*.js', 'src/**/*.css'],
            dest: 'build/'
          },
          // html
          {
            expand: true,
            src: ['./*.html'],
            dest: 'build/'
          },
        ]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'min'
      },
      // build: {
      //   src: 'src/**/*.js',
      //   dest: 'build/<%= pkg.name %>.min.js'
      // },
      my_target: {
        files: [{
          expand: true,
          cwd: 'build/src',
          src: '**/*.js',
          dest: 'build/src'
        }]
      }
    },

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        src: 'src/**/*.less',
        desc: 'bbb/'
      }
    },

    watch: {
      styles: {
        files: ['*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    
  });

  // 加载任务插件。
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['copy', 'uglify']);
  grunt.registerTask('css', ['less']);
  grunt.registerTask('watching', ['less', 'watch']);

};