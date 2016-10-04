var PathExists = require('./path-exists');
var shelljs = require('shelljs');

var Clean = function(dir) {
  if (PathExists(dir)) {
    shelljs.rm('-rf', dir);
  }

  shelljs.mkdir('-p', dir);
};

module.exports = Clean;
