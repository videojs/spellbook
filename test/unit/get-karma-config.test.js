var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var parallel = require('mocha.parallel');
var GetKarmaConfig = require('../../src/utils/get-karma-config');
var browserstack = require('../../src/utils/karma-config/browserstack');
var saucelabs = require('../../src/utils/karma-config/saucelabs');
var travis = require('../../src/utils/karma-config/travis');
var teamcity = require('../../src/utils/karma-config/teamcity');
var dev = require('../../src/utils/karma-config/dev');
var detect = require('../../src/utils/karma-config/detect');

var GetDefaults = function(config, baseDir) {
  return {
    "basePath": config.path,
    "browsers": [],
    "client": {
      "clearContext": false,
      "qunit": {
        "showUI": true
      }
    },
    "customHeaders": [
      {
        "match": ".*",
        "name": "Cache-Control",
        "value": "no-cache, no-store, must-revalidate"
      },
      {
        "match": ".*",
        "name": "Pragma",
        "value": "no-cache"
      },
      {
        "match": ".*",
        "name": "Expires",
        "value": "0"
      }
    ],
    "detectBrowsers": {
      "enabled": true,
      "usePhantomJS": false
    },
    "files": [
      {
        "nocache": true,
        "pattern": "node_modules/sinon/pkg/sinon.js",
        "watched": false,
      },
      {
        "nocache": true,
        "pattern": "node_modules/sinon/pkg/sinon-ie.js",
        "watched": false
      },
      {
        "nocache": true,
        "pattern": "node_modules/video.js/dist/video.js",
        "watched": false
      },
      {
        "nocache": true,
        "pattern": "node_modules/video.js/dist/video-js.css",
        "watched": false
      },
      {
        "nocache": true,
        "pattern": "dist/test-pkg-main.css",
        "watched": false
      },
      {
        "nocache": true,
        "pattern": path.join(__dirname, '..', '..', 'config', 'karma-helper.js'),
        "watched": false
      },
      {
        "nocache": true,
        "pattern": "build/test/**/*.test.js",
        "watched": false
      }
    ],
    "frameworks": [
      "qunit",
      "detectBrowsers"
    ],
    "loggers": [
      {
        "type": path.join(__dirname, '..', '..', 'src', 'utils', 'log.js')
      }
    ],
    "plugins": [
      "karma-*"
    ],
    "port": 9876,
    "reporters": [
      "dots"
    ],
    "restartOnFileChange": false,
    "singleRun": true
  };
};

var oldEnvVars = {
  'TRAVIS': undefined,
  'TEAMCITY_VERSION': undefined,
  'BROWSER_STACK_USERNAME': undefined,
  'SAUCE_USERNAME': undefined
};

