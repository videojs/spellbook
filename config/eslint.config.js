var path = require('path');
var eslintrc = require('eslint-config-videojs');

var eslintConfig = {
  parserOptions: {
    sourceType: 'module',
    impliedStrict: true,
  },
  env: eslintrc.env,
  parser: 'espree',
  rules: eslintrc.rules,
  plugins: [
    "markdown",
    "json"
  ]
};

module.exports = eslintConfig;
