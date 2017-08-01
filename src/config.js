var findRoot = require('find-root');
var path = require('path');
var glob = require('glob');

var dir = process.cwd();
if (!path.isAbsolute(dir)) {
  dir = path.join(process.cwd(), dir);
}

var appRoot = findRoot(dir);
var appPkg = require(path.join(dir, 'package.json'));
var name = appPkg.name.replace(/^@.+\//, '');
var scope = appPkg.name.replace(name, '').replace(/\/$/, '');
var author = appPkg.author || '';

if (typeof appPkg.author === 'object') {
	if (!appPkg.author.name) {
		console.error('author must have a name key or be a string in package.json!');
		console.error('See: https://docs.npmjs.com/files/package.json#people-fields-author-contributors');
	}
	author = appPkg.author.name || '';
	if (appPkg.author.email) {
		author += ' <' + appPkg.author.email + '>';
	}
	if (appPkg.author.url) {
		author += ' (' + appPkg.author.url + ')';
	}
}

appPkg.author = author;
appPkg.fullName = appPkg.name;
appPkg.name = name;
appPkg.scope = scope;
appPkg.root = appRoot;
appPkg.buildConfigs = {};
glob.sync(path.join(__dirname, '..', 'config', '*')).forEach(function(filepath) {
	appPkg.buildConfigs[path.basename(filepath)] = filepath;
});

module.exports = appPkg;
