var config = require('./get-config')();
var shelljs = require('shelljs');
var path = require('path');
var log = require('./log');
var GetFiles = require('./get-files');
var browserify = require('browserify');
var browserifyInc = require('browserify-incremental');
var streamToPromise = require('stream-to-promise');
var GetPath = require('./get-path');
var exorcist = require('exorcist');
var fs = require('fs');

var bundleCollapser = require('bundle-collapser/plugin');
var errorify = require('errorify');
var babelify = require('babelify');
var shim = require('browserify-shim');
var versionify = require('browserify-versionify');
var rollupify = require('rollupify');
var watchify = require('watchify');
var Promise = require('bluebird');

// dist, src, standalone
var browserifyHelper = function(options) {
  process.env.BROWSERIFYSHIM_DIAGNOSTICS=1;

  ['.js', '.js.map'].forEach(function(ext) {
    shelljs.rm('-rf', options.dist + ext);
  });
  var files = GetFiles(options.src);

  if (!files.length) {
    log.fatal('Source directory ' + options.src + ' does not exist or contains no js files!');
    process.exit(1);
  }

  shelljs.mkdir('-p', path.dirname(options.dist));

  var opts = {
    basedir: config.path,
    debug: true,
    standalone: (options.standalone ? config.name : false),
    cache: {},
    packageCache: {},
    paths: [
      path.join(__dirname, '..', '..', 'node_modules'),
      path.join(config.path, 'node_modules')
    ],
    plugin: [
      bundleCollapser
    ],
    transform: [
      /* broken for external shims during watchify... 'rollupify',*/
      [shim, {global: true}],
      [babelify, {presets: GetPath('babel-preset.config.js')}],
      [versionify, {global: true}]
    ]
  };

  if (options.watch) {
    opts.plugin.push(errorify);
    opts.plugin.push(watchify);
  } else {
    opts.transform.splice(1, 0, rollupify);
  }

  log.debug('running browserify with opts:', opts, 'and files', files);
  var b = browserify(files, opts);

  var bundle = function() {
    if (arguments.length) {
      log.info('File changed rebuilding...');
    } else {
      log.info('Building...')
    }
    return streamToPromise(b
      .bundle()
      .pipe(exorcist(options.dist + '.js.map'))
      .pipe(fs.createWriteStream(options.dist + '.js'))).then(function() {
        log.info('Wrote: ' + options.dist + '.js');
        log.info('Wrote: ' + options.dist + '.js.map');
      }).catch(function(err) {
        throw new Error(err);
      });
  };

  b.on('update', bundle);
  return bundle();
};

module.exports = browserifyHelper;
