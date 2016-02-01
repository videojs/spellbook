import os from 'os';
import tsts from 'tsts';
import descope from '../lib/descope';
import css from '../lib/builders/css';

/**
 * Build CSS spell.
 *
 * @param {Function} dirfn
 * @param {Object} argv
 */
const spell = (dirfn) => {
  const pkg = require(dirfn('package.json'));

  return css(dirfn, descope(pkg.name));
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
spell.help = () => tsts.pre`
  The "build-css" spell can be cast in a video.js plugin project to build
  its Sass asset(s) into CSS. It takes no arguments or options:

    cast build-css
` + os.EOL;

export default spell;
