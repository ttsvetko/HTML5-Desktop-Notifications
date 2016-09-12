/* eslint-env node */
/* global module */

module.exports = {

    // Default Grunt task that builds the Deep blue theme ready for production
    'default': [
        'clean',
        'uglify:default',
        'uglify:dev'
    ],

    // Development Grunt build task
    'dev': [
        'clean',
        'watch'
    ]
};
