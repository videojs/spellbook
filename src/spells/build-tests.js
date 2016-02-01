import os from 'os';
import tsts from 'tsts';
import tests from '../lib/builders/tests';

/**
 * Build test spell.
 *
 * @param {Function} dirfn
 * @param {Object} argv
 */
const spell = (dirfn) => tests(dirfn);

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
spell.help = () => tsts.pre`
  The "build-tests" spell can be cast in a video.js plugin project to
  create a complete, bundled JavaScript file which can be used to run
  all unit tests in the project. It takes no arguments or options:

    cast build-tests
` + os.EOL;

export default spell;
