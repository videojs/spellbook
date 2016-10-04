var exec = require('./exec');
var Promise = require('bluebird');

var RunAll = function(commands, args) {
  if (typeof commands === 'string') {
    commands = [commands];
  }
  if (typeof args === 'string') {
    args = [args];
  }


  var promises = [];

  commands.forEach(function(command) {
    if (typeof command === 'string') {
      command = [command];
    }
    command = command.concat(args);
    promises.push(exec(command, {async: true}));
  });

  return Promise.all(promises);
};

module.exports = RunAll;
