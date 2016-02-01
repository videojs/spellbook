import os from 'os';
import tsts from 'tsts';
import descope from '../lib/descope';
import plugin from '../lib/builders/plugin';

/**
 * Build JS spell.
 *
 * @param {Function} dirfn
 * @param {Object} argv
 */
const spell = (dirfn) => {
  const pkg = require(dirfn('package.json'));

  return plugin(dirfn, descope(pkg.name));
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
spell.help = () => tsts.pre`
  The "build-js" spell can be cast in a video.js plugin project to build
  its ES6 asset(s) into both ES5/CommonJS modules and into browser-ready
  assets. It takes no arguments or options:

    cast build-js
` + os.EOL;

export default spell;
