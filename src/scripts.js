var config = require('./config');
var path = require('path');


var scripts ={
	'prebuild': 'npm run clean',
	'build': [['npm run build:css', 'npm run build:js', 'npm run build:lang', 'npm run build:test']],
	'build:css': ['npm run build:css:sass', 'npm run build:css:bannerize'],
	'build:css:bannerize': 'bannerize dist/' + config.name + '.css --banner=' + config.buildConfigs['banner.ejs'],
	'build:css:sass': 'node-sass src/plugin.scss dist/' + config.name + '.css --output-style=compressed --linefeed=lf',
	'build:js': [
		'npm run build:js:rollup-modules',
		'npm run build:js:rollup-umd',
		'npm run build:js:bannerize',
		'npm run build:js:uglify'
	],
	'build:js:bannerize': 'bannerize dist/' + config.name + '.js --banner=' + config.buildConfigs['banner.ejs'],
	'build:js:rollup-modules': 'rollup -c ' + config.buildConfigs['modules.rollup.config.js'],
	'build:js:rollup-umd': 'rollup -c ' + config.buildConfigs['umd.rollup.config.js'],
	'build:js:uglify': 'uglifyjs dist/' + config.name + '.js --comments --mangle --compress --ie8 -o dist/' + config.name + '.min.js',
	'build:lang': 'vjslang --dir dist/lang',
	'build:test': 'rollup -c ' + config.buildConfigs['test.rollup.config.js'],
	'clean': 'rimraf dist test/dist',
	'postclean': 'mkdirp dist test/dist',
	'docs': [['npm run docs:api', 'npm run docs:toc']],
	'docs:api': 'jsdoc src -r -c ' + config.buildConfigs['jsdoc.json'] + ' -d docs/api',
	'docs:toc': 'doctoc README.md',
	'lint': 'vjsstandard',
	'prestart': 'npm run build',
	'start': [['npm run start:server', 'npm run watch']],
	'start:server': 'static -a 0.0.0.0 -p 9999 -H \'{"Cache-Control": "no-cache, must-revalidate"}\' .',
	'pretest': ['npm run lint', 'npm run build'],
	'test': 'karma start ' + config.buildConfigs['karma.conf.js'],
	'preversion': 'npm test',
	'version': 'node ' + config.buildConfigs['version.js'],
	'watch': [['npm run watch:css', 'npm run watch:js-modules', 'npm run watch:js-umd', 'npm run watch:test']],
	// we run npm run build:css:sass here for intial rebuild
	'watch:css': [['npm run build:css:sass', 'node-sass src/plugin.scss dist/' + config.name + '.css --output-style=compressed --linefeed=lf --watch src/**/*.scss']],
	'watch:js-modules': 'rollup -c ' + config.buildConfigs['modules.rollup.config.js'] + ' -w',
	'watch:js-umd': 'rollup -c ' + config.buildConfigs['umd.rollup.config.js'] + ' -w',
	'watch:test': 'rollup -c ' + config.buildConfigs['test.rollup.config.js'] + ' -w',
	'prepublish': 'npm run build',
	'prepush': 'npm run lint',
	'precommit': ['npm run docs',  'git add ' + path.join(config.root, 'README.md')]
};

module.exports = scripts;
