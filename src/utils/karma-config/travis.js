var findBrowser = require('./find-browser');
var browserstack = require('./browserstack');
var saucelabs = require('./saucelabs');

var launchers = {
  travis_chrome: {
    base: 'Chrome',
    flags: ['--no-sandbox']
  }
};

var using = function() {
  return typeof process.env.TRAVIS !== 'undefined';
};

var configure = function(program, config, karmaConfig) {
  if (!using()) {
    return karmaConfig;
  }

  // do anything that travis needs outside of browser setup here
  karmaConfig.customLaunchers = karmaConfig.customLaunchers || {};

  Object.keys(launchers).forEach(function(k) {
    var v = launchers[k];

    karmaConfig.customLaunchers[k] = v;
  });

  // don't add browsers if we are already running on
  // sauce labs or browser stack and browsers are specified
  if ((browserstack.using() || saucelabs.using()) && karmaConfig.browsers.length) {
    return karmaConfig;
  }

  var browsers = ['Firefox', 'Chrome'];
  if (config.test && config.test.travisBrowsers && config.test.travisBrowsers.length) {
    browsers = config.test.travisBrowsers;
  }

  karmaConfig.browsers = karmaConfig.browsers.concat(browsers);

  // change Chrome entries to travis_chrome
  var i = findBrowser(karmaConfig.browsers, 'chrome');

  if (i !== -1) {
    karmaConfig.browsers[i] = 'travis_chrome';
  }

  return karmaConfig;
};

module.exports = {
  configure: configure,
  using: using,
  launchers: launchers
};
