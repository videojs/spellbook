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
  var banner = ""
    + "/**\n"
    + " * @version "  + workingPkg.version + "\n"
    + " * @copyright " + workingPkg.author + "\n"
    + " * @license " + workingPkg.license + "\n"
    + " */\n";

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
    docs: workingPkg.spellbook.docs || true,
    css: workingPkg.spellbook.css || true,
    i18n: workingPkg.spellbook.i18n || true,
    js: workingPkg.spellbook.js || true,
    shimVideojs: workingPkg.spellbook['shim-videojs'] || workingPkg.spellbook['shim-video.js'] || true,
    port: workingPkg.spellbook.port || 9999,

    src: workingPkg.spellbook.src || 'src',
    dist: workingPkg.spellbook.dist || 'dist',
    banner: banner,
  };

  // tack on the fullpath
  config.src = path.join(config.path, config.src);
  config.dist = path.join(config.path, config.dist);
  return config;
};

module.exports = GetConfig;
