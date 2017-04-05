var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var glob = require('glob');
var parallel = require('mocha.parallel');
var fs = require('fs');
var tests = {css: {}, js: {}, test: {}, docs: {}, lang: {}, all: {}};

var prepend = function(array, str) {
  return array.map(function(s) {
    return str + s;
  });
};

// CSS builds
['sb-build-css-sass', 'sb-build-css-css', 'sb-build-css-all'].forEach(function(binName) {
  tests.css[binName] = {
    files: [
      function(config) { return path.join('dist', 'browser', config.name + '.css');},
      function(config) { return path.join('dist', 'browser', config.name + '-with-map.css');},
      function(config) { return path.join('dist', 'browser', config.name + '.css.map');},
      function(config) { return path.join('dist', 'browser', config.name + '.min.css');},
      function(config) { return path.join('dist', 'browser', config.name + '-with-map.min.css');},
      function(config) { return path.join('dist', 'browser', config.name + '.min.css.map');}
    ]
  };
});

// LANG builds
['sb-build-lang-all', 'sb-build-lang-copy',].forEach(function(binName) {
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
tests.docs['sb-build-docs-all'] = {
  files: []
    .concat(tests.docs['sb-build-docs-api'].files)
    .concat(tests.docs['sb-build-docs-manual'].files)
};

// JS dists
tests.js['sb-build-js-browser'] = {
  files: [
    function(config) { return path.join('dist', 'browser', config.name + '.js');},
    function(config) { return path.join('dist', 'browser', config.name + '.js.map');},
    function(config) { return path.join('dist', 'browser', config.name + '-with-map.js');},
    function(config) { return path.join('dist', 'browser', config.name + '-with-map.min.js');},
    function(config) { return path.join('dist', 'browser', config.name + '.min.js');},
    function(config) { return path.join('dist', 'browser', config.name + '.min.js.map');}
  ]

};
tests.js['sb-build-js-node'] = {
  files: ['dist/es5/index.js']
};

tests.js['sb-build-js-all'] = {
  files: []
    .concat(tests.js['sb-build-js-browser'].files)
    .concat(tests.js['sb-build-js-node'].files)
};

// TEST builds
tests.test['sb-build-test-bundlers'] = {
  files: prepend([/*'rollup.test.js',*/'webpack.test.js','browserify.test.js'], path.join('dist', 'test') + path.sep),
};
tests.test['sb-build-test-browser'] = {
  files: [
    function(config) { return path.join('dist', 'test', config.name + '.test.js');}
  ]
};

tests.test['sb-build-test-all'] = {
  files: []
    .concat(tests.test['sb-build-test-browser'].files)
    .concat(tests.test['sb-build-test-bundlers'].files)
};

// build all
tests.all['sb-build-all'] = {
files: []
  .concat(tests.test['sb-build-test-all'].files)
  .concat(tests.js['sb-build-js-all'].files)
  .concat(tests.docs['sb-build-docs-all'].files)
  .concat(tests.css['sb-build-css-all'].files)
  .concat(tests.lang['sb-build-lang-all'].files)
};

// run each binaries test
Object.keys(tests).forEach(function(testName) {

  // run individual dist type tests
  Object.keys(tests[testName]).forEach(function(binName) {
    var testProps = tests[testName][binName];

    parallel('build:' + testName + ':' + binName, function() {
      // run with testHelperOptions, such as changing the pkg name to have a scope
      [
        {desc: 'run with default settings', options: {changePkg: false}},
        {desc: 'run with a scoped main file', options: {changePkg: {name: '@scope/test-pkg-main'}}},
        {desc: 'run with an npm run script', options: {changePkg: {scripts: {build: binName}}}},
        {desc: 'run with author single quote', options: {changePkg: {author: 'Brandon \' Casey'}}},
        {desc: 'run with nested author', options: {changePkg: {author: {name: 'Brandon \' Casey', email: 'nope@gmail.com', url: 'nope.com'}}}}
      ].forEach(function(testOptions) {
        it(testOptions.desc, function(done) {
          var command = binName;
          var helper = new TestHelper(testOptions.options);
          var args = [];

          if (testOptions.options.changePkg.scripts) {
            command = 'npm';
            args = ['run', 'build'];
          }

          helper.exec(command, args, function(code, stdout, stderr) {
            assert.equal(stderr.length, 0, 'no stderr');
            assert.equal(code, 0, 'should return 0');

            testProps.files.forEach(function(file) {
              if (typeof file === 'function') {
                file = file(helper.config);
              }
              var distFile = path.join(helper.config.path, file);
              var expectedFile = path.join(__dirname, '..', file.replace('dist', 'expected-dist'));

                assert.equal(PathsExist(distFile), true, file + ' should exist');
                assert.ok(fs.statSync(distFile).size > 10, file + ' is not 0 size');

                // docs/lang doesn't print individual files
                if ((/\.html|\.json/).test(path.extname(file))) {
                  file = path.dirname(file);
                }
                assert.ok(new RegExp(file + '\n').test(stdout.join('\n')), file + ' was printed to stdout');
              });

              helper.cleanup(done);
            });
          });
        });
      });
  });
});
