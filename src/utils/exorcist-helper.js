var shelljs = require('shelljs');
var PathExists = require('./path-exists');
var log = require('./log');
var GetPath = require('./get-path');

var exorcistHelper = function(dist) {
  if (!PathExists(dist)) {
    log.error('Source file ' + dist + 'does not exist. Cannot exorcise its sourcemap');
    return;
  }
  var retval = shelljs.cat(dist)
    .exec(GetPath('exorcist') + ' ' + dist + '.map', {silent: true})
    .to(dist);

  if (retval.code !== 0 || retval.stderr || !PathExists(dist) || !PathExists(dist + '.map')) {
    log.error('exorcist on ' + dist + ' failed with outputs:');
    log.error('stderr:\n' + retval.stderr, 'stdout:\n' + retval.stdout);
    process.exit(1);
  }
};

module.exports = exorcistHelper;
