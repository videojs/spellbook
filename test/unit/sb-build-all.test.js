var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var glob = require('glob');
var parallel = require('mocha.parallel');
var fs = require('fs');
var pkgName = require('../fixtures/test-pkg-main/package.json').name;

var tests = {
  'sb-build-css-sass': {
    src: 'src/css',
    dist: 'browser',
    files: [
      '.css',
      '.css.map',
      '.min.css',
      '.min.css.map',
    ].map(function(str) { return pkgName + str; }),
  },
  'sb-build-docs-api': {
    src: 'src/js',
    dist: 'docs/api',
    files: ['index.html']
  },
  'sb-build-docs-manual': {
    src: 'docs',
    dist: 'docs/manual',
    files: ['index.html']
  },
  'sb-build-lang-copy': {
    src: 'lang',
    dist: 'lang',
    files: ['index.json']
  },
  'sb-build-js-browser': {
    src: 'src/js',
    dist: 'browser',
    files: [
      '.js',
      '.js.map',
      '.min.js',
      '.min.js.map',
    ].map(function(str) { return pkgName + str; }),
  },
  'sb-build-test-browser': {
    src: 'test',
    dist: 'test',
    files: [
      '.test.js',
    ].map(function(str) { return pkgName + str; }),
  },
  'sb-build-js-node': {
    src: 'src/js',
    dist: 'es5',
    files: ['index.js']
  },
  'sb-build-test-bundlers': {
    src: 'src/js',
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
        var dist = path.join(helper.config.dist, testProps.dist);

        assert.equal(code, 0, 'should return 0');
        assert.equal(PathsExist(dist), true, 'new dist folder ' + dist + ' should exist');

        testProps.files.forEach(function(file) {
          var distFile = path.join(dist, file);
          var expectedFile = path.join(__dirname, '..', 'expected-dist', testProps.dist, file);

          assert.equal(PathsExist(distFile), true, 'new dist file ' + file + ' should exist');
          // map files are always different
          // and the api html file contains a date
          if ((/\.map|\.html/).test(path.extname(file))) {
            return;
          }
          var read = function(path) {
            // replace internal source maps
            // webpack uses eval for source maps atm
            fs.readFileSync(distFile, 'utf8')
              .replace(/\/\/# sourceMappingURL.*/, '')
              .replace(/eval.*/, '');
          };

          assert.equal(read(distFile), read(expectedFile), 'file that was build should equal what we expect');
        });

        helper.cleanup(done);
      });
    });
  });
});
