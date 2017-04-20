var eslintrc = require('eslint-config-videojs');

var eslintConfig = eslintrc;
eslintConfig.rules['require-jsdoc'] = 'off';
eslintConfig.rules['valid-jsdoc'] = 'off';
eslintConfig.rules['jsdoc/newline-after-description'] = 'off';


module.exports = eslintConfig;
