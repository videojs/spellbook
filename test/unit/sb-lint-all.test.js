var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var glob = require('glob');
var parallel = require('mocha.parallel');

var tests = {
  'sb-lint-css-sass': {
    'stderr': 0,
    'stdout': 11,
    'doubleStderr': 0,
    'doubleStdout': 14,
    'dir': 'css',
  },
  'sb-lint-docs-examples': {
    'stderr': 0,
    'stdout': 7,
    'doubleStderr': 0,
    'doubleStdout': 10,
    'dir': 'docs'
  },
  'sb-lint-docs-md': {
    'stderr': 5,
    'stdout': 2,
    'doubleStderr': 9,
    'doubleStdout': 2,
    'dir': 'docs'
  },
  'sb-lint-i18n': {
    'stderr': 0,
    'stdout': 8,
    'doubleStderr': 0,
    'doubleStdout': 12,
    'dir': 'i18n'
  },
  'sb-lint-js': {
    'stderr': 0,
    'stdout': 9,
    'doubleStderr': 0,
    'doubleStdout': 14,
    'dir': 'js'
  },
};

// TODO: --fix, --errors
parallel('linters', function() {
  Object.keys(tests).forEach(function(binName) {
    var testProps = tests[binName];

    it(binName + ' should lint default files with no args', function(done) {
      var helper = new TestHelper();

      helper.exec(binName, function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return 0');
        assert.equal(stderr.length, testProps.stderr, 'should stderr ' + testProps.stderr + ' lines');
        assert.equal(stdout.length, testProps.stdout, 'should stdout ' + testProps.stdout + ' lines');
        helper.cleanup(done);
      });
    });

    it(binName + ' should lint custom dir', function(done) {
      var helper = new TestHelper();
      var newsrc = path.join(helper.config.src, 'newsrc');

      shelljs.mv(path.join(helper.config.src, testProps.dir), newsrc);
      helper.exec(binName, [newsrc], function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return 0');
        assert.equal(stderr.length, testProps.stderr, 'should stderr ' + testProps.stderr + ' lines');
        assert.equal(stdout.length, testProps.stdout, 'should stdout ' + testProps.stdout + ' lines');
        helper.cleanup(done);
      });
    });

    it(binName + ' should lint custom file', function(done) {
      var helper = new TestHelper();
      var oldsrc = glob.sync(path.join(helper.config.src, testProps.dir, 'index.*'))[0];
      var newsrc = path.join(helper.config.src, 'newsrc' + path.extname(oldsrc));

      shelljs.mv(oldsrc, newsrc);
      helper.exec(binName, [newsrc], function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return 0');
        assert.equal(stderr.length, testProps.stderr, 'should stderr ' + testProps.stderr + ' lines');
        assert.equal(stdout.length, testProps.stdout, 'should stdout ' + testProps.stdout + ' lines');
        helper.cleanup(done);
      });
    });

    it(binName + ' should lint two files', function(done) {
      var helper = new TestHelper();
      var oldsrc = glob.sync(path.join(helper.config.src, testProps.dir, 'index.*'))[0];
      var newsrc = path.join(helper.config.src, 'newsrc' + path.extname(oldsrc));

      shelljs.cp(oldsrc, newsrc);
      helper.exec(binName, [newsrc, oldsrc], function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return 0');
        assert.equal(stderr.length, testProps.doubleStderr, 'should stderr ' + testProps.doubleStderr + ' lines');
        assert.equal(stdout.length, testProps.doubleStdout, 'should stdout ' + testProps.doubleStdout + ' lines');
        helper.cleanup(done);
      });
    });

    it(binName + ' should lint custom glob', function(done) {
      var helper = new TestHelper();

      helper.exec(binName, [path.join(helper.config.src, testProps.dir, '*.*')], function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return 0');
        assert.equal(stderr.length, testProps.stderr, 'should stderr ' + testProps.stderr + ' lines');
        assert.equal(stdout.length, testProps.stdout, 'should stdout ' + testProps.stdout + ' lines');
        helper.cleanup(done);
      });
    });
  });
});
