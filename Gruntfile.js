/* eslint-env node */
/* global module, require */

module.exports = function gruntFn (grunt) {
    'use strict';

    // Load time-grunt task
    require('time-grunt')(grunt);

    // Load npm & custom tasks
    require('load-grunt-config')(grunt, {
        'data': {
            'pkg': grunt.file.readJSON('package.json'),
            'dir': {
                'source': 'src',
                'production': 'dist',
                'tests': 'test'
            }
        }
    });
};
