import 'babel-polyfill';
import {exec} from 'child_process';
import os from 'os';
import * as supports from '../lib/supports';
import tsts from 'tsts';

/**
 * Postversion spell.
 *
 * @param {Function} dirfn
 * @param {Object} argv
 */
const spell = (dirfn) => {
  return new Promise((resolve, reject) => {
    if (supports.bower()) {
      exec('git reset --hard HEAD~1', (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve(stdout);
        }
      });
    }
  });
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
spell.help = () => tsts.pre`
  The "postversion" spell can be cast in a video.js plugin project by way
  of the "npm postversion" script.

  It will look for a "bower.json" file to decide if the project wants to
  support Bower. If so, the current branch will be rolled back by one
  commit to keep the tag and its addition of the dist/ directory out of
  the main history.

  It takes no arguments or options:

    cast postversion
` + os.EOL;

export default spell;
