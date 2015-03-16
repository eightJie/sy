module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
          cwd: 'src/',
          src: '**/*.js',
          dest: 'build'
        }]
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path 
          {
            expand: true,
            src: ['imgs/*'],
            dest: 'build/'
          },

          // includes files within path and its sub-directories 
          {
            expand: true,
            src: ['./*.html'],
            dest: 'build/'
          },

          // makes all src relative to cwd 
          {
            expand: true,
            src: ['lib/**'],
            dest: 'build/'
          },

          // flattens results to a single level 
          {
            expand: true,
            flatten: true,
            src: ['path/**'],
            dest: 'dest/',
            filter: 'isFile'
          }
        ]
      }
    }
  });

  // 加载任务插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify', 'copy']);

};