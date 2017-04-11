var findBrowser = require('./find-browser');

module.exports = function(program, config, karmaConfig) {
  if (!process.env.TRAVIS) {
    return karmaConfig;
  }

  // do anything that travis needs outside of browser setup here
  karmaConfig.customLaunchers = karmaConfig.customLaunchers || {};
  karmaConfig.customLaunchers.travisChrome = {
    base: 'Chrome',
    flags: ['--no-sandbox']
  };

  if (process.env.BROWSER_STACK_USERNAME || process.env.SAUCE_USERNAME) {
    return karmaConfig;
  }

  // only run with travis browsers if not using browserstack or sauce
  if (config.test && config.test.browsers) {
    karmaConfig.browsers = config.test.browsers;
  } else {
    karmaConfig.browsers = ['Firefox', 'Chrome'];
  }

  // change Chrome entries to travisChrome
  var i = findBrowser(karmaConfig.browsers, 'chrome');

  if (i !== -1) {
    karmaConfig.browsers[i] = 'travisChrome';
  }

  return karmaConfig;
};
