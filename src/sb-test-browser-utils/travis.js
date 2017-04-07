var findBrowser = require('./find-browser');

module.exports = function(program, config, karmaConfig) {
  if (!process.env.TRAVIS) {
    return karmaConfig;
  }

  if (process.env.BROWSER_STACK_USERNAME) {
    karmaConfig.browsers = [
      'chrome_bs',
      'firefox_bs',
      'safari_bs',
      'edge_bs',
      'ie11_bs',
      'ie10_bs',
      'ie9_bs',
      'ie8_bs'
    ];
    karmaConfig.browserStack.name = process.env.TRAVIS_BUILD_NUMBER + process.env.TRAVIS_BRANCH;
  } else if (config.test && config.test.travisBrowsers) {
    karmaConfig.browsers = config.test.travisBrowsers;
  } else {
    karmaConfig.browsers = ['Firefox', 'Chrome'];
  }

  if (!process.env.BROWSER_STACK_USERNAME) {
    var i = findBrowser(browsers, 'chrome');

    if (i !== -1) {
      browsers[i] = 'travisChrome';
    }
  }


  return karmaConfig;
};
