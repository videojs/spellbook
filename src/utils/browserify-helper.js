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

// dist, src, standalone
var browserifyHelper = function(options) {
  ['.js', '.js.map'].forEach(function(ext) {
    shelljs.rm('-rf', options.dist + ext);
  });

  var babelPreset = config.ie8 ? 'babel-preset-ie8.config.js' : 'babel-preset.config.js';
  var files = GetFiles(options.src);
  var cacheFile = path.join(config.cache, 'browserifyinc', path.basename(options.dist) + '.json');

  if (!files.length) {
    log.fatal('Source directory ' + program.src + ' does not exist or contains no js files!');
    process.exit(1);
  }

  shelljs.mkdir('-p', path.dirname(cacheFile));
  shelljs.mkdir('-p', path.dirname(options.dist));

  var opts = {
    basedir: config.path,
    debug: true,
    standalone: (options.standalone ? config.name : false),
    cacheFile: cacheFile,
    fullPaths: true,
    cache: {},
    packageCache: {},
    plugin: [
      'errorify',
      'bundle-collapser/plugin'
    ],
    transform: [
      /* broken for external shims during watchify... 'rollupify',*/
      ['babelify', {presets: GetPath(babelPreset)}],
      ['browserify-shim', {global: true}],
      ['browserify-versionify', {global: true}]
    ]
  };

  if (options.watch) {
    opts.plugin.push('watchify');
  } else {
    opts.transform.unshift('rollupify');
  }

  log.debug('running browserify with opts:', opts, 'and files', files);
  var b = browserify(files, opts);

  // currently we can't make browserify use incremental cache...
  // https://github.com/substack/watchify/issues/316
  if (!options.watch) {
    browserifyInc(b, {cacheFile: cacheFile});
  }
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
      });
  };

  b.on('update', bundle);
  return bundle();
};

module.exports = browserifyHelper;
