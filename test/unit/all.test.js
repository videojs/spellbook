var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var pkg = require('../../package.json');
var parallel = require('mocha.parallel');
var GetFiles = require('../../src/utils/get-files');
var PathsExist = require('../../src/utils/paths-exist');

// get a list of all binaries in pkg.json
// add any binairies not listed in pkg.json
var binaries = Object.keys(pkg.bin).concat(GetFiles(path.join(__dirname, '..', '..', 'src', '*')).filter(function(file) {
  var basename = path.basename(file);

  // filter out the utils folder
  if (basename === 'utils') {
    return false;
  }

  // filter out anything already in pkg.bin
  if (pkg.bin[basename]) {
    return false;
  }

  return true;
}));

binaries.forEach(function(fileOrBin) {
  var binName = path.basename(fileOrBin);

  parallel(binName, function() {
    it('should have a bin in pkg.json', function(done) {
      var helper = new TestHelper();

      assert.ok(pkg.bin[binName], 'should exist in pkg.json');
      helper.cleanup(done);
    });

    it('should have man page', function(done) {
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
});
