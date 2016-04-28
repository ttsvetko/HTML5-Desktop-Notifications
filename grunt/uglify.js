/* eslint-env node */

(function uglify () {
    'use strict';

    var files = [
        {
            '<%= dir.production %>/Notification.js': [
                '<%= dir.source %>/Notification.js'
            ]
        }
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
                'files': files
            },

            'dev': {
                'options': {
                    'beautify': true,
                    'compress': false,
                    'mangle': false,
                    'preserveComments': true
                },

                'files': files
            }
        }
    };
}());
