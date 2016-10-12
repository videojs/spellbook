var config = require('../src/utils/get-config')();
var PathsExist = require('../src/utils/paths-exist');
var path = require('path');
var log = require('../src/utils/log');

module.exports = function(karmaConfig) {
  var detectBrowsers = true;

  if (karmaConfig.autoWatch && !karmaConfig.singleRun) {
    detectBrowsers = false;
  }

  var nodeDir = path.join('node_modules', 'videojs-spellbook', 'node_modules');
  var files = [
    path.join(nodeDir, 'sinon', 'pkg', 'sinon.js'),
    path.join(nodeDir, 'sinon', 'pkg', 'sinon-ie.js'),
  ];

  if (config.shimVideojs) {
    var vjsDir = path.join('video.js', 'dist');

    if (PathsExist(path.join(config.path, vjsDir))) {
      files.push(path.join(config.path, vjsDir, 'video.js'));
      files.push(path.join(config.path, vjsDir, 'video-js.css'));
    } else {
      log.info('using videojs-spellbook\'s  version of video.js as there is no local version');
      files.push(path.join(nodeDir, vjsDir, 'video.js'));
      files.push(path.join(nodeDir, vjsDir, 'video-js.css'));
    }
  }

  files.push(path.join(config.dist, 'browser', config.name + '.css'));
  files.push(path.join(config.dist, 'test', '**', '*.test.js'));

  karmaConfig.set({
    reporters: ['dots'],
    frameworks: ['qunit', 'detectBrowsers'],
    basePath: config.path,
    browsers: karmaConfig.browsers || [],
    detectBrowsers: {
      enabled: detectBrowsers,
      usePhantomJS: false
    },
    client: {
      clearContext: false,
      qunit: {showUI: true}
    },
    files: files
  });
};

