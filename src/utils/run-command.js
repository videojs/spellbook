var shelljs = require('shelljs');
var config = require('./get-config')();
var path = require('path');

var RunCommand = function(type) {
  var args = Array.prototype.slice.call(arguments);
  args.shift();

  if (config.verbose) {
    var cmd = args[0];

    process.stdout.write(type);
    if (args[0].length < 6) {
      process.stdout.write(' ' + args[0]);
      cmd = args[1];
    }

    cmd = cmd.split(path.join(__dirname, '..', '..', 'node_modules', '.bin') + path.sep).join('');
    cmd = cmd.split(path.join(__dirname, '..', '..', 'config') + path.sep).join('');
    cmd = cmd.split(path.join(__dirname, '..') + path.sep).join('');
    cmd = cmd.split(config.path + path.sep).join('');

    process.stdout.write(': ' + cmd + '\n');
  }
  return shelljs[type].apply(null, args);
};

module.exports = RunCommand;
