var karma = require('./karma-config/karma');
var browserstack = require('./karma-config/browserstack');
var saucelabs = require('./karma-config/saucelabs');
var travis = require('./karma-config/travis');
var teamcity = require('./karma-config/teamcity');
var dev = require('./karma-config/dev');
var detect = require('./karma-config/detect');

var GetKarmaConfig = function(program, config) {
  var karmaConfig = {};

  karmaConfig = karma.configure(program, config, karmaConfig);
  karmaConfig = browserstack.configure(program, config, karmaConfig);
  karmaConfig = saucelabs.configure(program, config, karmaConfig);
  karmaConfig = travis.configure(program, config, karmaConfig);
  karmaConfig = teamcity.configure(program, config, karmaConfig);
  karmaConfig = dev.configure(program, config, karmaConfig);
  karmaConfig = detect.configure(program, config, karmaConfig);

  return karmaConfig;
};

module.exports = GetKarmaConfig;
