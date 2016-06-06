module.exports = function(grunt) {  var resources = grunt.file.readJSON('map.resources.json');
  var getJsFiles = function(key){
      var strJS = '';
      var iterator = resources.js[key];
      if(key === 'debug'){
          iterator = resources.js[key].libs.concat(resources.js[key].core);
      }
      for(var i= 0, l= iterator.length; i < l; i++){
          strJS += '<script type="text/javascript" src="'+iterator[i]+'"></script> \n';
      }
      return strJS;
  };
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: false
            },
            build: {
                files: {
                    'assets/js/app.min.js':resources.js.debug.libs.concat(resources.js.debug.core)
                }
            }
        },
        jshint: {
            all: resources.js.debug.core
        },
        sass: {
            dist: {
                files: {
                    'assets/css/app.css': resources.css.debug
                }
            }
        },
        replace: {
            release: {
                src: ['buildHTML/base.html'],
                dest: 'index.html',
                replacements: [{
                    from: '{{scripts}}',
                    to: getJsFiles('release')
                }]
            },
            debug: {
                src: ['buildHTML/base.html'],
                dest: 'index.debug.html',
                replacements: [{
                    from: '{{scripts}}',
                    to: getJsFiles('debug')
                }]
            }
        },
        // $ grunt watch
        watch: {
          rebuild: {
              files: ['map.resources.json'],
              tasks: ['default']
          },
          js:{
              files: resources.js.debug.core,
              tasks: ['jshint','uglify']
          },
          sass:{
              files: ['assets/css/**/*.scss'],
              tasks: ['sass']
          }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    // Default task(s).
    grunt.registerTask('default', ['jshint','uglify', 'replace','sass']);
};
