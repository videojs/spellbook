import 'babel-polyfill';
import budo from 'budo';
import os from 'os';
import tsts from 'tsts';
import url from 'url';
import builders from '../lib/builders';
import descope from '../lib/descope';
import dirf from '../lib/dirf';

/**
 * Gets the plugin name without a scope.
 *
 * @param  {Function} dirfn
 * @return {String}
 */
const getName = (dirfn) => descope(require(dirfn('package.json')).name);

/**
 * Creates middleware functions that filter the pathname against a given
 * regular expression.
 *
 * @param  {RegExp} regexp
 * @param  {Function} handler
 * @return {Function}
 */
const createMiddleware = (regexp, handler) => {
  return (req, res, next) => {
    const dirfn = dirf();
    const pathname = url.parse(req.url).pathname;

    if (regexp.test(pathname)) {
      handler(dirfn, req, res, next);
    } else {
      next();
    }
  };
};

const middleware = [

  createMiddleware(/^\/dist\/[^/]+\.css$/, (dirfn, req, res, next) => {
    builders.css(dirfn, getName(dirfn)).then(next, next);
  }),

  createMiddleware(/^\/dist\/[^/]+\.js$/, (dirfn, req, res, next) => {
    builders.plugin(dirfn, getName(dirfn)).then(next, next);
  }),

  createMiddleware(/^\/dist\/lang\/[^/]+\.js$/, (dirfn, req, res, next) => {
    builders.langs(dirfn).then(next, next);
  }),

  createMiddleware(/^\/test\/dist\/bundle\.js$/, (dirfn, req, res, next) => {
    builders.tests(dirfn).then(next, next);
  })
];

/**
 * Server spell.
 *
 * @param {Function} dir
 * @param {Object} argv
 */
const spell = (dir) => {
  const server = budo({
    live: true,
    watchGlob: [
      'lang/*.json',
      'src/**/*.{scss,js}',
      'test/**/*.test.js',
      'test/index.html'
    ],
    middleware,
    port: 9999,
    stream: process.stdout
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
