var path = require('path');
var eslintrc = require('eslint-config-videojs');

var eslintConfig = {
  parserOptions: {
    sourceType: 'module',
    impliedStrict: true,
  },
  env: eslintrc.env,
  parser: 'espree',
  rules: Object.assign(eslintrc.rules, {
    "jsdoc/newline-after-description": 'warn',
    "require-jsdoc": ['warn', {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true
      }
    }],
    "valid-jsdoc": ['warn', {
      "prefer": {
        "returns": "return",
        "augments": "extends",
        "arg": "param",
        "virtual": "abstract",
        "constructor": "class"
      },
      "preferType": {
        "Boolean": "boolean",
        "Number": "number",
        "String": "string",
        "Undefined": "undefined",
        "Null": "null",
        "object": "Object",
        "array": "Array",
        "date": "Date",
        "regexp": "RegExp",
      },
      "requireReturn": false,
      "requireReturnType": true,
      "requireParamDescription": true,
      "requireReturnDescription": true,
      "matchDescription": '.+'
    }]
  }),
  plugins: [
    "markdown",
    "json",
    "jsdoc"
  ],
};

module.exports = eslintConfig;
