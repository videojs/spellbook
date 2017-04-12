var fs = require('fs');
var path = require('path');
var PathsExist = require('./paths-exist');
var findRoot = require('find-root');

var readJSON = function(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};

var GetConfig = function (dir) {
  dir = dir || process.cwd();
  if (!path.isAbsolute(dir)) {
    dir = path.join(process.cwd(), dir);
  }

  var appRoot = findRoot(dir);
  var workingPkg = readJSON(path.join(appRoot, 'package.json'));
  var sbPkg = readJSON(path.join(__dirname, '..', '..', 'package.json'));

  workingPkg.spellbook = workingPkg.spellbook || {};

  if (!process.env.SB_INTERNAL) {
    if (!workingPkg.main || !workingPkg['jsnext:main']) {
      console.error('The package in ' + appRoot + ' does not have a main file or jsnext:main file set.');
      console.error('please set these in your package.json');
      process.exit(1);
    }
  }

  if (!PathsExist(path.join(appRoot, 'node_modules'))) {
    log.fatal('no node_modules directory!');
    process.exit(1);
  }

  var name = workingPkg.name.replace(/^@.+\//, '');
  var author = workingPkg.author || '';

  if (Array.isArray(workingPkg.author)) {
    console.error('Author cannot be an array in package.json, as this is invalid, going to use first author');
    console.error('See: https://docs.npmjs.com/files/package.json#people-fields-author-contributors');
    workingPkg.author = workingPkg.author[0];
  }

  if (typeof workingPkg.author === 'object') {
    if (!workingPkg.author.name) {
      console.error('author must have a name key or be a string in package.json!');
      console.error('See: https://docs.npmjs.com/files/package.json#people-fields-author-contributors');
      process.exit(1);
    }
    author = workingPkg.author.name;
    if (workingPkg.author.email) {
      author += ' <' + workingPkg.author.email + '>';

    }
    if (workingPkg.author.url) {
      author += ' (' + workingPkg.author.url + ')';
    }
  }

  var config = {
    // workingPkg information
    name: name,
    scope: workingPkg.name.replace(name, '').replace(/\/$/, ''),
    version: workingPkg.version,
    path: appRoot,
    main: workingPkg['main'] ? path.join(appRoot, workingPkg.main) : '',
    jsNextMain: workingPkg['jsnext:main'] ? path.join(appRoot, workingPkg['jsnext:main']) : '',

    // workingPkg settings
    logLevel: process.env.SB_LOG_LEVEL || workingPkg.spellbook['log-level'] || 'info',
    ie8: workingPkg.spellbook.ie8 || false,
    browserList: workingPkg.spellbook.browserList || ['> 1%', 'last 4 versions', 'Firefox ESR'],
    shimVideojs: workingPkg.spellbook['shimVideojs'] || workingPkg.spellbook['shimVideo.js'] || true,
    shim: workingPkg.spellbook.shim || {},
    bannerObj: {
      name: workingPkg.name || '',
      version: workingPkg.version || '',
      author: author,
      license: workingPkg.license || ''
    },
    dist: path.join(appRoot, 'dist'),

    docs: Object.assign({
      src: path.join(appRoot, 'docs')
    }, workingPkg.spellbook.docs || {}),
    lang: Object.assign({
      src: path.join(appRoot, 'lang')
    }, workingPkg.spellbook.lang || {}),
    test: Object.assign({
      src: path.join(appRoot, 'test'),
      skipBrowsers: [],
      travisBrowsers: [],
    }, workingPkg.spellbook.test || {}),

    css: Object.assign({
      src: path.join(appRoot, 'src', 'css')
    }, workingPkg.spellbook.css || {}),
    js: Object.assign({
      src: path.join(appRoot, 'src', 'js')
    }, workingPkg.spellbook.js || {})
  };

  return config;
};

module.exports = GetConfig;
