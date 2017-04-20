var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var glob = require('glob');
var parallel = require('mocha.parallel');
var fs = require('fs');
var singleTests = {};
var multiTests = {};
var pkg = require('../../package.json');
var GetFiles = require('../../src/utils/get-files');


// CSS builds
['sb-build-css-sass', 'sb-build-css-css'].forEach(function(binName) {
  singleTests[binName] = {
    files: [
      function(config) { return path.join(config.css.dist, config.name + '.css');},
      function(config) { return path.join(config.css.dist, config.name + '-with-map.css');},
      function(config) { return path.join(config.css.dist, config.name + '.css.map');},
      function(config) { return path.join(config.css.dist, config.name + '.min.css');},
      function(config) { return path.join(config.css.dist, config.name + '-with-map.min.css');},
      function(config) { return path.join(config.css.dist, config.name + '.min.css.map');}
    ]
  };
});

multiTests['sb-build-css'] = singleTests['sb-build-css-sass'];
multiTests['sb-build-css-all'] = multiTests['sb-build-css'];

// LANG builds
singleTests['sb-build-lang-copy'] = {
  files: [
    function(config) { return path.join(config.lang.dist, 'index.json');},
    function(config) { return path.join(config.lang.dist, 'de.json');},
    function(config) { return path.join(config.lang.dist, 'en.json');},
    function(config) { return path.join(config.lang.dist, 'sp.json');},
  ]
};

multiTests['sb-build-lang'] = singleTests['sb-build-lang-copy'];
multiTests['sb-build-lang-all'] = multiTests['sb-build-lang'];

// DOC builds
singleTests['sb-build-docs-api'] = {
  files: [
    function(config) { return path.join(config.docs.dist, 'api', 'index.html');},
  ]
};
singleTests['sb-build-docs-manual'] = {
  files: [
    function(config) { return path.join(config.docs.dist, 'manual', 'index.html');},
  ]
};

multiTests['sb-build-docs'] = {
  files: []
    .concat(singleTests['sb-build-docs-api'].files)
    .concat(singleTests['sb-build-docs-manual'].files)
};

multiTests['sb-build-docs-all'] = multiTests['sb-build-docs'];

// JS dists
singleTests['sb-build-js-browser'] = {
  files: [
    function(config) { return path.join(config.js.distBrowser, config.name + '.js');},
    function(config) { return path.join(config.js.distBrowser, config.name + '.js.map');},
    function(config) { return path.join(config.js.distBrowser, config.name + '-with-map.js');},
    function(config) { return path.join(config.js.distBrowser, config.name + '-with-map.min.js');},
    function(config) { return path.join(config.js.distBrowser, config.name + '.min.js');},
    function(config) { return path.join(config.js.distBrowser, config.name + '.min.js.map');}
  ]

};
singleTests['sb-build-js-node'] = {
  files: [
    function(config) { return path.join(config.js.distNode, 'index.js') }
  ]
};

multiTests['sb-build-js'] = {
  files: []
    .concat(singleTests['sb-build-js-browser'].files)
    .concat(singleTests['sb-build-js-node'].files)
};

multiTests['sb-build-js-all'] = multiTests['sb-build-js'];

// TEST builds
singleTests['sb-build-test-bundlers'] = {
  files: [
    function(config) { return path.join(config.test.dist, 'webpack.test.js');},
    function(config) { return path.join(config.test.dist, 'browserify.test.js');}
  ]
};
singleTests['sb-build-test-browser'] = {
  files: [
    function(config) { return path.join(config.test.dist, config.name + '.test.js');}
  ]
};

multiTests['sb-build-test'] = {
  files: []
    .concat(singleTests['sb-build-test-browser'].files)
    .concat(singleTests['sb-build-test-bundlers'].files)
};

multiTests['sb-build-test-all'] = multiTests['sb-build-test'];

// build all
multiTests['sb-build'] = {
files: []
  .concat(multiTests['sb-build-test-all'].files)
  .concat(multiTests['sb-build-js-all'].files)
  .concat(multiTests['sb-build-docs-all'].files)
  .concat(multiTests['sb-build-css-all'].files)
  .concat(multiTests['sb-build-lang-all'].files)
};

multiTests['sb-build-all'] = multiTests['sb-build'];

var runTest = function(settings) {
  var command = settings.binName;
  var helper = new TestHelper(settings.helperOptions);
  var args = settings.args || [];

  if (settings.helperOptions.changePkg && settings.helperOptions.changePkg.scripts) {
    command = 'npm';
    args = ['run', 'build'];
  }

  helper.exec(command, args, function(code, stdout, stderr) {
    assert.equal(stderr.length, 0, 'no stderr');
    assert.equal(code, 0, 'should return 0');

    settings.props.files.forEach(function(file) {
      file = file(helper.config);

      var relativePath = path.relative(helper.config.path, file);

      assert.equal(PathsExist(file), true, relativePath + ' should exist');
      assert.ok(fs.statSync(file).size > 10, relativePath + ' is not 0 size');

      // docs/lang doesn't print individual files
      if ((/\.html|\.json/).test(path.extname(file))) {
        relativePath = path.dirname(relativePath);
      }

      assert.ok(new RegExp(relativePath + '\n').test(stdout.join('\n')), relativePath + ' was printed to stdout');
    });

    helper.cleanup(settings.done);
  });
};

describe('build:sanity', function() {
  var singleBins = Object.keys(singleTests);
  var muitiBins = Object.keys(multiTests);

  it('all binaries are being tested', function() {
    var binaries = TestHelper.prototype.getBinList();

    binaries.forEach(function(bin) {
      // skip non build bins
      if (!(/^sb-build/).test(bin)) {
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

// run individual dist type tests
describe('build:single', function() {
  Object.keys(singleTests).forEach(function(binName) {
    var testProps = singleTests[binName];

    parallel(binName, function() {
      it('should run with default settings', function(done) {
        var helperOptions = {};

        return runTest({binName: binName, props: testProps, helperOptions: helperOptions, done: done});
      });

      it('should run as npm script', function(done) {
        var helperOptions = {changePkg: {scripts: {build: binName}}};

        return runTest({binName: binName, props: testProps, helperOptions: helperOptions, done: done});
      });

      it('should run with a scoped name', function(done) {
        var helperOptions = {changePkg: {name: '@scope/test-pkg-main'}};

        return runTest({binName: binName, props: testProps, helperOptions: helperOptions, done: done});
      });

      it('should run with author special characters', function(done) {
        var helperOptions = {changePkg: {author: {name: 'Brandon \' Casey', email: 'nope@gmail.com', url: 'nope.com'}}};

        return runTest({binName: binName, props: testProps, helperOptions: helperOptions, done: done});
      });
    });
  });
});

// these take much longer, so we want to do less testing with them as the
// single tests do the real building
describe('build:multi', function() {
  Object.keys(multiTests).forEach(function(binName) {
    var testProps = multiTests[binName];

    parallel(binName, function() {

      it('should build correctly', function(done) {
        var helperOptions = {};

        return runTest({binName: binName, props: testProps, helperOptions: helperOptions, done: done});
      });

      it('should build with npm script', function(done) {
        var helperOptions = {changePkg: {scripts: {build: binName}}};

        return runTest({binName: binName, props: testProps, helperOptions: helperOptions, done: done});
      });
    });
  });
});
