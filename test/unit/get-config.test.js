var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var parallel = require('mocha.parallel');
var GetConfig = require('../../src/utils/get-config');

var GetDefaults = function(pkg, baseDir) {
  return {
    "name": pkg.name,
    "author": "Brandon 'Casey <someemail@lol.com> (http://foo.bar.com)",
    "scope": "",
    "version": pkg.version,
    "path": baseDir,
    "main": path.join(baseDir, pkg.main),
    "jsNextMain": path.join(baseDir, pkg['jsnext:main']),
    "logLevel": "info",
    "ie8": false,
    "shim": {
      "qunitjs": {exports: "global:QUnit" },
      "qunit": {exports: "global:QUnit" },
      "sinon": {exports: "global:sinon" },
      "video.js": {exports: "global:videojs"},
    },
    "bannerObj": {
      "name": pkg.name,
      "version": pkg.version,
      "author": "Brandon 'Casey <someemail@lol.com> (http://foo.bar.com)",
      "license": "MIT"
    },
    "docs": {
      "src": path.join(baseDir, 'docs'),
      "dist": path.join(baseDir, 'build', 'docs'),
      "build": true,
      "lint": true
    },
    "lang": {
      "src": path.join(baseDir, 'lang'),
      "dist": path.join(baseDir, 'dist', 'lang'),
      "build": true,
      "lint": true
    },
    "test": {
      "src": path.join(baseDir, 'test'),
      "dist": path.join(baseDir, 'build', 'test'),
      "skipBrowsers": [],
      "travisBrowsers": [],
      "teamcityBrowsers": [],
      "bsBrowsers": [],
      "slBrowsers": [],
      "devBrowsers": [],
      "files": [],
      "build": true,
      "lint": true,
      "node": true,
      "bundlers": ["webpack", "browserify"]
    },
    "css": {
      "src": path.join(baseDir, 'src', 'css'),
      "dist": path.join(baseDir, 'dist'),
      "browserList": ["> 1%", "last 4 versions", "Firefox ESR"],
      "build": true,
      "lint": true
    },
    "js": {
      "src": path.join(baseDir, 'src', 'js'),
      "distBrowser": path.join(baseDir, 'dist'),
      "distNode": path.join(baseDir, 'build', 'es5'),
      "build": true,
      "lint": true
    }
  };
};

