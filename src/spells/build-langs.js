import os from 'os';
import tsts from 'tsts';
import langs from '../lib/builders/langs';

/**
 * Build languages spell.
 *
 * @param {Function} dirfn
 * @param {Object} argv
 */
const spell = (dirfn) => langs(dirfn);

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
spell.help = () => tsts.pre`
  The "build-langs" spell can be cast in a video.js plugin project to build
  any language files into JavaScript files for use in the browser. It takes
  no arguments or options:

    cast build-langs
` + os.EOL;

export default spell;
