var PathExists = require('./path-exists');
var glob = require('glob');
var path = require('path');

var FilesExist = function(dir, search) {
  if (!PathExists(dir)) {
    return [];
  }

  var files = glob.sync(path.join(dir, search));
  if (files.length === 0) {
    return [];
  }

  return files;
};

module.exports = FilesExist;
