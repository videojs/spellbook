var assert = require('chai').assert;
var shelljs = require('shelljs');
var mkdirp = require('mkdirp');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var glob = require('glob');
var parallel = require('mocha.parallel');

var tests = {
  'sb-lint-css-css': {
    lines: 6,
    doubleLines: 9,
    errorLines: 5,
    fixLines: 7,
    file: 'src/css/index.css'
  },
  'sb-lint-css-sass': {
    lines: 6,
    doubleLines: 9,
    errorLines: 5,
    fixLines: 7,
    file: 'src/css/index.scss'
  },
  'sb-lint-docs-examples': {
    lines: 9,
    doubleLines: 13,
    errorLines: 8,
    fixLines: 10,
    file: 'docs/index.md'
  },
  'sb-lint-docs-md': {
    lines: 11,
    doubleLines: 18,
    errorLines: 10,
    fixLines: 10,
    file: 'docs/index.md'
  },
  'sb-lint-lang-src': {
    lines: 9,
    doubleLines: 13,
    errorLines: 9,
    fixLines: 10,
    file: 'lang/index.json'
  },
  'sb-lint-js-src': {
    lines: 13,
    doubleLines: 21,
    errorLines: 9,
    fixLines: 11,
    file: 'src/js/index.js'
  },
  'sb-lint-test-src': {
    lines: 9,
    doubleLines: 13,
    errorLines: 8,
    fixLines: 8,
    file: 'test/index.test.js'
  },
};

// tests binaries that lint more than one thing
var manyTests = {};

// css
['sb-lint-css', 'sb-lint-css-all'].forEach(function(binName) {
  manyTests[binName] = {
    lines: tests['sb-lint-css-css'].lines + tests['sb-lint-css-sass'].lines,
    doubleLines: tests['sb-lint-css-css'].doubleLines + tests['sb-lint-css-sass'].doubleLines,
    errorLines: tests['sb-lint-css-css'].errorLines + tests['sb-lint-css-css'].errorLines,
    fixLines: tests['sb-lint-css-css'].fixLines + tests['sb-lint-css-css'].fixLines
  };
});

// js
['sb-lint-js', 'sb-lint-js-all'].forEach(function(binName) {
  manyTests[binName] = {
    lines: tests['sb-lint-js-src'].lines,
    doubleLines: tests['sb-lint-js-src'].doubleLines,
    errorLines: tests['sb-lint-js-src'].errorLines,
    fixLines: tests['sb-lint-js-src'].fixLines
  };
});

// test
['sb-lint-test', 'sb-lint-test-all'].forEach(function(binName) {
  manyTests[binName] = {
    lines: tests['sb-lint-test-src'].lines,
    doubleLines: tests['sb-lint-test-src'].doubleLines,
    errorLines: tests['sb-lint-test-src'].errorLines,
    fixLines: tests['sb-lint-test-src'].fixLines
  };
});

// lang
['sb-lint-lang', 'sb-lint-lang-all'].forEach(function(binName) {
  manyTests[binName] = {
    lines: tests['sb-lint-lang-src'].lines,
    doubleLines: tests['sb-lint-lang-src'].doubleLines,
    errorLines: tests['sb-lint-lang-src'].errorLines,
    fixLines: tests['sb-lint-lang-src'].fixLines
  };
});

// docs
['sb-lint-docs', 'sb-lint-docs-all'].forEach(function(binName) {
  manyTests[binName] = {
    lines: tests['sb-lint-docs-md'].lines + tests['sb-lint-docs-examples'].lines,
    doubleLines: tests['sb-lint-docs-md'].doubleLines + tests['sb-lint-docs-examples'].doubleLines,
    errorLines: tests['sb-lint-docs-md'].errorLines + tests['sb-lint-docs-examples'].errorLines,
    fixLines: tests['sb-lint-docs-md'].fixLines + tests['sb-lint-docs-examples'].fixLines
  };
});

['sb-lint', 'sb-lint-all'].forEach(function(binName) {
  var lines = 15;
  var doubleLines = 15;
  var errorLines = 15;
  var fixLines = 15;

  ['sb-lint-docs', 'sb-lint-lang', 'sb-lint-js', 'sb-lint-test', 'sb-lint-css'].forEach(function(b) {
    lines += manyTests[b].lines;
    doubleLines += manyTests[b].doubleLines;
    errorLines += manyTests[b].errorLines;
    fixLines += manyTests[b].fixLines;
  });

  manyTests[binName] = {
    lines: lines,
    doubleLines: doubleLines,
    errorLines: errorLines,
    fixLines: fixLines
  };
});

describe('lint:sanity', function() {
  var singleBins = Object.keys(tests);
  var muitiBins = Object.keys(manyTests);

  it('all binaries are being tested', function() {
    var binaries = TestHelper.prototype.getBinList();

    binaries.forEach(function(bin) {
      // skip non lint bins
      if (!(/^sb-lint/).test(bin)) {
        return;
      }

      var tested = false;

      if (singleBins.indexOf(bin) !== -1 || muitiBins.indexOf(bin) !== -1) {
        tested = true;
      }

      assert.ok(tested, bin + ' is being tested');
    });
  });
});

