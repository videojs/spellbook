var log = require('../log');
var findBrowser = require('./find-browser');

var configure = function(program, config, karmaConfig) {
  karmaConfig.detectBrowsers = karmaConfig.detectBrowsers ||  {};
  karmaConfig.detectBrowsers.enabled = !program.watch && karmaConfig.browsers.length === 0;
  karmaConfig.detectBrowsers.usePhantomJS = false;
  karmaConfig.detectBrowsers.postDetection = function(availableBrowsers) {
    if (!config.test || !config.test.skipBrowsers) {
      return availableBrowsers;
    }

    config.test.skipBrowsers.forEach(function(browser) {
      var i = findBrowser(availableBrowsers, browser);

      if (i !== -1) {
        availableBrowsers.splice(i, 1);
        log.info('Skipping ' + browser);
      }
    });

    return availableBrowsers;
  };

  return karmaConfig;
};

module.exports = {configure: configure};
