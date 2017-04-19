var eslintrc = require('eslint-config-videojs');

var eslintConfig = eslintrc;
eslintConfig.env.browser = true;
eslintConfig.rules['no-var'] = 'off';
eslintConfig.rules['no-console'] = 'off';
eslintConfig.globals = eslintConfig.globals || {};
eslintConfig.globals.videojs = true;
eslintConfig.globals.player = true;


module.exports = eslintConfig;
