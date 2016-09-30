var GetPath = require('./get-path');
var shelljs = require('shelljs');

var Watch = function(glob, command) {
  shelljs.exec(GetPath('chokidar')
    + ' ' + glob
    + ' --debounce 100'
    + ' --command \'' + command + '\'', {async: true});
};

module.exports = Watch;
