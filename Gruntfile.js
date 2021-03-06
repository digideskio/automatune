module.exports = function(grunt) {

  "use strict";

  var libFiles = ['lib/*.js'];
  var srcFiles = ['src/Util.js', 'src/Automatune.js', 'src/*.js'];
  var destFile = 'dist/automatune.js';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      all: {
        options: {
          base: 'dist',
          port: 8000,
          keepalive: true
        }
      }
    },
    concat: {
      options: {
        sourceMap: true,
        sourceMapStyle: "inline"
      },
      all: {
        src: libFiles.concat(srcFiles),
        dest: destFile
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> Copyright (c) <%= grunt.template.today("yyyy") %> Maximillian Laumeister, see https://github.com/MaxLaumeister/automatune for license details */\n'
      },
      build: {
        src: libFiles.concat(srcFiles),
        dest: destFile
      }
    },
    jshint: {
      all: {
        src: srcFiles.concat(['Gruntfile.js'])
      },
      options: {
        expr: true,
        strict: true,
        newcap: true
      }
    },
    jsdoc: {
      public: {
        src: srcFiles,
        options: {
          destination: 'doc',
          private: false
        }
      },
      private: {
        src: srcFiles,
        options: {
          destination: 'doc',
          private: true
        }
      }
    },
    todos: {
      all: {
        options: {
          verbose: false
        },
        src: srcFiles
      }
    },
    watch: {
      all: {
        files: libFiles.concat(srcFiles).concat(['Gruntfile.js']),
        tasks: ['concat', 'newer:jshint:all', 'connect'],
        options: {
          interrupt: true,
          atBegin: true
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/static/', src: ['**'], dest: 'dist/'},
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-todos');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat', 'jshint', 'copy']);
  grunt.registerTask('min', ['jshint', 'uglify', 'copy']);
  grunt.registerTask('dist', ['jshint', 'uglify', 'jsdoc:public', 'copy']);
  grunt.registerTask('doc', ['jsdoc:public']);
  grunt.registerTask('docprivate', ['jsdoc:private']);
};

