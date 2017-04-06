var eslintrc = require('eslint-config-videojs');

var eslintConfig = eslintrc;
eslintConfig.env.browser = true;
eslintConfig.rules['no-var'] = 'off';

module.exports = eslintConfig;
