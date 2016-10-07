var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathExists = require('../src/utils/paths-exist');
var glob = require('glob');

var tests = {
  'sb-build-css-sass': {
    'dir': 'css',
  },
  'sb-build-docs-api': {
    'dir': 'docs'
  },
  'sb-build-docs-manual': {
    'dir': 'docs'
  },
  'sb-build-i18n': {
    'dir': 'i18n'
  },
  'sb-build-js-browser-main': {
    'dir': 'js'
  },
  'sb-build-js-browser-test': {
    'dir': 'test'
  },
  'sb-build-js-npm': {
    'dir': 'js'
  },
  'sb-build-js-bundlers': {
    'dir': 'js'
  }
};

// TODO: --fix, --errors
describe('build', function() {
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
