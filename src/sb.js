#!/usr/bin/env node

var scripts = require('./scripts');
var config = require('./config');
var runScript = require('./run-script');
var script = process.argv[2];

if (Object.keys(scripts).indexOf(script) !== -1) {
	runScript(script).then(function() {}).error(function() {});
} else {
	console.log('error ' + script + ' is not a script');
	console.log(Object.keys(scripts));
}
