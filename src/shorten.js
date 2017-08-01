var config = require('./config');
var path = require('path');

var shorten = function(str) {
	if (!str) {
		return str;
	}
	return str
		.replace(path.join(__dirname, '..'), '<videojs-spellbook>');
};

module.exports = shorten;
