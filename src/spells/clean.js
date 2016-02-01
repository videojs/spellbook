import 'babel-polyfill';
import fs from 'fs-extra';
import os from 'os';
import tsts from 'tsts';

/**
 * Clean spell.
 *
 * @param {Function} dir
 * @param {Object} argv
 */
const spell = (dir) => {
  ['dist', 'test/dist', 'es5'].map(n => dir(n)).forEach(fs.removeSync);
  return new Promise((resolve, reject) => resolve());
};

spell.help = () => tsts.pre`
  The "clean" spell can be cast in a video.js plugin project to remove
  all build artifacts. It takes no arguments or options:

    cast clean
` + os.EOL;

export default spell;
