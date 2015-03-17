module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    }
    
  });

  // 加载任务插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['copy', 'uglify']);

};