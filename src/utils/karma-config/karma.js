var PathsExist = require('../paths-exist');
var GetPath = require('../get-path');
var findBrowser = require('./find-browser');
var path = require('path');
var log = require('../log');

var configure = function(program, config, karmaConfig) {
  var files = [];
  var nodeDir = path.join('node_modules');
  var sinonDir = path.join('sinon', 'pkg');
  var sbNodeDir = path.join('node_modules', 'videojs-spellbook', 'node_modules');

  if (PathsExist(path.join(nodeDir, sinonDir))) {
    log.info('using local sinon');
    files.push(path.join(nodeDir, sinonDir, 'sinon.js'));
    files.push(path.join(nodeDir, sinonDir, 'sinon-ie.js'));
  } else if (PathsExist(path.join(sbNodeDir, sinonDir))) {
    log.info('using spellbook sinon');
    files.push(path.join(sbNodeDir, sinonDir, 'sinon.js'));
    files.push(path.join(sbNodeDir, sinonDir, 'sinon-ie.js'));
  } else {
    log.info('sinon is not installed!');
  }

  // the default is true
  if (config.shim['video.js']) {
    var vjsDir = path.join('video.js', 'dist');

    if (PathsExist(path.join(nodeDir, vjsDir))) {
      files.push(path.join(nodeDir, vjsDir, 'video.js'));
      files.push(path.join(nodeDir, vjsDir, 'video-js.css'));
    } else {
      log.warn('video.js is not installed, use `spellbook.shim[\"video.js\"]: false` in package.json if you dont need video.js');
    }
  }

  if (config.test && config.test.files) {
    files = files.concat(config.test.files);
  }


  if (config.css && config.css.src && PathsExist(config.css.src)) {
    files.push(path.join(path.relative(config.path, config.css.dist), config.name + '.css'));
  }

  files.push(GetPath('karma-helper.js'));
  files.push(path.join(path.relative(config.path, config.test.dist), '**',  '*.test.js'));

  var browsers = [];
  if (program.browsers) {
    var KARMA_BROWSERS = ['Chrome', 'Firefox', 'IE', 'Safari'];
    if (typeof program.browsers === 'string') {
      program.browsers = program.browsers.split(',');
    }

    program.browsers.forEach(function(userBrowser) {
      var i = findBrowser(KARMA_BROWSERS, userBrowser);

      if (i === -1) {
        log.fatal('invalid browser entry: ' + userBrowser);
        return process.exit(1);
      }

      browsers.push(KARMA_BROWSERS[i]);
    });
  }

  karmaConfig = {
    reporters: ['dots'],
    frameworks: ['qunit', 'detectBrowsers'],
    plugins: ['karma-*'],
    basePath: config.path,
    browsers: browsers,
    port: program.port || 9876,
    restartOnFileChange: false,
    singleRun: !program.watch,
    loggers: [{type: path.join(__dirname, '..', 'log.js')}],
    client: {clearContext: false, qunit: {showUI: true}},
    customHeaders: [
      {match: '.*', name: 'Cache-Control', value: 'no-cache, no-store, must-revalidate'},
      {match: '.*', name: 'Pragma', value: 'no-cache'},
      {match: '.*', name: 'Expires', value: '0'}
    ],
    files: files.map(function(pattern) {
      var obj = {pattern: pattern};
      if (typeof pattern !== 'string') {
        obj = pattern;
      }
      obj.nocache = true;
      //obj.served = true;
      obj.watched = false;

      return obj;
    })
  };


  return karmaConfig;
};

module.exports = {configure: configure};
