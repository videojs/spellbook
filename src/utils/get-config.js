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
  process.NODE_ENV = process.NODE_ENV || {};

  if (!workingPkg.main || !workingPkg['jsnext:main']) {
    console.error('The package in ' + appRoot + ' does not have a main file or jsnext:main file set.');
    console.error('please set these in your package.json');
    process.exit(1);
  }

  var config = {
    // workingPkg information
    name: workingPkg.name,
    version: workingPkg.version,
    path: appRoot,
    main: path.join(appRoot, workingPkg.main),
    jsNextMain: workingPkg['jsnext:main'] ? path.join(appRoot, workingPkg['jsnext:main']) : '',

    // workingPkg settings
    logLevel: process.NODE_ENV.SB_LOG_LEVEL || workingPkg.spellbook['log-level'] || 'info',
    ie8: workingPkg.spellbook.ie8 || false,
    browserList: workingPkg.spellbook.browserList || ['> 1%', 'last 4 versions', 'Firefox ESR'],
    shimVideojs: workingPkg.spellbook['shim-videojs'] || workingPkg.spellbook['shim-video.js'] || true,
    bannerObj: {
      name: workingPkg.name,
      version: workingPkg.version,
      copyright: workingPkg.author,
      license: workingPkg.license
    },
    dist: path.join(appRoot, 'dist'),

    docs: Object.assign({
      src: path.join(appRoot, 'docs')
    }, workingPkg.spellbook.docs || {}),
    lang: Object.assign({
      src: path.join(appRoot, 'lang')
    }, workingPkg.spellbook.lang || {}),
    test: Object.assign({
      src: path.join(appRoot, 'test')
    }, workingPkg.spellbook.lang || {}),

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
