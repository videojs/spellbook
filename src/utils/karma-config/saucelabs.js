var launchers = {
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

var using = function() {
  return typeof process.env.SAUCE_USERNAME !== 'undefined';
}

var configure = function(program, config, karmaConfig) {
  if (!using()) {
    return karmaConfig;
  }

  karmaConfig.customLaunchers = karmaConfig.customLaunchers || {};
  karmaConfig.sauceLabs = karmaConfig.sauceLabs || {};

  if (config.ie8 === false) {
    delete launchers.ie8_sl;
  }

  Object.keys(launchers).forEach(function(k) {
    var v = launchers[k];

    karmaConfig.customLaunchers[k] = v;
  });

  // default browsers to add
  var browsers = Object.keys(launchers);

  // specified browsers to add
  if (config.test && config.test.slBrowsers && config.test.slBrowsers.length) {
    browsers = config.test.slBrowsers;
  } else if (config.test.slBrowsers === false) {
    browsers = [];
  }

  // add browsers
  karmaConfig.browsers = karmaConfig.browsers.concat(browsers);

  return karmaConfig;
};

module.exports = {
  configure: configure,
  using: using,
  launchers: launchers
};