describe('lint:single', function() {
  Object.keys(tests).forEach(function(binName) {
    var testProps = tests[binName];

    parallel(binName, function() {
      it(binName + ' should lint default files with no args', function(done) {
        var helper = new TestHelper();

        helper.exec(binName, function(code, stdout, stderr) {
          var lines = stderr.length + stdout.length;

          assert.notEqual(code, 0, 'should not return 0');
          assert.equal(lines, testProps.lines, 'should print ' + testProps.lines + ' lines');
          helper.cleanup(done);
        });
      });

      it('should lint custom dir', function(done) {
        var helper = new TestHelper();
        var newsrc = path.join(helper.config.path, 'newsrc');

        mkdirp.sync(newsrc);
        shelljs.mv(path.join(helper.config.path, testProps.file), newsrc);
        helper.exec(binName, [newsrc], function(code, stdout, stderr) {
          var lines = stderr.length + stdout.length;

          assert.notEqual(code, 0, 'should not return 0');
          assert.equal(lines, testProps.lines, 'should print ' + testProps.lines + ' lines');
          helper.cleanup(done);
        });
      });

      it('should lint custom file', function(done) {
        var helper = new TestHelper();
        var oldsrc = path.join(helper.config.path, testProps.file);
        var newsrc = path.join(helper.config.path, 'newsrc' + path.extname(oldsrc));

        shelljs.mv(oldsrc, newsrc);
        helper.exec(binName, [newsrc], function(code, stdout, stderr) {
          var lines = stderr.length + stdout.length;

          assert.notEqual(code, 0, 'should not return 0');
          assert.equal(lines, testProps.lines, 'should print ' + testProps.lines + ' lines');
          helper.cleanup(done);
        });
      });

      it('should lint two files', function(done) {
        var helper = new TestHelper();
        var oldsrc = path.join(helper.config.path, testProps.file);
        var newsrc = path.join(helper.config.path, 'newsrc' + path.extname(oldsrc));

        shelljs.cp(oldsrc, newsrc);
        helper.exec(binName, [newsrc, oldsrc], function(code, stdout, stderr) {
          var lines = stderr.length + stdout.length;

          assert.notEqual(code, 0, 'should not return 0');
          assert.equal(lines, testProps.doubleLines, 'should print ' + testProps.doubleLines + ' lines');
          helper.cleanup(done);
        });
      });

      it('should lint custom glob', function(done) {
        var helper = new TestHelper();
        var glob = path.join(
          helper.config.path,
          path.dirname(testProps.file),
          '*.' + path.extname(testProps.file)
        );

        helper.exec(binName, [], function(code, stdout, stderr) {
          var lines = stderr.length + stdout.length;

          assert.notEqual(code, 0, 'should return 0');
          assert.equal(lines, testProps.lines, 'should print ' + testProps.lines + ' lines');
          helper.cleanup(done);
        });
      });

      it('should work with --errors', function(done) {
        var helper = new TestHelper();
        var glob = path.join(
          helper.config.path,
          path.dirname(testProps.file),
          '*.' + path.extname(testProps.file)
        );

        helper.exec(binName, ['--errors'], function(code, stdout, stderr) {
          var lines = stderr.length + stdout.length;

          assert.notEqual(code, 0, 'should not return 0');
          assert.equal(lines, testProps.errorLines, 'should print ' + testProps.errorLines + ' lines');
          helper.cleanup(done);
        });
      });

      it('should work with --fix', function(done) {
        var helper = new TestHelper();
        var glob = path.join(
          helper.config.path,
          path.dirname(testProps.file),
          '*.' + path.extname(testProps.file)
        );

        helper.exec(binName, ['--fix'], function(code, stdout, stderr) {
          var lines = stderr.length + stdout.length;

          assert.notEqual(code, 0, 'should not return 0');
          assert.equal(lines, testProps.fixLines, 'should print ' + testProps.fixLines + ' lines');
          helper.cleanup(done);
        });
      });
    });
  });
});

describe('lint:multiple', function() {
  Object.keys(manyTests).forEach(function(binName) {

    parallel(binName, function() {
      var testProps = manyTests[binName];

      it('should lint default files with no args', function(done) {
        var helper = new TestHelper();

        helper.exec(binName, function(code, stdout, stderr) {
          var lines = stderr.length + stdout.length - 3;

          // -all binaries will have two less lines than
          // non-all binaies because the non -all ones
          // run the -all binaries
          if (!(/-all$/).test(binName)) {
            lines -= 2;
          }

          assert.notEqual(code, 0, 'should not return 0');
          assert.equal(lines, testProps.lines, 'should print ' + testProps.lines + ' lines');
          helper.cleanup(done);
        });
      });

      it('should lint default files with --errors', function(done) {
        var helper = new TestHelper();

        helper.exec(binName, ['--errors'], function(code, stdout, stderr) {
          var lines = stderr.length + stdout.length - 3;

          // -all binaries will have two less lines than
          // non-all binaies because the non -all ones
          // run the -all binaries
          if (!(/-all$/).test(binName)) {
            lines -= 2;
          }

          assert.notEqual(code, 0, 'should not return 0');
          assert.equal(lines, testProps.errorLines, 'should print ' + testProps.errorLines + ' lines');
          helper.cleanup(done);
        });
      });

      it('should lint default files with --fix', function(done) {
        var helper = new TestHelper();

        helper.exec(binName, ['--fix'], function(code, stdout, stderr) {
          var lines = stderr.length + stdout.length - 3;

          // -all binaries will have two less lines than
          // non-all binaies because the non -all ones
          // run the -all binaries
          if (!(/-all$/).test(binName)) {
            lines -= 2;
          }

          assert.notEqual(code, 0, 'should not return 0');
          assert.equal(lines, testProps.fixLines, 'should print ' + testProps.fixLines + ' lines');
          helper.cleanup(done);
        });
      });
    });
  });
});
