var path = require('path');
var PathExists = require('./path-exists');

var spell = path.join(__dirname, '..', '..');
var nodebin = path.join(__dirname, '..', '..', 'node_modules', '.bin');
var spellbin = path.join(spell, 'src');
var confdir = path.join(spell, 'config');
var testdir = path.join(spell, 'src', 'unit-test');

var GetPath = function(name) {
  var nodepath = path.join(nodebin, name);
  var spellpath = path.join(spellbin, name);
  var confpath = path.join(confdir, name);
  var testpath = path.join(testdir, name);

  if (PathExists(nodepath)) {
    return nodepath;
  }

  if (PathExists(spellpath)) {
    return spellpath;
  }

  if (PathExists(confpath)) {
    return confpath;
  }

  if (PathExists(testpath)) {
    return testpath;
  }
};

module.exports = GetPath;
