/* eslint-env node */

(function uglify () {
    'use strict';

    var files = [
        '<%= dir.source %>/Notification.js'
    ];

    module.exports = function(grunt) {

        return {
            'options': {
                'banner': '/*! <%= pkg.libraryName %> - v<%= pkg.version %> - ' +
                          '<%= grunt.template.today("yyyy-mm-dd") %>\n\n' + grunt.file.read('License.txt') +
                          '*/\n\n',
                'preserveComments': false,
                'compress': true,
                'mangle': true
            },

            'default': {
                'files': [
                    {
                        '<%= dir.production %>/Notification.min.js': files
                    }
                ]
            },

            'dev': {
                'options': {
                    'beautify': true,
                    'compress': false,
                    'mangle': false,
                    'preserveComments': true
                },

                'files': [
                    {
                        '<%= dir.production %>/Notification.js': files
                    }
                ]
            }
        }
    };
}());
