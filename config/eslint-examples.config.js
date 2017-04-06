var eslintrc = require('eslint-config-videojs');

var eslintConfig = Object.assign(eslintrc, {
  env: {
    "browser": true
  },
  rules: {
    'no-var': 'off'
  }
});

module.exports = eslintrc;
