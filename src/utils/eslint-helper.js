#!/usr/bin/env node
var config = require('./get-config')();
var GetPath = require('./get-path');

var eslintHelper = function(program) {
  var command =  ''
    + GetPath('esw')
    + ' --color'
    + ' --no-eslintrc'
    + ' -c ' + GetPath('eslint.config.js')
    + ' ' + program.src;

  if (program.watch) {
    command += ' --watch';
  }

  if (program.errors) {
    command += ' --quiet';
  }

  if (program.fix) {
    command += ' --fix';
  }

  return command;
}

module.exports = eslintHelper;
