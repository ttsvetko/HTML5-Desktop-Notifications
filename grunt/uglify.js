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

    module.exports = {
        'options': {
            'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            'preserveComments': false
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
    };
}());
