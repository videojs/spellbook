module.exports = function(program, config, karmaConfig) {

  karmaConfig.customLaunchers = karmaConfig.customLaunchers || {};
  karmaConfig.browserStack = karmaConfig.browserStack || {};
  karmaConfig.customLaunchers.chrome_bs = {
    base: 'BrowserStack',
    browser: 'chrome',
    os: 'Windows',
    os_version: '8.1'
  };

  karmaConfig.customLaunchers.firefox_bs = {
    base: 'BrowserStack',
    browser: 'firefox',
    os: 'Windows',
    os_version: '8.1'
  };

  karmaConfig.customLaunchers.safari_bs = {
    base: 'BrowserStack',
    browser: 'safari',
    os: 'OS X',
    os_version: 'Yosemite'
  };

  karmaConfig.customLaunchers.ie11_bs = {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '11',
    os: 'Windows',
    os_version: '8.1'
  };

  karmaConfig.customLaunchers.ie10_bs = {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '10',
    os: 'Windows',
    os_version: '7'
  };

  karmaConfig.customLaunchers.ie9_bs = {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '9',
    os: 'Windows',
    os_version: '7'
  };

  karmaConfig.customLaunchers.ie8_bs = {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '8',
    os: 'Windows',
    os_version: '7'
  };

  karmaConfig.browserStack = {
    project: config.name,
    pollingTimeout: 30000,
    captureTimeout: 600,
    timeout: 600
  };

  return karmaConfig;
};