describe('get-config:sync', function() {
  it('process.env.SB_LOG_LEVEL should change log level to false', function(done) {
    var sb = {};

    process.env.SB_LOG_LEVEL = false;

    var helper = new TestHelper({changePkg: {spellbook: sb}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.logLevel = false;

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'log level is changed'
    );
    delete process.env.SB_LOG_LEVEL;
    helper.cleanup(done);
  });

  it('process.env.SB_LOG_LEVEL should change log level to debug', function(done) {
    var sb = {};

    process.env.SB_LOG_LEVEL = 'debug';

    var helper = new TestHelper({changePkg: {spellbook: sb}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.logLevel = 'debug';

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'log level is changed'
    );
    delete process.env.SB_LOG_LEVEL;
    helper.cleanup(done);
  });

});

parallel('get-config:async', function() {
  it('should return defaults', function(done) {
    var helper = new TestHelper();

    assert.deepEqual(
      GetConfig(helper.projectDir),
      GetDefaults(helper.getPkg(), helper.projectDir),
      'returns defaults'
    );
    helper.cleanup(done);
  });

  it('logLevel should change log level to false', function(done) {
    var sb = {};

    sb.logLevel = false;

    var helper = new TestHelper({changePkg: {spellbook: sb}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.logLevel = false;

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'log level is changed'
    );
    helper.cleanup(done);
  });

  it('logLevel should change log level to debug', function(done) {
    var sb = {};

    sb.logLevel = 'debug';

    var helper = new TestHelper({changePkg: {spellbook: sb}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.logLevel = 'debug';


    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'log level is changed'
    );
    helper.cleanup(done);
  });

  it('should change ie8', function(done) {
    var sb = {};
    sb['ie8'] = false;

    var helper = new TestHelper({changePkg: {spellbook: sb}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.ie8 = false;


    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'ie8 is off'
    );
    helper.cleanup(done);
  });

  it('should change browser list', function(done) {
    var sb = {css: {'browserList': ['foo']}};
    var helper = new TestHelper({changePkg: {spellbook: sb}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.css.browserList = ['foo'];

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'browser list is changed'
    );
    helper.cleanup(done);
  });

  it('should merge shims', function(done) {
    var sb = {shim: {
      'foo': 'global:Foo',
      'bar': {exports: 'global:BAR'}
    }};
    var helper = new TestHelper({changePkg: {spellbook: sb}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.shim.foo = {exports: 'global:Foo'};
    expectedConfig.shim.bar = {exports: 'global:BAR'};

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'shims were merged'
    );
    helper.cleanup(done);
  });

  it('should remove shims', function(done) {
    var sb = {shim: {'video.js': false}};
    var helper = new TestHelper({changePkg: {spellbook: sb}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);

    delete expectedConfig.shim['video.js'];

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'shim is removed'
    );
    helper.cleanup(done);
  });

  it('should turn off all shims', function(done) {
    var sb = {shim: false};
    var helper = new TestHelper({changePkg: {spellbook: sb}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.shim = {};

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'all shims are off'
    );
    helper.cleanup(done);
  });

  it('should work with special characters for author', function(done) {
    var author = 'some \' body @ that cool place.com';
    var helper = new TestHelper({changePkg: {author: author}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.author = author;
    expectedConfig.bannerObj.author = author;

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'author is changed'
    );
    helper.cleanup(done);
  });

  it('should work with simple author', function(done) {
    var author = 'Author Name';
    var helper = new TestHelper({changePkg: {author: author}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.author = author;
    expectedConfig.bannerObj.author = author;

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'author is changed'
    );
    helper.cleanup(done);
  });

  it('should work with an string author array (with a warning)', function(done) {
    var author = ['Author Name', 'Author Name 2'];
    var authorString = 'Author Name';
    var helper = new TestHelper({changePkg: {author: author}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.author = authorString;
    expectedConfig.bannerObj.author = authorString;

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'author is changed'
    );
    helper.cleanup(done);
  });

  it('should work with an string author object array (with a warning)', function(done) {
    var author = [{name: 'Author Name'}, {name: 'Author Name 2'}];
    var authorString = 'Author Name';
    var helper = new TestHelper({changePkg: {author: author}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.author = authorString;
    expectedConfig.bannerObj.author = authorString;

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'author is changed'
    );
    helper.cleanup(done);
  });

  it('should work with author object', function(done) {
    var author = {name: 'Author Name', email: 'author@author.com', url: 'author.com'};
    var authorString = 'Author Name <author@author.com> (author.com)';
    var helper = new TestHelper({changePkg: {author: author}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.author = authorString;
    expectedConfig.bannerObj.author = authorString;

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'author is changed'
    );
    helper.cleanup(done);
  });

  it('should work with author object missing email', function(done) {
    var author = {name: 'Author Name', url: 'author.com'};
    var authorString = 'Author Name (author.com)';
    var helper = new TestHelper({changePkg: {author: author}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.author = authorString;
    expectedConfig.bannerObj.author = authorString;

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'author is changed'
    );
    helper.cleanup(done);
  });

  it('should work with author object missing url', function(done) {
    var author = {name: 'Author Name', email: 'author@author.com'};
    var authorString = 'Author Name <author@author.com>';
    var helper = new TestHelper({changePkg: {author: author}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.author = authorString;
    expectedConfig.bannerObj.author = authorString;

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'author is changed'
    );
    helper.cleanup(done);
  });

  it('should work with author object missing email and url', function(done) {
    var author = {name: 'Author Name'};
    var authorString = 'Author Name';
    var helper = new TestHelper({changePkg: {author: author}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.author = authorString;
    expectedConfig.bannerObj.author = authorString;

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'author is changed'
    );
    helper.cleanup(done);
  });

  it('should work with a scoped package', function(done) {
    var name = '@something/lol';
    var helper = new TestHelper({changePkg: {name: name}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.name = 'lol';
    expectedConfig.scope = '@something';
    expectedConfig.bannerObj.name = name;

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'scope is changed'
    );
    helper.cleanup(done);
  });

  // TODO:
  // * change test settings

  ['docs', 'lang', 'test', 'js', 'css'].forEach(function(type) {
    it('should be able to turn ' + type + ' off', function(done) {
      var sb = {};
      sb[type] = false;

      var helper = new TestHelper({changePkg: {spellbook: sb}});
      var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
      expectedConfig[type] = false;

      assert.deepEqual(
        GetConfig(helper.projectDir),
        expectedConfig,
        type + ' is turned off'
      );
      helper.cleanup(done);
    });

    it('should be able to turn ' + type + ' linting off', function(done) {
      var sb = {};
      sb[type] = {lint: false};

      var helper = new TestHelper({changePkg: {spellbook: sb}});
      var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
      expectedConfig[type] = Object.assign(expectedConfig[type], {lint: false});

      assert.deepEqual(
        GetConfig(helper.projectDir),
        expectedConfig,
        type + ' is linting turned off'
      );
      helper.cleanup(done);
    });

    it('should be able to turn ' + type + ' build off', function(done) {
      var sb = {};
      sb[type] = {build: false};

      var helper = new TestHelper({changePkg: {spellbook: sb}});
      var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
      expectedConfig[type] = Object.assign(expectedConfig[type], {build: false});

      assert.deepEqual(
        GetConfig(helper.projectDir),
        expectedConfig,
        type + ' build is turned off'
      );
      helper.cleanup(done);
    });

    it('should be able to change src for ' + type, function(done) {
      var sb = {};
      sb[type] = {src: './cow'};

      var helper = new TestHelper({changePkg: {spellbook: sb}});
      var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
      expectedConfig[type].src = path.join(helper.projectDir, 'cow');

      assert.deepEqual(
        GetConfig(helper.projectDir),
        expectedConfig,
        type + ' src is changed'
      );
      helper.cleanup(done);
    });

    if (type !== 'js') {
      it('should be able to change dist for ' + type, function(done) {
        var sb = {};
        sb[type] = {dist: './cow'};

        var helper = new TestHelper({changePkg: {spellbook: sb}});
        var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
        expectedConfig[type].dist = path.join(helper.projectDir, 'cow');

        assert.deepEqual(
          GetConfig(helper.projectDir),
          expectedConfig,
          type + ' dist is changed'
        );
        helper.cleanup(done);
      });
    } else {
      it('should be able to change browser dist for ' + type, function(done) {
        var sb = {};
        sb[type] = {distBrowser: './cow'};

        var helper = new TestHelper({changePkg: {spellbook: sb}});
        var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
        expectedConfig[type].distBrowser = path.join(helper.projectDir, 'cow');

        assert.deepEqual(
          GetConfig(helper.projectDir),
          expectedConfig,
          type + ' browser dist is changed'
        );
        helper.cleanup(done);
      });

      it('should be able to change node dist for ' + type, function(done) {
        var sb = {};
        sb[type] = {distNode: './cow'};

        var helper = new TestHelper({changePkg: {spellbook: sb}});
        var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
        expectedConfig[type].distNode = path.join(helper.projectDir, 'cow');

        assert.deepEqual(
          GetConfig(helper.projectDir),
          expectedConfig,
          type + ' node dist is changed'
        );
        helper.cleanup(done);
      });
    }
  });

  it('should be able to turn node testing off', function(done) {
    var sb = {};
    sb.test = {node: false};

    var helper = new TestHelper({changePkg: {spellbook: sb}});
    var expectedConfig = GetDefaults(helper.getPkg(), helper.projectDir);
    expectedConfig.test = Object.assign(expectedConfig.test, {node: false});

    assert.deepEqual(
      GetConfig(helper.projectDir),
      expectedConfig,
      'node testing is turned off'
    );
    helper.cleanup(done);
  });

});
