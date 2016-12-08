#!/usr/bin/env node
var config = require('./get-config')();
var PathsExist = require('./paths-exist');
var Watch = require('./watch');
var log = require('./log');
var exorcistHelper = require('./exorcist-helper');
var Run = require('./run');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var Promise = require('bluebird');
var path = require('path');

// src, dist, watch, noStart
var postcssHelper = function(options) {

  var banner = '';
  Object.keys(config.bannerObj).forEach(function(k) {
    banner += '@' + k + ' ' + config.bannerObj[k] + '\n';
  });
  banner = banner.replace(/\n$/, '');

  var postcssCmd = [
    'postcss',
    '--map',
    '--use', 'postcss-banner',
    '--postcss-banner.banner', banner,
    '--postcss-banner.important', 'true',
    '--use', 'autoprefixer',
    '--autoprefixer.browsers', config.browserList.join(', '),
    '--use', 'postcss-import',
    '--output', options.dist + '.css',
    options.src
  ];
  var cssnanoCmd = [
    'postcss',
    '--map',
    '--use', 'cssnano',
    '--cssnano.safe', 'true',
    '--output', options.dist + '.min.css',
    options.dist + '.css'
  ];

  // if we are not starting with postcss
  // aka sass and other pre-processors
  if (!options.noStart) {
    log.info('Building...');

    ['.css', '.css.map', '.css.min.map', '.css.min'].forEach(function(ext) {
      rimraf.sync(options.dist + ext);
    });
  }

  mkdirp.sync(path.dirname(options.dist));

  // NOTE:
  // exorcist has to be done after the min file
  // as cssnano only uses internal maps
  Run.one(postcssCmd, {silent: true, toLog: options.watch, nonFatal: options.watch}).then(function(retval) {
    if (retval.status === 0) {
      log.info('Wrote: ' + options.dist + '.css');
    }
    if (options.watch) {
      if (retval.status !== 0) {
        return Promise.reject();
      }
      return Promise.resolve();
    }
    return Run.one(cssnanoCmd, {silent: true}).then(function() {
      log.info('Wrote: ' + options.dist + '.min.css');
      return exorcistHelper(options.dist + '.min.css');
    });
  }).then(function() {
    if (!options.watch) {
      return exorcistHelper(options.dist + '.css');
    }
  }).catch(function() {
    log.error('Build Failed!');
    if (options.watch) {
      // do nothing
      return;
    }
    process.exit(1);
  });
};

module.exports = postcssHelper;
