var BROWSER_STACK_LAUNCHERS = {
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

module.exports = function(program, config, karmaConfig) {
  if (!process.env.BROWSER_STACK_USERNAME) {
    return karmaConfig;
  }

  karmaConfig.customLaunchers = karmaConfig.customLaunchers || {};
  karmaConfig.browserStack = karmaConfig.browserStack || {};

  Object.keys(BROWSER_STACK_LAUNCHERS).forEach(function(k) {
    var v = BROWSER_STACK_LAUNCHERS[k];

    karmaConfig.customLaunchers[k] = v;
  });

  karmaConfig.browserStack = {
    project: config.name,
    pollingTimeout: 30000,
    captureTimeout: 600,
    timeout: 600
  };

  karmaConfig.browsers = Object.keys(BROWSER_STACK_LAUNCHERS);

  // remove ie8 if they don't want to support it
  if (!config.IE8) {
    var i = karmaConfig.browsers.indexOf('ie8_bs');

    karmaConfig.browsers.splice(i, 1);
  }

  if (config.test && config.test.bsBrowsers) {
    karmaConfig.browsers = config.test.bsBrowsers;
  }

  return karmaConfig;
};
