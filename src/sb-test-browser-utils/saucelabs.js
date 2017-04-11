var SAUCE_LABS_LAUNCHERS = {
  chrome_sl: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7',
    version: 'latest'
  },
  firefox_sl: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 7',
  },
  safari_sl:  {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X',
  },
  edge_sl: {
    base: 'SauceLabs',
    browserName: 'edge',
    platform: 'Windows 10 ',
  },
  ie11_sl: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },
  ie10_sl: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '10'
  },
  ie9_sl: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9'
  },
  ie8_sl: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '8'
  }
};

module.exports = function(program, config, karmaConfig) {
  if (!process.env.SAUCE_USERNAME) {
    return karmaConfig;
  }

  karmaConfig.customLaunchers = karmaConfig.customLaunchers || {};
  karmaConfig.sauceLabs = karmaConfig.sauceLabs || {};

  Object.keys(SAUCE_LABS_LAUNCHERS).forEach(function(k) {
    var v = SAUCE_LABS_LAUNCHERS[k];

    karmaConfig.customLaunchers[k] = v;
  });

  karmaConfig.browsers = Object.keys(SAUCE_LABS_LAUNCHERS);

  // remove ie8 if they don't want to support it
  if (!config.IE8) {
    var i = karmaConfig.browsers.indexOf('ie8_sl');

    karmaConfig.browsers.splice(i, 1);
  }

  if (config.test && config.test.slBrowsers) {
    karmaConfig.browsers = config.test.slBrowsers;
  }

  return karmaConfig;
};
