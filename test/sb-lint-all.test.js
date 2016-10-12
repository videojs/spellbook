var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../src/utils/paths-exist');
var glob = require('glob');

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
    'stdout': 6,
    'doubleStderr': 0,
    'doubleStdout': 9,
    'dir': 'docs'
  },
  'sb-lint-docs-md': {
    'stderr': 4,
    'stdout': 2,
    'doubleStderr': 7,
    'doubleStdout': 2,
    'dir': 'docs'
  },
  'sb-lint-i18n': {
    'stderr': 0,
    'stdout': 7,
    'doubleStderr': 0,
    'doubleStdout': 11,
    'dir': 'i18n'
  },
  'sb-lint-js': {
    'stderr': 0,
    'stdout': 8,
    'doubleStderr': 0,
    'doubleStdout': 13,
    'dir': 'js'
  },
};

// TODO: --fix, --errors
describe('lint', function() {
  Object.keys(tests).forEach(function(binName) {
    var testProps = tests[binName];
    var binFile = path.join(__dirname, '..', 'src', binName) + ' ';

    describe(binName, function() {
      it(binName + ' should lint default files with no args', function(done) {
        var helper = new TestHelper();

        shelljs.exec(binFile, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr);

          assert.equal(code, 0, 'should return 0');
          assert.equal(stderrs.length, testProps.stderr, 'should stderr ' + testProps.stderr + ' lines');
          assert.equal(stdouts.length, testProps.stdout, 'should stdout ' + testProps.stdout + ' lines');
          helper.cleanup(done);
        });
      });

      it(binName + ' should lint custom dir', function(done) {
        var helper = new TestHelper();
        var newsrc = path.join(helper.config.src, 'newsrc');

        shelljs.mv(path.join(helper.config.src, testProps.dir), newsrc);
        shelljs.exec(binFile + newsrc, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr);

          assert.equal(code, 0, 'should return 0');
          assert.equal(stderrs.length, testProps.stderr, 'should stderr ' + testProps.stderr + ' lines');
          assert.equal(stdouts.length, testProps.stdout, 'should stdout ' + testProps.stdout + ' lines');
          helper.cleanup(done);
        });
      });

      it(binName + ' should lint custom file', function(done) {
        var helper = new TestHelper();
        var oldsrc = glob.sync(path.join(helper.config.src, testProps.dir, 'index.*'))[0];
        var newsrc = path.join(helper.config.src, 'newsrc' + path.extname(oldsrc));

        shelljs.mv(oldsrc, newsrc);
        shelljs.exec(binFile + newsrc, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr);

          assert.equal(code, 0, 'should return 0');
          assert.equal(stderrs.length, testProps.stderr, 'should stderr ' + testProps.stderr + ' lines');
          assert.equal(stdouts.length, testProps.stdout, 'should stdout ' + testProps.stdout + ' lines');
          helper.cleanup(done);
        });
      });

      it(binName + ' should lint two files', function(done) {
        var helper = new TestHelper();
        var oldsrc = glob.sync(path.join(helper.config.src, testProps.dir, 'index.*'))[0];
        var newsrc = path.join(helper.config.src, 'newsrc' + path.extname(oldsrc));

        shelljs.cp(oldsrc, newsrc);
        shelljs.exec(binFile + newsrc + ' ' + oldsrc, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr);

          assert.equal(code, 0, 'should return 0');
          assert.equal(stderrs.length, testProps.doubleStderr, 'should stderr ' + testProps.doubleStderr + ' lines');
          assert.equal(stdouts.length, testProps.doubleStdout, 'should stdout ' + testProps.doubleStdout + ' lines');
          helper.cleanup(done);
        });
      });

      it(binName + ' should lint custom glob', function(done) {
        var helper = new TestHelper();

        shelljs.exec(binFile + path.join(helper.config.src, testProps.dir, '*.*'), function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr);

          assert.equal(code, 0, 'should return 0');
          assert.equal(stderrs.length, testProps.stderr, 'should stderr ' + testProps.stderr + ' lines');
          assert.equal(stdouts.length, testProps.stdout, 'should stdout ' + testProps.stdout + ' lines');
          helper.cleanup(done);
        });
      });
    })
  });
})
