#!/usr/bin/env node
var config = require('./get-config')();
var path = require('path');
var PathExists = require('./path-exists');

var eslintHelper = function(program) {
  var files = [];
  program.src.forEach(function(src) {
    // make it recursive
    if (PathExists(src) && path.extname(src) === '') {
      src = path.join(src, '**', '*.*');
    }
    files.push(src);
  });

  var command =  [
    'esw',
    '--color',
    '--no-eslintrc',
    '--ignore node_modules',
    '-c', 'eslint.config.js',
  ].concat(files);

  if (program.watch) {
    command.push('--watch');
  }

  if (program.errors) {
    command.push('--quiet');
  }

  if (program.fix) {
    command.push('--fix');
  }

  return command;
}

module.exports = eslintHelper;
