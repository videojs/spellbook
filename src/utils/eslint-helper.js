#!/usr/bin/env node
var config = require('./get-config')();
var GetPath = require('./get-path');
var path = require('path');
var PathExists = require('./path-exists');

var eslintHelper = function(program) {
  // make it recursive
  if (PathExists(program.src) && path.extname(program.src) === '') {
    program.src = path.join(program.src, '**', '*.*');
  }

  var command =  ''
    + GetPath('esw')
    + ' --color'
    + ' --no-eslintrc'
    + ' --ignore node_modules'
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
