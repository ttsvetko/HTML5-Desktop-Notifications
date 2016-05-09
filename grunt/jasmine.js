/* eslint-env node */
/* global module */

module.exports = {
    'options': {
        'specs': [
            '<%= dir.test %>/**/*.js'
        ]
    },
    'src': '<%= dir.source %>/**/*.js'
};
