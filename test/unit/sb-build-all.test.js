var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var glob = require('glob');
var parallel = require('mocha.parallel');

var tests = {
  'sb-build-css-sass': {
    src: 'css',
    dist: 'browser',
    files: [
      function(pkgName) { return pkgName + '.css';},
      function(pkgName) { return pkgName + '.css.map';},
      function(pkgName) { return pkgName + '.min.css';},
      function(pkgName) { return pkgName + '.min.css.map';},
    ],
  },
  'sb-build-docs-api': {
    src: 'js',
    dist: 'docs/api',
    files: ['index.html']
  },
  'sb-build-docs-manual': {
    src: 'docs',
    dist: 'docs/manual',
    files: ['index.html']
  },
  'sb-build-i18n': {
    src: 'i18n',
    dist: 'i18n',
    files: ['index.json']
  },
  'sb-build-js-browser-main': {
    src: 'js',
    dist: 'browser',
    files: [
      function(pkgName) { return pkgName + '.js';},
      function(pkgName) { return pkgName + '.js.map';},
      function(pkgName) { return pkgName + '.min.js';},
      function(pkgName) { return pkgName + '.min.js.map';},
    ],
  },
  'sb-build-js-browser-test': {
    src: 'test',
    dist: 'test',
    files: [
      function(pkgName) { return pkgName + '.test.js';}
    ]
  },
  'sb-build-js-npm': {
    src: 'js',
    dist: 'npm',
    files: ['index.js']
  },
  'sb-build-js-bundles': {
    src: 'js',
    dist: 'test',
    files: ['rollup.test.js', 'webpack.test.js', 'browserify.test.js']
  }
};

parallel('build', function() {
  Object.keys(tests).forEach(function(binName) {
    var testProps = tests[binName];

    it(binName + ' should build default files with no args', function(done) {
      var helper = new TestHelper();

      helper.exec(binName, function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return 0');
        assert.equal(
          PathsExist(path.join(helper.config.dist, testProps.dist)),
          true,
          'new dist folder should exist'
        );

        testProps.files.forEach(function(file) {
          if (typeof file === 'function') {
            file = file(helper.config.name);
          }
          assert.equal(
            PathsExist(path.join(helper.config.dist, testProps.dist, file)),
            true,
            'new dist file ' + file + ' should exist'
          );
        });

        helper.cleanup(done);
      });
    });
  });
});
