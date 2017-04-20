var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var pkg = require('../../package.json');
var parallel = require('mocha.parallel');
var GetFiles = require('../../src/utils/get-files');
var PathsExist = require('../../src/utils/paths-exist');

describe('sanity', function() {
  TestHelper.prototype.getBinList().forEach(function(fileOrBin) {
    var binName = path.basename(fileOrBin);
    parallel(binName, function() {
      it('should have a bin in pkg.json', function(done) {
        var helper = new TestHelper();

        assert.ok(pkg.bin[binName], 'should exist in pkg.json');
        helper.cleanup(done);
      });

      it(binName + ' should have man page', function(done) {
        var helper = new TestHelper();
        var manName = "dist/man/" + binName + '.1';

        assert.notEqual(pkg.man.indexOf('dist/man/' + binName + '.1'), -1, 'should exist in pkg.json');
        assert.ok(PathsExist(path.join(__dirname, '..', '..', 'docs',  binName + '.md')), 'should have a doc file');
        helper.cleanup(done);
      });

      ['--help', '-h'].forEach(function(option) {
        it('should have ' + option, function(done) {
          var helper = new TestHelper();
          var child = helper.exec(binName, [option], function(code, stdout, stderr) {

            assert.equal(code, 0, 'should return success');
            assert.ok((new RegExp('^Usage: ' + binName)).test(stdout[0]), 'should print help');
            assert.equal(stderr.length, 0, 'no errors');
            helper.cleanup(done);
          });
        });
      });

      ['--version', '-V'].forEach(function(option) {
        it('should have ' + option, function(done) {
          var helper = new TestHelper();
          var child = helper.exec(binName, [option], function(code, stdout, stderr) {

            assert.equal(code, 0, 'should return success');
            assert.ok((new RegExp(pkg.version)).test(stdout[0]), 'should print version');
            assert.equal(stderr.length, 0, 'no errors');
            helper.cleanup(done);
          });
        });
      });

      it('should be able to call ' + binName + ' through npm', function(done) {
        var helper = new TestHelper({changePkg: {scripts: {something: binName}}});

        helper.exec('npm', ['run', 'something', '--', '--help'], function(code, stdout, stderr) {

          assert.equal(code, 0, 'should return success');
          assert.ok((new RegExp('Usage: ' + binName)).test(stdout.join('\n')), 'should print help');
          assert.equal(stderr.length, 0, 'no errors');
          helper.cleanup(done);
        });
      });

      // sb can not call through itself
      if (binName !== 'sb') {
        var nameArgs = binName.replace(/^sb-/, '').split('-');

        it('should be able to call ' + binName + ' through sb ' + nameArgs.join(' '), function(done) {
          var helper = new TestHelper();

          helper.exec('sb', nameArgs.concat(['--help']), function(code, stdout, stderr) {

            assert.equal(code, 0, 'should return success');
            assert.ok((new RegExp('Usage: ' + binName)).test(stdout.join('\n')), 'should print help');
            assert.equal(stderr.length, 0, 'no errors');
            helper.cleanup(done);
          });
        });
      }
    });
  })
});
