var config = require('../src/config');
module.exports = function(karmaConfig) {
  var detectBrowsers = {
    enabled: false,
    usePhantomJS: false
  };

  // On Travis CI, we can only run in Firefox and Chrome; so, enforce that.
  if (process.env.TRAVIS) {
    karmaConfig.browsers = ['Firefox', 'travisChrome'];
  }

  // If no browsers are specified, we enable `karma-detect-browsers`
  // this will detect all browsers that are available for testing
  if (!karmaConfig.browsers.length) {
    detectBrowsers.enabled = true;
  }

  karmaConfig.set({
    basePath: config.root,
    frameworks: ['qunit', 'detectBrowsers'],
    files: [
      'node_modules/video.js/dist/video-js.css',
      'dist/' + config.name + '.css',
      'node_modules/es5-shim/es5-shim.js',
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/video.js/dist/video.js',
      'test/dist/bundle.js'
    ],
    customLaunchers: {
      travisChrome: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    detectBrowsers: detectBrowsers,
    reporters: ['dots'],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity
  });
};
