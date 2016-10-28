#!/usr/bin/env node
var config = require('./get-config')();
var path = require('path');
var PathsExist = require('./paths-exist');
var exec = require('./exec');
var Watch = require('./watch');
var shelljs = require('shelljs');
var log = require('./log');
var exorcistHelper = require('./exorcist-helper');

// src, dist, noMin, noStart
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
    '--postcss-banner.banner', '\'' + banner + '\'',
    '--postcss-banner.important', 'true',
    '--use', 'autoprefixer',
    '--autoprefixer.browsers', '\'' + config.browserList.join(', ') + '\'',
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
      shelljs.rm('-f', options.dist + ext);
    });
  }

  shelljs.mkdir('-p', path.dirname(options.dist));

  var postcssRetval = exec(postcssCmd, {silent: true});
  if (postcssRetval.code !== 0 || !PathsExist(options.dist + '.css')) {
    log.fatal('postcss failed! This is usually due to a syntax error in your css!');
    process.exit(1);
  }
  log.info('Wrote: ' + options.dist + '.css');

  if (!options.noMin) {
    var cssnanoRetval = exec(cssnanoCmd, {silent: true});
    if (cssnanoRetval.code !== 0 || !PathsExist(options.dist + '.min.css')) {
      log.fatal('cssnano failed! not sure why this happened?');
      process.exit(1);
    }
    log.info('Wrote: ' + options.dist + '.min.css');

    exorcistHelper(options.dist + '.min.css');
    log.info('Wrote: ' + options.dist + '.min.css.map');
  }

  // exorcist has to be done after the min file
  // as cssnano only uses internal maps
  exorcistHelper(options.dist + '.css');
  log.info('Wrote: ' + options.dist + '.css.map');
};

module.exports = postcssHelper;
