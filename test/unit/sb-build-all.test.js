var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require(path.join(TestHelper.rootDir, 'src', 'utils', 'paths-exist'));
var glob = require('glob');
var pkgName = require(path.join(TestHelper.fixtureDir, 'package.json')).name;
var parallel = require('mocha.parallel');

var tests = {
  'sb-build-css-sass': {
    src: 'css',
    dist: 'browser',
    files: [
      pkgName + '.css',
      pkgName + '.css.map',
      pkgName + '.min.css',
      pkgName + '.min.css.map'
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
      pkgName + '.js',
      pkgName + '.js.map',
      pkgName + '.min.js',
      pkgName + '.min.js.map'
    ],
  },
  'sb-build-js-browser-test': {
    src: 'test',
    dist: 'test',
    files: [pkgName + '.test.js']
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
    var binFile = path.join('node_modules', '.bin', binName) + ' ';

    it(binName + ' should build default files with no args', function(done) {
      var helper = new TestHelper();

      shelljs.exec(binFile, function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr);

        assert.equal(code, 0, 'should return 0');
        assert.equal(
          PathsExist(path.join(helper.config.dist, testProps.dist)),
          true,
          'new dist folder should exist'
        );

        testProps.files.forEach(function(file) {
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
