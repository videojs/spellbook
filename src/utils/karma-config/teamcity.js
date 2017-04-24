var browserstack = require('./browserstack');
var saucelabs = require('./saucelabs');

var using = function() {
  return typeof process.env.TEAMCITY_VERSION !== 'undefined';
};

var configure = function(program, config, karmaConfig) {
  if (!using()) {
    return karmaConfig;
  }

  // do Anything that teamcity needs outside of browser setup here
  karmaConfig.reporters.push('teamcity');

  // don't add browsers if we are already running on
  // sauce labs or browser stack and browsers are specified
  if ((saucelabs.using() || browserstack.using()) && karmaConfig.browsers.length) {
    return karmaConfig;
  }

  // if we are not using browser stack or sauce labs
  // stick to the specifed browsers or let detect browser handle it
  if (config.test && config.test.teamcityBrowsers && config.test.teamcityBrowsers.length) {
    karmaConfig.browsers = karmaConfig.browsers.concat(config.test.teamcityBrowsers);
  }

  return karmaConfig;
};

module.exports = {
  configure: configure,
  using: using
};
