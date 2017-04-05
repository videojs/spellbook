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
    lines: 14,
    doubleLines: 18,
    file: 'src/css/index.css'
  },
  'sb-lint-css-sass': {
    lines: 12,
    doubleLines: 15,
    file: 'src/css/index.scss'
  },
  'sb-lint-docs-examples': {
    lines: 8,
    doubleLines: 11,
    file: 'docs/index.md'
  },
  'sb-lint-docs-md': {
    lines: 10,
    doubleLines: 16,
    file: 'docs/index.md'
  },
  'sb-lint-lang-src': {
    lines: 9,
    doubleLines: 13,
    file: 'lang/index.json'
  },
  'sb-lint-js-src': {
    lines: 13,
    doubleLines: 21,
    file: 'src/js/index.js'
  },
  'sb-lint-test-src': {
    lines: 7,
    doubleLines: 9,
    file: 'test/index.test.js'
  },
};

// tests binaries that lint more than one thing
var manyTests = {};

// css
['sb-lint-css', 'sb-lint-css-all'].forEach(function(binName) {
  manyTests[binName] = {
    lines: tests['sb-lint-css-css'].lines + tests['sb-lint-css-sass'].lines,
    doubleLines: tests['sb-lint-css-css'].doubleLines + tests['sb-lint-css-sass'].doubleLines
  };
});

// js
['sb-lint-js', 'sb-lint-js-all'].forEach(function(binName) {
  manyTests[binName] = {
    lines: tests['sb-lint-js-src'].lines,
    doubleLines: tests['sb-lint-js-src'].doubleLines
  };
});

// test
['sb-lint-test', 'sb-lint-test-all'].forEach(function(binName) {
  manyTests[binName] = {
    lines: tests['sb-lint-test-src'].lines,
    doubleLines: tests['sb-lint-test-src'].doubleLines
  };
});

// lang
['sb-lint-lang', 'sb-lint-lang-all'].forEach(function(binName) {
  manyTests[binName] = {
    lines: tests['sb-lint-lang-src'].lines,
    doubleLines: tests['sb-lint-lang-src'].doubleLines
  };
});

// docs
['sb-lint-docs', 'sb-lint-docs-all'].forEach(function(binName) {
  manyTests[binName] = {
    lines: tests['sb-lint-docs-md'].lines + tests['sb-lint-docs-examples'].lines,
    doubleLines: tests['sb-lint-docs-md'].doubleLines + tests['sb-lint-docs-examples'].doubleLines
  };
});

// TODO: --fix, --errors
parallel('linters:single', function() {
  Object.keys(tests).forEach(function(binName) {
    var testProps = tests[binName];

    it(binName + ' should lint default files with no args', function(done) {
      var helper = new TestHelper();

      helper.exec(binName, function(code, stdout, stderr) {
        var lines = stderr.length + stdout.length;

        assert.notEqual(code, 0, 'should not return 0');
        assert.equal(lines, testProps.lines, 'should print ' + testProps.lines + ' lines');
        helper.cleanup(done);
      });
    });

    it(binName + ' should lint custom dir', function(done) {
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

    it(binName + ' should lint custom file', function(done) {
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

    it(binName + ' should lint two files', function(done) {
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

    it(binName + ' should lint custom glob', function(done) {
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
  });
});

parallel('linters:multiple', function() {
  Object.keys(manyTests).forEach(function(binName) {
    var testProps = manyTests[binName];

    it(binName + ' should lint default files with no args', function(done) {
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
  });
});
