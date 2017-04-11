module.exports = function(program, config, karmaConfig) {
  if (!process.env.TEAMCITY_VERSION) {
    return karmaConfig;
  }

  // do Anything that teamcity needs outside of browser setup here
  karmaConfig.reporters.push('teamcity');

  if (process.env.BROWSER_STACK_USERNAME || process.env.SAUCE_USERNAME) {
    return karmaConfig;
  }

  // if we are not using browser stack or sauce labs
  // stick to the specifed browsers or let detect browser handle it
  if (config.test && config.test.browsers) {
    karmaConfig.browsers = config.test.browsers;
  }

  return karmaConfig;
};
