var browserstack = require('./browserstack');
var saucelabs = require('./saucelabs');
var teamcity = require('./teamcity');
var travis = require('./travis');

var configure = function(program, config, karmaConfig) {
  // should not use local dev browsers on ci
  if (travis.using() || saucelabs.using() || browserstack.using() || teamcity.using()) {
    return karmaConfig;
  }

  // should not use local dev browsers if in watch mode or
  // browsers were specified on the command line
  if (program.watch || program.browsers) {
    return karmaConfig;
  }

  if (config.test && config.test.devBrowsers && config.test.devBrowsers.length) {
    karmaConfig.browsers = config.test.devBrowsers;
  }

  return karmaConfig;
};

module.exports = {configure: configure};
