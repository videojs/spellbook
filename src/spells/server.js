import 'babel-polyfill';
import babelify from 'babelify';
import browserify from 'browserify';
import shim from 'browserify-shim';
import versionify from 'browserify-versionify';
import budo from 'budo';
import fs from 'fs-extra';
import glob from 'glob';
import os from 'os';
import tsts from 'tsts';
import builders from '../lib/builders';
import descope from '../lib/descope';

/* eslint no-console: 0 */

/**
 * Server spell.
 *
 * @param {Function} dir
 * @param {Object} argv
 */
const spell = (dir) => {
  const server = budo({
    port: 9999,
    stream: process.stdout
  });

  const name = descope(require(dir('package.json')).name);
  const reload = server.reload.bind(server);

  const bundlers = {

    js: browserify({
      debug: true,
      entries: ['src/plugin.js'],
      standalone: name,
      transform: [
        babelify,
        shim,
        versionify
      ]
    }),

    tests: browserify({
      debug: true,
      entries: glob.sync('test/**/*.test.js'),
      transform: [
        babelify,
        shim,
        versionify
      ]
    })
  };

  const dests = {
    js: `dist/${name}.js`,
    tests: 'test/dist/bundle.js'
  };

  const bundle = (type) => {
    return new Promise((resolve, reject) => {
      bundlers[type]
        .bundle()
        .pipe(fs.createWriteStream(dests[type]))
        .on('finish', resolve)
        .on('error', reject);
    });
  };

  const handlers = [{
    regex: /^lang\/.+\.json$/,
    fn(event, file) {
      return builders.langs(dir);
    }
  }, {
    regex: /^src\/.+\.scss$/,
    fn(event, file) {
      return builders.css(dir, name);
    }
  }, {
    regex: /'^src\/.+\.js$/,
    fn(event, file) {
      return Promise.all([bundle('js'), bundle('tests')]);
    }
  }, {
    regex: /^test\/.+\.test\.js$/,
    fn(event, file) {
      return bundle('tests');
    }
  }];

  fs.ensureDirSync(dir('dist'));

  Promise.all([bundle('js'), bundle('tests')]).then(() => {
    server
      .on('reload', (f) => console.log('reloading %s', f || 'everything'))
      .live()
      .watch([
        'index.html',
        'lang/*.json',
        'src/**/*.{scss,js}',
        'src/**/*.js',
        'test/**/*.test.js',
        'test/index.html'
      ])
      .on('watch', (event, file) => {
        let handler = handlers.find(h => h.regex.test(file));

        console.log(`detected a "${event}" event in "${file}"`);

        if (handler && handler.fn) {
          handler.fn(event, file).then(reload);
        } else {
          reload();
        }
      });
  });

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.on('exit', resolve);
  });
};

spell.help = () => tsts.pre`
  The "server" spell can be cast in a video.js plugin project to start a
  server at port 9999 (or the nearest available) that will reload itself
  when certain files in the project change. It handles all build tasks
  internally - there are no separate watch scripts to run.

  It takes no arguments or options:

    cast server
` + os.EOL;

export default spell;
