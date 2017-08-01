var spawn = require('./spawn');
var Promise = require('bluebird');
var shorten = require('./shorten');
var scripts = require('./scripts');

var runCommand = function(scriptName, c) {
	if ((/^npm run/).test(c)) {
		return runScript(c.replace('npm run ', ''));
	}
	console.log('Running ' + scriptName + ': ' + shorten(c));
	return spawn(c);
}

var runScript = function(scriptName, args) {
	return new Promise(function(resolve, reject) {

		if (scripts['pre' + scriptName]) {
			resolve(runScript('pre' + scriptName));
		}

		resolve();
	}).then(function() {
		var command = scripts[scriptName];

		if (!Array.isArray(command)) {
			command = [command];
		}

		return Promise.mapSeries(command, function(seriesCommand) {
			if (Array.isArray(seriesCommand)) {
				return Promise.map(seriesCommand, function(parallelCommand) {
					return runCommand(scriptName, parallelCommand);
				});
			}
			return runCommand(scriptName, seriesCommand);
		});
	}).then(function() {
		if (scripts['post' + scriptName]) {
			return runScript('post' + scriptName);
		}
		return Promise.resolve();
	});
};

module.exports = runScript;
