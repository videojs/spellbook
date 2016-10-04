var config = require('./get-config')();
var shelljs = require('shelljs');
var path = require('path');
var PathExists = require('./path-exists');
var glob = require('glob');
var exorcistHelper = require('./exorcist-helper');
var log = require('./log');
var exec = require('./exec');

// dist, src, watch, standalone
var browserifyHelper = function(options) {
  ['.js', '.js.map'].forEach(function(ext) {
    var file = options.dist + ext;

    if (PathExists(file)) {
      shelljs.rm('-rf', options.dist + ext);
    }
  });

  var oldSilent = shelljs.config.silent;
  var babelPreset = config.ie8 ? 'babel-preset-ie8.config.js' : 'babel-preset.config.js';
  var files = [options.src];

  shelljs.mkdir('-p', path.dirname(options.dist));
  shelljs.config.silent = true;

  if (!PathExists(options.src)) {
    files = glob.sync(options.src, {ignore: '**/node_modules/**'});
  }

  var command = [
    '-v',
    '--debug',
    '-t', 'rollupify',
    '-t', '[', 'babelify', '--presets', babelPreset, ']',
    '-g', 'browserify-shim',
    '-g', 'browserify-versionify',
    '-p', 'bundle-collapser/plugin',
    '-o', options.dist + '.js',
  ].concat(files);

  if (options.standalone) {
    command.push('-s');
    command.push(config.name);
  }

  if (!options.watch) {
    command.unshift('browserify');
    var retval = exec(command, {silent: true});

    // remove rollup external deps errors...
    retval.stderr = retval.stderr || '';
    retval.stderr = retval.split(/^Treating '\w+' as external dependency\n$/).join('');

    if (retval.code !== 0 || retval.stderr || !PathExists(options.dist + '.js')) {
      process.stderr.write(retval.stderr);
      process.stderr.write(retval.stdout);
      process.exit(1);
    }

  // rip sourcemap out
    exorcistHelper(options.dist + '.js');
    log.info('Wrote ' + options.dist + '.js');
    log.info('Wrote ' + options.dist + '.js.map');
  } else {
    command.unshift('watchify');
    var reval = exec(command);
  }

  return retval;
};

module.exports = browserifyHelper;
