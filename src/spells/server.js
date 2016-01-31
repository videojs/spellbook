import 'babel-polyfill';
import budo from 'budo';
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

spell.help = () => 'help me!';

export default spell;
