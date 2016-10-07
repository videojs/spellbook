var path = require('path');
var PathsExist = require('./paths-exist');

var spell = path.join(__dirname, '..', '..');
var nodebin = path.join(__dirname, '..', '..', 'node_modules', '.bin');
var spellbin = path.join(spell, 'src');
var confdir = path.join(spell, 'config');

var GetPath = function(name) {
  name = name || '';
  var nodepath = path.join(nodebin, name);
  var spellpath = path.join(spellbin, name);
  var confpath = path.join(confdir, name);

  if (PathsExist(nodepath)) {
    return nodepath;
  }

  if (PathsExist(spellpath)) {
    return spellpath;
  }

  if (PathsExist(confpath)) {
    return confpath;
  }

  return name;
};

module.exports = GetPath;
