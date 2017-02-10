var config = require('../src/utils/get-config')();
var PathsExist = require('../src/utils/paths-exist');
var path = require('path');
var log = require('../src/utils/log');

module.exports = function(karmaConfig) {
  var detectBrowsers = true;

  if (karmaConfig.autoWatch && !karmaConfig.singleRun) {
    detectBrowsers = false;
  }

  if (karmaConfig.browsers.length > 0) {
    detectBrowsers = false;
  }

  var files = [];
  var sbNodeDir = path.join('node_modules', 'videojs-spellbook', 'node_modules');
  var nodeDir = path.join('node_modules');
  var sinonDir = path.join('sinon', 'pkg');

  if (PathsExist(path.join(nodeDir, sinonDir))) {
    files.push(path.join(nodeDir, sinonDir, 'sinon.js'));
    files.push(path.join(nodeDir, sinonDir, 'sinon-ie.js'));
  }

  if (config.shimVideojs) {
    var vjsDir = path.join('video.js', 'dist');

    if (PathsExist(path.join(nodeDir, vjsDir))) {
      files.push(path.join(nodeDir, vjsDir, 'video.js'));
      files.push(path.join(nodeDir, vjsDir, 'video-js.css'));
    } else {
      log.fatal('video.js is not installed, use spellbook.shim-video: true in package.json if you dont need it');
      process.exit(1);
    }
  }

  var dist = path.relative(config.path, config.dist);

  if (config.css && config.css.src && PathsExist(config.css.src)) {
    files.push(path.join(dist, 'browser', config.name + '.css'));
    files.push({pattern: path.join(dist, 'browser', config.name + '.css.map'), included: false});
  }

  files.push(path.join(__dirname, 'qunit.tests-exist.js'));
  files.push(path.join(dist, 'test', '**',  '*.test.js'));
  karmaConfig.set({
    reporters: ['dots'],
    frameworks: ['qunit', 'detectBrowsers'],
    basePath: config.path,
    browsers: karmaConfig.browsers || [],
    detectBrowsers: {
      enabled: detectBrowsers,
      usePhantomJS: false
    },
    loggers: [{type: path.join(__dirname, '../src/utils/log.js')}],
    client: {
      clearContext: false,
      qunit: {showUI: true}
    },
    customHeaders: [{
      match: '.*',
      name: 'Cache-Control',
      value: 'no-cache, no-store, must-revalidate'
    }, {
      match: '.*',
      name: 'Pragma',
      value: 'no-cache'
    }, {
      match: '.*',
      name: 'Expires',
      value: '0'
    }],
    upstreamProxy: {
      port: 9999,
    },
    files: files.map(function(pattern) {
      var obj = {pattern: pattern};
      if (typeof pattern !== 'string') {
        obj = pattern;
      }
      obj.nocache = true;
      //obj.served = true;
      //obj.watched = true;

      return obj;
    })
  });
};

