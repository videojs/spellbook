#!/usr/bin/env node
var config = require('./get-config')();
var path = require('path');
var PathsExist = require('./paths-exist');
var Run = require('./run');
var Watch = require('./watch');
var log = require('./log');

var eslintHelper = function(program, configName) {
  configName = configName || 'eslint.config.js';
  var files = [];
  program.src.forEach(function(src) {
    // make it recursive
    if (PathsExist(src) && path.extname(src) === '') {
      src = path.join(src, '**', '*.*');
    }
    files.push(src);
  });

  var command =  [
    'eslint',
    '--color',
    '--no-eslintrc',
    '--ignore', 'node_modules',
    '--config', configName
  ].concat(files);

  if (program.errors) {
    command.push('--quiet');
  }

  if (program.fix) {
    command.push('--fix');
  }

  var run = function() {
    return Run.one(command, {toLog: true, nonFatal: program.watch})
      .then(function(result) {
        if (result.stdout === '' && result.stderr === '') {
          var msg = 'No linting problems!';

          if (program.errors) {
            msg += ' Note: there may be hidden warnings. as --errors is in use';
          }

          log.info(msg);
        }
      });
  };
  if (program.watch) {
    Watch(program.src, run);
  } else {
    run();
  }
};

module.exports = eslintHelper;
