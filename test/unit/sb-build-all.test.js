var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var glob = require('glob');
var parallel = require('mocha.parallel');
var fs = require('fs');
var pkgName = require('../fixtures/test-pkg-main/package.json').name;

var prepend = function(array, str) {
  return array.map(function(s) {
    return str + s;
  });
};

var tests = {css: {}, js: {}, test: {}, docs: {}, lang: {}, all: {}};

// CSS builds
['sb-build-css-sass', 'sb-build-css', 'sb-build-css-css', 'sb-build-css-all'].forEach(function(binName) {
  tests.css[binName] = {
    files: prepend(['.css', '.css.map', '.min.css', '.min.css.map'], path.join('dist', 'browser', pkgName)),
  };
});

// LANG builds
['sb-build-lang', 'sb-build-lang-all', 'sb-build-lang-copy',].forEach(function(binName) {
  tests.lang[binName] = {
    files: prepend(['index.json', 'de.json', 'en.json', 'sp.json'], (path.join('dist', 'lang') + path.sep))
  };
});

// DOC builds
tests.docs['sb-build-docs-api'] = {
  files: ['dist/docs/api/index.html']
};
tests.docs['sb-build-docs-manual'] = {
  files: ['dist/docs/manual/index.html']
};

['sb-build-docs-all', 'sb-build-docs'].forEach(function(binName) {
  tests.docs[binName] = {
    files: []
      .concat(tests.docs['sb-build-docs-api'].files)
      .concat(tests.docs['sb-build-docs-manual'].files)
  };
});

// JS dists
tests.js['sb-build-js-browser'] = {
  files: prepend(['.js', '.js.map', '.min.js', '.min.js.map'], path.join('dist', 'browser', pkgName)),
};
tests.js['sb-build-js-node'] = {
  files: ['dist/es5/index.js']
};
['sb-build-js-all', 'sb-build-js'].forEach(function(binName) {
  tests.js[binName] = {
    files: []
      .concat(tests.js['sb-build-js-browser'].files)
      .concat(tests.js['sb-build-js-node'].files)
  };
});

// TEST builds
tests.test['sb-build-test-bundlers'] = {
  files: prepend(['rollup.test.js','webpack.test.js','browserify.test.js'], path.join('dist', 'test') + path.sep),
};
tests.test['sb-build-test-browser'] = {
  files: prepend(['.test.js'], path.join('dist', 'test', pkgName)),
};
['sb-build-test-all', 'sb-build-test'].forEach(function(binName) {
  tests.test[binName] = {
    files: []
      .concat(tests.test['sb-build-test-browser'].files)
      .concat(tests.test['sb-build-test-bundlers'].files)
  };
});

// build all
['sb-build', 'sb-build-all'].forEach(function(binName) {
  tests.all[binName] = {
    files: []
      .concat(tests.test['sb-build-test-all'].files)
      .concat(tests.js['sb-build-js-all'].files)
      .concat(tests.docs['sb-build-docs-all'].files)
      .concat(tests.css['sb-build-css-all'].files)
      .concat(tests.lang['sb-build-lang-all'].files)
  };
});

Object.keys(tests).forEach(function(testName) {
  parallel('build:' + testName, function() {

    Object.keys(tests[testName]).forEach(function(binName) {
      var testProps = tests[testName][binName];

      it(binName + ' should build default files with no args', function(done) {
        var helper = new TestHelper();

        helper.exec(binName, function(code, stdout, stderr) {
          assert.equal(code, 0, 'should return 0');

          testProps.files.forEach(function(file) {
            var distFile = path.join(helper.config.path, file);
            var expectedFile = path.join(__dirname, '..', file.replace('dist', 'expected-dist'));

            assert.equal(PathsExist(distFile), true, 'new dist file ' + file + ' should exist');
            // map files are always different
            // and the api html file contains a date
            // webpack has an issue with eval sourcemaps, see sb-build-test-bundles
            if ((/\.map|\.html/).test(path.extname(file)) || path.basename(file) === 'webpack.test.js' || path.basename(file) === 'browserify.test.js') {
              return;
            }
            var read = function(path) {
              // replace internal source maps
              // webpack uses eval for source maps atm
              return fs.readFileSync(path, 'utf8')
                .replace(/sourceMappingURL.*/, '')
                .replace(/eval.*/, '')
                .replace(/ /g, '')
                .replace(/\r|\n/g, '')
                .replace(/;\/\*#$/, '')
                .replace(/\/\*#$/, '');

            };

            // TODO: get his test to work
            // assert.equal(read(distFile), read(expectedFile), file + 'that was build should equal what we expect');
          });

          helper.cleanup(done);
        });
      });
    });
  });
});
