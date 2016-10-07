var PathsExist = require('./paths-exist');
var shelljs = require('shelljs');

var Clean = function(dir) {
  if (PathsExist(dir)) {
    shelljs.rm('-rf', dir);
  }

  shelljs.mkdir('-p', dir);
};

module.exports = Clean;
