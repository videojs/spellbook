var launchers = {
  chrome_bs: {
    base: 'BrowserStack',
    browser: 'chrome',
    os: 'Windows',
    os_version: '8.1'
  },
  firefox_bs: {
    base: 'BrowserStack',
    browser: 'firefox',
    os: 'Windows',
      os_version: '8.1'
  },
  safari_bs:  {
    base: 'BrowserStack',
    browser: 'safari',
    os: 'OS X',
    os_version: 'Yosemite'
  },
  edge_bs: {
    base: 'BrowserStack',
    browser: 'edge',
    os: 'Windows',
    os_version: '10'
  },
  ie11_bs: {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '11',
    os: 'Windows',
    os_version: '8.1'
  },
  ie10_bs: {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '10',
    os: 'Windows',
    os_version: '7'
  },
  ie9_bs: {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '9',
    os: 'Windows',
    os_version: '7'
  },
  ie8_bs: {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '8',
    os: 'Windows',
    os_version: '7'
  }
};

var using = function() {
  return typeof process.env.BROWSER_STACK_USERNAME !== 'undefined';
};

var configure = function(program, config, karmaConfig) {
  if (!using()) {
    return karmaConfig;
  }

  karmaConfig.customLaunchers = karmaConfig.customLaunchers || {};
  karmaConfig.browserStack = karmaConfig.browserStack || {};

  // remove ie8 if they don't want to support it
  if (config.ie8 === false) {
    delete launchers.ie8_bs;
  }

  Object.keys(launchers).forEach(function(k) {
    var v = launchers[k];

    karmaConfig.customLaunchers[k] = v;
  });

  karmaConfig.browserStack = {
    project: config.name,
    pollingTimeout: 30000,
    captureTimeout: 600,
    timeout: 600
  };

  // default browsers to add
  var browsers = Object.keys(launchers);

  // specified browsers to add
  if (config.test && config.test.bsBrowsers && config.test.bsBrowsers.length) {
    browsers = config.test.bsBrowsers;
  } else if (config.test.bsBrowsers === false) {
    browsers = [];
  }

  // add browsers
  karmaConfig.browsers = karmaConfig.browsers.concat(browsers);

  return karmaConfig;
};

module.exports = {
  configure: configure,
  launchers: launchers,
  using: using,
};
