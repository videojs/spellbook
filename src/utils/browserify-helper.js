var config = require('./get-config')();
var path = require('path');
var log = require('./log');
var GetFiles = require('./get-files');
var browserify = require('browserify');
var GetPath = require('./get-path');
var PathsExist = require('./paths-exist');
var exorcist = require('exorcist');
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var browserifyBanner = require('browserify-banner');
var bundleCollapser = require('bundle-collapser/plugin');
var errorify = require('errorify');
var babelify = require('babelify');
var shim = require('browserify-shim');
var versionify = require('browserify-versionify');
var rollupify = require('rollupify');
var watchify = require('watchify');
var Promise = require('bluebird');
var nodeResolve = require('rollup-plugin-node-resolve');
var shelljs = require('shelljs');

// dist, src, standalone, watch, internalMap, noRollup
var browserifyHelper = function(options) {
  ['.js', '.js.map', '-with-map.js'].forEach(function(ext) {
    rimraf.sync(options.dist + ext);
  });
  var files = GetFiles(options.src);

  if (!files.length) {
    log.fatal('Source directory ' + options.src + ' does not exist or contains no js files!');
    process.exit(1);
  }

  mkdirp.sync(path.dirname(options.dist));

  var nodeModuleDirectories = shelljs.find('node_modules').filter(function(val) {
    return (/node_modules\/?$/).test(val);
  });

  var opts = {
    basedir: config.path,
    delay: 500,
    debug: true,
    standalone: (options.standalone ? config.name : false),
    cache: {},
    packageCache: {},
    paths: nodeModuleDirectories,
    plugin: [
      bundleCollapser,
      errorify
    ],
    transform: [
      [shim, {global: true, shim: config.shim}],
      [babelify, {presets: GetPath('babel-preset.config.js')}],
      [versionify, {global: true}]
    ]
  };

  if (!options.watch && !options.noRollup) {
    opts.transform.unshift([rollupify, {config: {
      plugins: [
        nodeResolve({jsnext: true, main: false, modulesOnly: true}),
      ],
      external: Object.keys(config.shim),
    }}]);
  }

  if (options.standalone) {
    // remove the last newline in the banner
    // uglify adds it for us
    var banner = '/*!\n';

    Object.keys(config.bannerObj).forEach(function(k) {
      banner += ' * @' + k + ' ' + config.bannerObj[k] + '\n';
    });
    banner += " */\n";

    opts.plugin.push([browserifyBanner, {template: banner}]);
  }

  if (options.watch) {
    opts.plugin.push(watchify);
  }
  log.debug('running browserify with opts:', opts, 'and files', files);
  var b = browserify(files, opts);

  var bundle = function() {
    if (arguments.length) {
      log.info('File(s) changed rebuilding...');
    }

    return new Promise(function(resolve, reject) {
      var _bundle = b.bundle();
      _bundle.on('end', function() {
        resolve();
      });
      b.pipeline.on('error', function(error) {
        reject(error);
      });

      if (options.watch || !options.internalMap) {
        _bundle
          .pipe(exorcist(options.dist + '.js.map', ''))
          .pipe(fs.createWriteStream(options.dist + '.js'));
      } else {
        _bundle
          .pipe(fs.createWriteStream(options.dist + '.js'));
      }
    }).then(function(error) {
      if (error) {
        throw new Error(error);
      }
      if (!PathsExist(options.dist + '.js')) {
        throw new Error('file' + options.dist + '.js was not written by browserify!');
      }
      log.info('Wrote: ' + options.dist + '.js');
      if (!options.internalMap) {
        log.info('Wrote: ' + options.dist + '.js.map');
      }
      return Promise.resolve();
    }).catch(function(err) {
      log.error(err.stack);
    });
  };

  b.on('update', bundle);
  return bundle();
};

module.exports = browserifyHelper;
