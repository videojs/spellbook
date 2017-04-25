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
  var scope = workingPkg.name.replace(name, '').replace(/\/$/, '');

  if (Array.isArray(workingPkg.author)) {
    console.error('Author cannot be an array in package.json, as this is invalid, going to use first author');
    console.error('See: https://docs.npmjs.com/files/package.json#people-fields-author-contributors');
    workingPkg.author = workingPkg.author[0];
  }

  var author = workingPkg.author || '';

  if (typeof workingPkg.author === 'object') {
    if (!workingPkg.author.name) {
      console.error('author must have a name key or be a string in package.json!');
      console.error('See: https://docs.npmjs.com/files/package.json#people-fields-author-contributors');
    }
    author = workingPkg.author.name || '';
    if (workingPkg.author.email) {
      author += ' <' + workingPkg.author.email + '>';
    }
    if (workingPkg.author.url) {
      author += ' (' + workingPkg.author.url + ')';
    }
  }

  var logLevel = 'info';

  if (typeof process.env.SB_LOG_LEVEL !== 'undefined') {
    if (process.env.SB_LOG_LEVEL === 'false') {
      logLevel = false;
    } else {
      logLevel = process.env.SB_LOG_LEVEL;
    }
  } else if (typeof workingPkg.spellbook.logLevel !== 'undefined') {
    logLevel = workingPkg.spellbook.logLevel;
  }

  var shim = {
    "qunitjs": {exports: "global:QUnit" },
    "qunit": {exports: "global:QUnit" },
    "sinon": {exports: "global:sinon" },
    "video.js": {exports: "global:videojs"},
  };

  if (workingPkg.spellbook.shim) {
    if (typeof workingPkg.spellbook.shim !== 'object') {
      workingPkg.spellbook.shim = {};
    }

    Object.keys(workingPkg.spellbook.shim).forEach(function(k) {
      if (typeof workingPkg.spellbook.shim[k] === 'string') {
        shim[k] = {exports: workingPkg.spellbook.shim[k]};
      } else if (workingPkg.spellbook.shim[k] === false) {
        if (shim[k]) {
          delete shim[k];
        }
      } else {
        shim[k] = workingPkg.spellbook.shim[k];
      }
    });

  // all shims are off
  } else if (workingPkg.spellbook.shim === false) {
    shim = {};
  }

  var config = {
    // workingPkg information
    name: name,
    scope: scope,
    author: author,
    version: workingPkg.version,
    path: appRoot,
    main: workingPkg['main'] ? path.join(appRoot, workingPkg.main) : '',
    jsNextMain: workingPkg['jsnext:main'] ? path.join(appRoot, workingPkg['jsnext:main']) : '',

    // workingPkg settings
    logLevel: logLevel,
    ie8: workingPkg.spellbook.ie8 || false,
    shim: shim,
    bannerObj: {
      name: workingPkg.name || '',
      version: workingPkg.version || '',
      author: author,
      license: workingPkg.license || ''
    }
  };

  var configDefaults = {
    docs: {
      build: true,
      lint: true,
      src: 'docs',
      dist: 'build/docs'
    },
    lang: {
      build: true,
      lint: true,
      src: 'lang',
      dist: 'dist/lang',
    },
    test: {
      build: true,
      lint: true,
      src: 'test',
      dist: 'build/test',
      devBrowsers: [],
      skipBrowsers: [],
      slBrowsers: [],
      bsBrowsers: [],
      travisBrowsers: [],
      teamcityBrowsers: [],
      files: [],
      node: true,
      bundlers: ['webpack', 'browserify']
    },
    js: {
      build: true,
      lint: true,
      src: 'src/js',
      distBrowser: 'dist',
      distNode: 'build/es5',
    },
    css: {
      build: true,
      lint: true,
      src: 'src/css',
      dist: 'dist',
      browserList: ['> 1%', 'last 4 versions', 'Firefox ESR'],
    }
  };

  ['docs', 'lang', 'test', 'js', 'css'].forEach(function(type) {
    config[type] = workingPkg.spellbook[type];

    if (config[type] === false) {
      return;
    }

    if (config[type] === true || typeof config[type] === 'undefined') {
      config[type] = configDefaults[type];
    } else {
      config[type] = Object.assign(configDefaults[type], config[type]);
    }

    if (config[type].src) {
      config[type].src = path.join(appRoot, config[type].src);
    }

    if (config[type].dist) {
      config[type].dist = path.join(appRoot, config[type].dist);
    }

    if (config[type].distBrowser) {
      config[type].distBrowser = path.join(appRoot, config[type].distBrowser);
    }

    if (config[type].distNode) {
      config[type].distNode = path.join(appRoot, config[type].distNode);
    }
  });

  return config;
};

module.exports = GetConfig;
