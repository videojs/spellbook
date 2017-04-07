module.exports = function(program, config, karmaConfig) {
  if (!process.env.TEAMCITY_VERSION) {
    return karmaConfig;
  }

  if (process.env.BROWSER_STACK_USERNAME) {
    browsers = ['firefox_bs', 'chrome_bs', 'safari_bs'];
    karmaConfig.browserStack.name = process.env.TEAMCITY_PROJECT_NAME + process.env.BUILD_NUMBER;
  } else if (config.test && config.test.teamcityBrowsers) {
    browsers = config.test.teamcityBrowsers;
  }

  karmaConfig.reporters.push('teamcity');

  return karmaConfig;
};