describe('get-karma-config', function() {
  before(function() {
    process.env.SB_LOG_LEVEL = false;
    process.env.SB_INTERNAL = 'true';

    // unset env vars
    Object.keys(oldEnvVars).forEach(function(v) {
      if (typeof process.env[v] !== 'undefined') {
        console.log('temporaraly clearing process.env.' + v + ' = ' + process.env[v]);
        oldEnvVars[v] = process.env[v];
        delete process.env[v];
      }
    });
  });
  after(function() {
    delete process.env.SB_INTERNAL;
    delete process.env.SB_LOG_LEVEL;

    // reset env vars
    Object.keys(oldEnvVars).forEach(function(v) {
      if (typeof oldEnvVars[v] !== 'undefined') {
        process.env[v] = oldEnvVars[v];
        console.log('reseting ' + v + ' to ' + oldEnvVars[v]);
      }
    });
  });
  parallel('basic', function() {
    it('should return defaults', function(done) {
      var helper = new TestHelper();
      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      if (karmaConfig.detectBrowsers && karmaConfig.detectBrowsers.postDetection) {
        assert.ok(typeof karmaConfig.detectBrowsers.postDetection === 'function', 'postDetection is used');
        delete karmaConfig.detectBrowsers.postDetection;
      }

      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      helper.cleanup(done);
    });

    it('port should change', function(done) {
      var helper = new TestHelper();
      var karmaConfig = GetKarmaConfig({port: 9999}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      if (karmaConfig.detectBrowsers && karmaConfig.detectBrowsers.postDetection) {
        assert.ok(typeof karmaConfig.detectBrowsers.postDetection === 'function', 'postDetection is used');
        delete karmaConfig.detectBrowsers.postDetection;
      }
      expectedConfig.port = 9999;

      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      helper.cleanup(done);
    });

    it('can specify browser array', function(done) {
      var helper = new TestHelper();
      var karmaConfig = GetKarmaConfig({browsers: ['chrome']}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      if (karmaConfig.detectBrowsers && karmaConfig.detectBrowsers.postDetection) {
        assert.ok(typeof karmaConfig.detectBrowsers.postDetection === 'function', 'postDetection is used');
        delete karmaConfig.detectBrowsers.postDetection;
      }
      expectedConfig.detectBrowsers.enabled = false;
      expectedConfig.browsers = ['Chrome'];


      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      helper.cleanup(done);
    });

    it('can specify browser string', function(done) {
      var helper = new TestHelper();
      var karmaConfig = GetKarmaConfig({browsers: 'chrome,firefox'}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      if (karmaConfig.detectBrowsers && karmaConfig.detectBrowsers.postDetection) {
        assert.ok(typeof karmaConfig.detectBrowsers.postDetection === 'function', 'postDetection is used');
        delete karmaConfig.detectBrowsers.postDetection;
      }
      expectedConfig.detectBrowsers.enabled = false;
      expectedConfig.browsers = ['Chrome', 'Firefox'];


      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      helper.cleanup(done);
    });

    it('does not detect browsers during watch', function(done) {
      var helper = new TestHelper();
      var karmaConfig = GetKarmaConfig({watch: true}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);

      expectedConfig.singleRun = false;
      if (karmaConfig.detectBrowsers && karmaConfig.detectBrowsers.postDetection) {
        assert.ok(typeof karmaConfig.detectBrowsers.postDetection === 'function', 'postDetection is used');
        delete karmaConfig.detectBrowsers.postDetection;
      }
      expectedConfig.detectBrowsers.enabled = false;
      expectedConfig.browsers = [];


      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      helper.cleanup(done);
    });
  });

  parallel('browserstack', function() {
    beforeEach(function() {
      process.env.BROWSER_STACK_USERNAME = 'test';
    });

    afterEach(function() {
      delete process.env.BROWSER_STACK_USERNAME;
    });

    it('should work with ie8', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {ie8: true}}});

      assert.ok(helper.config.ie8, 'ie8 should be on');
      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.browserStack = {
        captureTimeout: 600,
        pollingTimeout: 30000,
        project: helper.config.name,
        timeout: 600,
      };
      expectedConfig.customLaunchers = browserstack.launchers;
      expectedConfig.browsers = Object.keys(browserstack.launchers);

      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      helper.cleanup(done);
    });

    it('should work without ie8', function(done) {
      var helper = new TestHelper();

      assert.equal(helper.config.ie8, false, 'ie8 should be off');
      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.browserStack = {
        captureTimeout: 600,
        pollingTimeout: 30000,
        project: helper.config.name,
        timeout: 600,
      };
      expectedConfig.customLaunchers = browserstack.launchers;
      delete expectedConfig.customLaunchers.ie8_bs;

      expectedConfig.browsers = Object.keys(expectedConfig.customLaunchers);
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      helper.cleanup(done);
    });

    it('should work with custom browsers', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        bsBrowsers: ['ie9_bs']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.browserStack = {
        captureTimeout: 600,
        pollingTimeout: 30000,
        project: helper.config.name,
        timeout: 600,
      };
      expectedConfig.customLaunchers = browserstack.launchers;

      expectedConfig.browsers = ['ie9_bs'];
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      helper.cleanup(done);
    });

    it('can be turned off', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        bsBrowsers: false
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = true;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.browserStack = {
        captureTimeout: 600,
        pollingTimeout: 30000,
        project: helper.config.name,
        timeout: 600,
      };
      expectedConfig.customLaunchers = browserstack.launchers;

      expectedConfig.browsers = [];
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      helper.cleanup(done);
    });
  });

  parallel('saucelabs', function() {
    beforeEach(function() {
      process.env.SAUCE_USERNAME = 'test';
    });

    afterEach(function() {
      delete process.env.SAUCE_USERNAME;
    });

    it('should work with ie8', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {ie8: true}}});

      assert.ok(helper.config.ie8, 'ie8 should be on');
      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.sauceLabs = {};
      expectedConfig.customLaunchers = saucelabs.launchers;
      expectedConfig.browsers = Object.keys(saucelabs.launchers);

      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      helper.cleanup(done);
    });

    it('should work without ie8', function(done) {
      var helper = new TestHelper();

      assert.equal(helper.config.ie8, false, 'ie8 should be off');
      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.sauceLabs = {};
      expectedConfig.customLaunchers = saucelabs.launchers;
      delete expectedConfig.customLaunchers.ie8_sl;

      expectedConfig.browsers = Object.keys(expectedConfig.customLaunchers);
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      helper.cleanup(done);
    });

    it('should work with custom browsers', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        slBrowsers: ['ie9_sl']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.sauceLabs = {};
      expectedConfig.customLaunchers = saucelabs.launchers;

      expectedConfig.browsers = ['ie9_sl'];
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      helper.cleanup(done);
    });

    it('can be turned off', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        slBrowsers: false
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = true;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.sauceLabs = {};
      expectedConfig.customLaunchers = saucelabs.launchers;

      expectedConfig.browsers = [];
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      helper.cleanup(done);
    });
  });

  parallel('travis', function() {
    beforeEach(function() {
      process.env.TRAVIS = 'test';
    });

    afterEach(function() {
      delete process.env.TRAVIS;
    });

    it('default browsers', function(done) {
      var helper = new TestHelper();

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.customLaunchers = travis.launchers;

      expectedConfig.browsers = ['Firefox', 'travis_chrome'];
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      helper.cleanup(done);
    });

    it('custom browsers', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        travisBrowsers: ['Chrome']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.customLaunchers = travis.launchers;

      expectedConfig.browsers = ['travis_chrome'];
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      helper.cleanup(done);
    });

    it('does not add browsers when using browserstack', function(done) {
      process.env.BROWSER_STACK_USERNAME = 'test';
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        travisBrowsers: ['Chrome']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.browserStack = {
        captureTimeout: 600,
        pollingTimeout: 30000,
        project: helper.config.name,
        timeout: 600
      };
      expectedConfig.customLaunchers = {};
      Object.keys(browserstack.launchers).forEach(function(l) {
        expectedConfig.customLaunchers[l] = browserstack.launchers[l];
      });

      delete expectedConfig.customLaunchers.ie8_bs;

      expectedConfig.browsers = Object.keys(expectedConfig.customLaunchers);

      Object.keys(travis.launchers).forEach(function(l) {
        expectedConfig.customLaunchers[l] = travis.launchers[l];
      });

      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      delete process.env.BROWSER_STACK_USERNAME;
      helper.cleanup(done);
    });

    it('does not add browsers when using saucelabs', function(done) {
      process.env.SAUCE_USERNAME = 'test';
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        travisBrowsers: ['Chrome']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.customLaunchers = {};
      expectedConfig.sauceLabs = {};

      Object.keys(saucelabs.launchers).forEach(function(l) {
        if (l === 'ie8_sl') {
          return;
        }
        expectedConfig.customLaunchers[l] = saucelabs.launchers[l];
      });

      expectedConfig.browsers = Object.keys(expectedConfig.customLaunchers);
      Object.keys(travis.launchers).forEach(function(l) {
        expectedConfig.customLaunchers[l] = travis.launchers[l];
      });
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      delete process.env.SAUCE_USERNAME;
      helper.cleanup(done);
    });

    it('does not add browsers when using saucelabs & browserstack', function(done) {
      process.env.SAUCE_USERNAME = 'test';
      process.env.BROWSER_STACK_USERNAME = 'test';

      var helper = new TestHelper({changePkg: {spellbook: {test: {
        travisBrowsers: ['Chrome']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);

      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.browserStack = {
        captureTimeout: 600,
        pollingTimeout: 30000,
        project: helper.config.name,
        timeout: 600
      };
      expectedConfig.sauceLabs = {};
      expectedConfig.customLaunchers = {};

      Object.keys(browserstack.launchers).concat(Object.keys(saucelabs.launchers)).forEach(function(l) {
        var launcher = saucelabs.launchers[l];

        if (browserstack.launchers[l]) {
          launcher = browserstack.launchers[l];
        }
        expectedConfig.customLaunchers[l] = launcher;
      });

      delete expectedConfig.customLaunchers.ie8_bs;
      delete expectedConfig.customLaunchers.ie8_sl;

      expectedConfig.sauceLabs = {};

      expectedConfig.browsers = Object.keys(expectedConfig.customLaunchers);

      Object.keys(travis.launchers).forEach(function(l) {
        expectedConfig.customLaunchers[l] = travis.launchers[l];
      });

      karmaConfig.browsers = karmaConfig.browsers.sort();
      expectedConfig.browsers = expectedConfig.browsers.sort();

      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      delete process.env.BROWSER_STACK_USERNAME;
      delete process.env.SAUCE_USERNAME;
      helper.cleanup(done);
    });
  });


  parallel('teamcity', function() {
    beforeEach(function() {
      process.env.TEAMCITY_VERSION = 'test';
    });

    afterEach(function() {
      delete process.env.TEAMCITY_VERSION;
    });

    it('default browsers', function(done) {
      var helper = new TestHelper();

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = true;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.reporters.push('teamcity');

      expectedConfig.browsers = [];

      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      helper.cleanup(done);
    });


    it('custom browsers', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        teamcityBrowsers: ['Chrome']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.reporters.push('teamcity');

      expectedConfig.browsers = ['Chrome'];

      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      helper.cleanup(done);
    });

    it('does not add browsers when using browserstack', function(done) {
      process.env.BROWSER_STACK_USERNAME = 'test';
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        teamcityBrowsers: ['Chrome']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.reporters.push('teamcity');
      expectedConfig.browserStack = {
        captureTimeout: 600,
        pollingTimeout: 30000,
        project: helper.config.name,
        timeout: 600
      };
      expectedConfig.customLaunchers = browserstack.launchers;
      delete expectedConfig.customLaunchers.ie8_bs;

      expectedConfig.browsers = Object.keys(expectedConfig.customLaunchers);
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      delete process.env.BROWSER_STACK_USERNAME;
      helper.cleanup(done);
    });

    it('does not add browsers when using saucelabs', function(done) {
      process.env.SAUCE_USERNAME = 'test';
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        teamcityBrowsers: ['Chrome']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.customLaunchers = expectedConfig.customLaunchers || {};
      expectedConfig.reporters.push('teamcity');
      expectedConfig.sauceLabs = {};

      Object.keys(saucelabs.launchers).forEach(function(l) {
        expectedConfig.customLaunchers[l] = saucelabs.launchers[l];
      });

      delete expectedConfig.customLaunchers.ie8_bs;
      delete expectedConfig.customLaunchers.ie8_sl;

      expectedConfig.browsers = Object.keys(expectedConfig.customLaunchers);
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      delete process.env.SAUCE_USERNAME;
      helper.cleanup(done);
    });

    it('does not add browsers when using saucelabs & browserstack', function(done) {
      process.env.SAUCE_USERNAME = 'test';
      process.env.BROWSER_STACK_USERNAME = 'test';
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        teamcityBrowsers: ['Chrome']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.reporters.push('teamcity');

      expectedConfig.browserStack = {
        captureTimeout: 600,
        pollingTimeout: 30000,
        project: helper.config.name,
        timeout: 600
      };
      expectedConfig.sauceLabs = {};
      expectedConfig.customLaunchers = {};

      Object.keys(browserstack.launchers).concat(Object.keys(saucelabs.launchers)).forEach(function(l) {
        var launcher = saucelabs.launchers[l];

        if (browserstack.launchers[l]) {
          launcher = browserstack.launchers[l];
        }
        expectedConfig.customLaunchers[l] = launcher;
      });

      delete expectedConfig.customLaunchers.ie8_bs;
      delete expectedConfig.customLaunchers.ie8_sl;

      expectedConfig.browsers = Object.keys(expectedConfig.customLaunchers);

      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      delete process.env.SAUCE_USERNAME;
      delete process.env.BROWSER_STACK_USERNAME;
      helper.cleanup(done);
    });
  });


  parallel('development', function() {
    it('should add browsers by default and not on ci', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        devBrowsers: ['Chrome', 'Firefox']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.browsers = ['Chrome', 'Firefox'];
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      helper.cleanup(done);
    });

    // verify that browsers are not added during watch
    it('does not add browsers during watch', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        devBrowsers: ['Chrome', 'Firefox']
      }}}});

      var karmaConfig = GetKarmaConfig({watch: true}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;
      expectedConfig.singleRun = false;

      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      helper.cleanup(done);
    });

    it('does not add browsers when browsers are manually specified', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        devBrowsers: ['Chrome', 'Firefox']
      }}}});

      var karmaConfig = GetKarmaConfig({browsers: 'safari'}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.browsers = ['Safari'];
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      helper.cleanup(done);
    });

    // verify that browsers are not added during ci
    it('does not add browsers when using saucelabs', function(done) {
      process.env.SAUCE_USERNAME = 'test';
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        devBrowsers: ['Chrome', 'Firefox']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.sauceLabs = {};
      expectedConfig.customLaunchers = {};

      Object.keys(saucelabs.launchers).forEach(function(l) {
        var launcher = saucelabs.launchers[l];

        expectedConfig.customLaunchers[l] = launcher;
      });

      delete expectedConfig.customLaunchers.ie8_sl;

      expectedConfig.browsers = Object.keys(expectedConfig.customLaunchers);

      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      delete process.env.SAUCE_USERNAME;
      helper.cleanup(done);
    });

    it('does not add browsers when using browserstack', function(done) {
      process.env.BROWSER_STACK_USERNAME = 'test';

      var helper = new TestHelper({changePkg: {spellbook: {test: {
        devBrowsers: ['Chrome', 'Firefox']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.browserStack = {
        captureTimeout: 600,
        pollingTimeout: 30000,
        project: helper.config.name,
        timeout: 600
      };
      expectedConfig.customLaunchers = {};

      Object.keys(browserstack.launchers).forEach(function(l) {
        var launcher = browserstack.launchers[l];

        expectedConfig.customLaunchers[l] = launcher;
      });

      delete expectedConfig.customLaunchers.ie8_bs;
      expectedConfig.browsers = Object.keys(expectedConfig.customLaunchers);
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      delete process.env.BROWSER_STACK_USERNAME;
      helper.cleanup(done);
    });


    it('does not add browsers when using travis', function(done) {
      process.env.TRAVIS = 'test';
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        devBrowsers: ['Safari']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = false;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.customLaunchers = {};

      Object.keys(travis.launchers).forEach(function(l) {
        var launcher = travis.launchers[l];

        expectedConfig.customLaunchers[l] = launcher;
      });

      expectedConfig.browsers = ['Firefox', 'travis_chrome'];
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');

      delete process.env.TRAVIS;
      helper.cleanup(done);
    });

    it('does not add browsers when using teamcity', function(done) {
      process.env.TEAMCITY_VERSION = 'test';

      var helper = new TestHelper({changePkg: {spellbook: {test: {
        devBrowsers: ['Chrome', 'Firefox']
      }}}});

      var karmaConfig = GetKarmaConfig({}, helper.config);
      var expectedConfig = GetDefaults(helper.config, helper.projectDir);
      expectedConfig.detectBrowsers.enabled = true;
      delete karmaConfig.detectBrowsers.postDetection;

      expectedConfig.reporters.push('teamcity');
      expectedConfig.browsers = [];
      assert.deepEqual(karmaConfig, expectedConfig, 'returns defaults');
      delete process.env.TEAMCITY_VERSION;
      helper.cleanup(done);
    });
  });

  parallel('detect', function() {
    it('should skip nothing by default', function(done) {
      var helper = new TestHelper();
      var karmaConfig = GetKarmaConfig({}, helper.config);

      var newBrowsers = karmaConfig.detectBrowsers.postDetection(['Safari', 'Chrome']);

      assert.deepEqual(newBrowsers, ['Safari', 'Chrome'], 'returns defaults');
      helper.cleanup(done);
    });

    it('should skip specified browsers by default', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        skipBrowsers: ['Safari']
      }}}});
      var karmaConfig = GetKarmaConfig({}, helper.config);

      var newBrowsers = karmaConfig.detectBrowsers.postDetection(['Safari', 'Chrome']);

      assert.deepEqual(newBrowsers, ['Chrome'], 'returns defaults');
      helper.cleanup(done);
    });

    it('should skip specified browsers even with weird name casing by default', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {test: {
        skipBrowsers: ['safari']
      }}}});
      var karmaConfig = GetKarmaConfig({}, helper.config);

      var newBrowsers = karmaConfig.detectBrowsers.postDetection(['Safari', 'Chrome']);

      assert.deepEqual(newBrowsers, ['Chrome'], 'returns defaults');
      helper.cleanup(done);
    });
  });
});
