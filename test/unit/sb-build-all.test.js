var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var glob = require('glob');
var parallel = require('mocha.parallel');
var fs = require('fs');
var pkgName = require('../fixtures/test-pkg-main/package.json').name;

var tests = {};
var prepend = function(array, str) {
  return array.map(function(s) {
    return str + s;
  });
};

// CSS builds
['sb-build-css-sass', 'sb-build-css', 'sb-build-css-css', 'sb-build-css-all'].forEach(function(binName) {
  tests[binName] = {
    files: prepend(['.css', '.css.map', '.min.css', '.min.css.map'], path.join('dist', 'browser', pkgName)),
  };
});

// LANG builds
['sb-build-lang', 'sb-build-lang-all', 'sb-build-lang-copy',].forEach(function(binName) {
  tests[binName] = {
    files: prepend(['index.json', 'de.json', 'en.json', 'sp.json'], (path.join('dist', 'lang') + path.sep))
  };
});

// DOC builds
tests['sb-build-docs-api'] = {
  files: ['dist/docs/api/index.html']
};
tests['sb-build-docs-manual'] = {
  files: ['dist/docs/manual/index.html']
};

['sb-build-docs-all', 'sb-build-docs'].forEach(function(binName) {
  tests[binName] = {
    files: []
      .concat(tests['sb-build-docs-api'].files)
      .concat(tests['sb-build-docs-manual'].files)
  };
});

// JS dists
tests['sb-build-js-browser'] = {
  files: prepend(['.js', '.js.map', '.min.js', '.min.js.map'], path.join('dist', 'browser', pkgName)),
};
tests['sb-build-js-node'] = {
  files: ['dist/es5/index.js']
};
['sb-build-js-all', 'sb-build-js'].forEach(function(binName) {
  tests[binName] = {
    files: []
      .concat(tests['sb-build-js-browser'].files)
      .concat(tests['sb-build-js-node'].files)
  };
});

// TEST builds
tests['sb-build-test-bundlers'] = {
  files: prepend(['rollup.test.js','webpack.test.js','browserify.test.js'], path.join('dist', 'test') + path.sep),
};
tests['sb-build-test-browser'] = {
  files: prepend(['.test.js'], path.join('dist', 'test', pkgName)),
};
['sb-build-test-all', 'sb-build-test'].forEach(function(binName) {
  tests[binName] = {
    files: []
      .concat(tests['sb-build-test-browser'].files)
      .concat(tests['sb-build-test-bundlers'].files)
  };
});

// build all
['sb-build', 'sb-build-all'].forEach(function(binName) {
  tests[binName] = {
    files: []
      .concat(tests['sb-build-test-all'].files)
      .concat(tests['sb-build-js-all'].files)
      .concat(tests['sb-build-docs-all'].files)
      .concat(tests['sb-build-css-all'].files)
      .concat(tests['sb-build-lang-all'].files)
  };
});

parallel('build', function() {
  Object.keys(tests).forEach(function(binName) {
    var testProps = tests[binName];

    it(binName + ' should build default files with no args', function(done) {
      var helper = new TestHelper();

      helper.exec(binName, function(code, stdout, stderr) {
        assert.equal(code, 0, 'should return 0');

        testProps.files.forEach(function(file) {
          var distFile = path.join(helper.config.path, file);
          var expectedFile = path.join(__dirname, '..', 'expected-dist', file);

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
