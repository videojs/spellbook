var path = require('path');
var PathExists = require('./path-exists');

var nodebin = path.join(__dirname, '..', '..', 'node_modules', '.bin');
var spellbin = path.join(__dirname, '..', '..', 'src');

var BinPath = function(name) {
  var nodepath = path.join(nodebin, name);
  var spellpath = path.join(spellbin, name);
  if (PathExists(nodepath)) {
    return nodepath;
  }

  if (PathExists(spellpath)) {
    return spellpath
  }
};

module.exports = BinPath;
