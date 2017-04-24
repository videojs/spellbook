var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var binName = 'sb-clean';
var parallel = require('mocha.parallel');
var mkdirp = require('mkdirp');

parallel('sb-clean', function() {
  it('should fail with -q, -d as this is not supported', function(done) {
    var helper = new TestHelper();

    helper.exec(binName, ['-q', '-d'], function(code, stdout, stderr) {

      assert.equal(code, 1, 'should return failure');
      assert.equal(stdout.length, 0, 'should stdout nothing');
      assert.equal(stderr.length, 1, 'should stderr an error');
      helper.cleanup(done);
    });
  });

  [[], ['--dry-run'], ['--quiet'], ['-d'], ['-q']].forEach(function(options) {
    var optionString = options.length && options.join(', ') || 'default options';
    var dryRun = false;
    var quiet = false;

    if (options.indexOf('--dry-run') !== -1 || options.indexOf('-d') !== -1) {
      dryRun = true;
    }

    if (options.indexOf('--quiet') !== -1 || options.indexOf('-q') !== -1) {
      quiet = true;
    }

    var PathRemoved = function(helper, stdout, p) {
      if (quiet) {
        return;
      }
      var relpath = path.relative(helper.config.path, p)
        .replace(/^\.\//, '')
        .replace(/^\//, '');

      var regex = new RegExp('removing ' + relpath);

      assert.ok(regex.test(stdout), 'Should print removal of ' + relpath);
    };


    it('should delete nothing if there is nothing to clean with ' + optionString + ' options', function(done) {
      var helper = new TestHelper();

      helper.exec(binName, options, function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return success');
        assert.equal(stdout.length, quiet ? 0 : 2, 'should stdout start + finish only');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        helper.cleanup(done);
      });
    });

    var builds = {'css': 3,'lang': 4, 'test': 4, 'docs': 4};
    Object.keys(builds).forEach(function(type) {
      it('should delete the ' + type + ' dist folder if it exists', function(done) {
        var helper = new TestHelper();

        mkdirp.sync(helper.config[type].dist);
        helper.exec(binName, options, function(code, stdout, stderr) {
          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should stderr nothing');
          assert.equal(stdout.length, quiet ? 0 : builds[type], 'should only print one removal');

          PathRemoved(helper, stdout, helper.config[type].dist);
          assert.equal(PathsExist(helper.config[type].dist), dryRun, 'dist should be deleted');
          helper.cleanup(done);
        });
      });
    });

    it('should delete the js browser dist folder if it exists with ' + optionString + ' options', function(done) {
      var helper = new TestHelper();

      mkdirp.sync(helper.config.js.distBrowser);
      helper.exec(binName, options, function(code, stdout, stderr) {
        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        assert.equal(stdout.length, quiet ? 0 : 3, 'should only print one removal');

        PathRemoved(helper, stdout, helper.config.js.distBrowser);
        assert.equal(PathsExist(helper.config.js.distBrowser), dryRun, 'dist should be deleted');
        helper.cleanup(done);
      });
    });

    it('should delete the js node dist folder if it exists with ' + optionString + ' options', function(done) {
      var helper = new TestHelper();

      mkdirp.sync(helper.config.js.distNode);
      helper.exec(binName, options, function(code, stdout, stderr) {
        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        assert.equal(stdout.length, quiet ? 0 : 4, 'should only print one removal');

        PathRemoved(helper, stdout, helper.config.js.distNode);
        assert.equal(PathsExist(helper.config.js.distNode), dryRun, 'dist should be deleted');
        helper.cleanup(done);
      });
    });

    it('should delete npm-debug.log if it exists with ' + optionString + ' options', function(done) {
      var helper = new TestHelper();
      var npmDebug = path.join(helper.config.path, 'npm-debug.log');

      shelljs.touch(npmDebug);
      helper.exec(binName, options, function(code, stdout, stderr) {
        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        assert.equal(stdout.length, quiet ? 0 : 3, 'should only print one removal');

        PathRemoved(helper, stdout, npmDebug);
        assert.equal(PathsExist(npmDebug), dryRun, 'npm-debug.log should be deleted');
        helper.cleanup(done);
      });
    });

    it('it should delete all dists with ' + optionString + ' options', function(done) {
      var helper = new TestHelper();
      var dirs = [
        helper.config.js.distNode,
        helper.config.js.distBrowser,
        helper.config.test.dist,
        helper.config.css.dist,
        helper.config.docs.dist,
        helper.config.lang.dist
      ];

      dirs.forEach(function(dist) {
        mkdirp.sync(dist);
      });
      helper.exec(binName, options, function(code, stdout, stderr) {
        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should not print to stderr');
        assert.equal(stdout.length, quiet ? 0 : 8, 'should print nothing');

        dirs.forEach(function(dist) {
          PathRemoved(helper, stdout, dist);
          assert.equal(PathsExist(dist), dryRun, 'dist should be deleted');
        });

        helper.cleanup(done);
      });
    });

    it('it should delete all dists and npm debug with '  + optionString + ' options', function(done) {
      var helper = new TestHelper();
      var npmDebug = path.join(helper.config.path, 'npm-debug.log');
      var dirs = [
        helper.config.js.distNode,
        helper.config.js.distBrowser,
        helper.config.test.dist,
        helper.config.css.dist,
        helper.config.docs.dist,
        helper.config.lang.dist
      ];

      dirs.forEach(function(dist) {
        mkdirp.sync(dist);
      });

      shelljs.touch(npmDebug);
      helper.exec(binName, options, function(code, stdout, stderr) {
        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should not print to stderr');
        assert.equal(stdout.length, quiet ? 0 : 9, 'should print nothing');

        dirs.forEach(function(dist) {
          PathRemoved(helper, stdout, dist);
          assert.equal(PathsExist(dist), dryRun, 'dist should be deleted');
        });

        PathRemoved(helper, stdout, npmDebug);
        assert.equal(PathsExist(npmDebug), dryRun, 'npm-debug.log should be deleted');
        helper.cleanup(done);
      });
    });

    it('it should delete all dists with custom dirs and npm debug with '  + optionString + ' options', function(done) {
      var helper = new TestHelper({changePkg: {spellbook: {
        test: {dist: './dist-test'},
        docs: {dist: './dist-docs'},
        js: {distBrowser: './dist/browser', distNode: './dist-node'},
        css: {dist: './styles'},
        lang: {dist: './i18n'}
      }}});
      var npmDebug = path.join(helper.config.path, 'npm-debug.log');
      var dirs = [
        helper.config.js.distNode,
        helper.config.js.distBrowser,
        helper.config.test.dist,
        helper.config.css.dist,
        helper.config.docs.dist,
        helper.config.lang.dist
      ];

      dirs.forEach(function(dist) {
        mkdirp.sync(dist);
      });

      shelljs.touch(npmDebug);
      helper.exec(binName, options, function(code, stdout, stderr) {
        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should not print to stderr');
        assert.equal(stdout.length, quiet ? 0 : 10, 'should print nothing');

        dirs.forEach(function(dist) {
          PathRemoved(helper, stdout, dist);
          assert.equal(PathsExist(dist), dryRun, 'dist should be deleted');
        });

        PathRemoved(helper, stdout, npmDebug);
        assert.equal(PathsExist(npmDebug), dryRun, 'npm-debug.log should be deleted');
        helper.cleanup(done);
      });
    });
  });
});
