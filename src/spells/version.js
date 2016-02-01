import 'babel-polyfill';
import {exec} from 'child_process';
import os from 'os';
import tsts from 'tsts';

/**
 * Version spell.
 *
 * @param {Function} dirfn
 * @param {Object} argv
 */
const spell = (dirfn) => {
  return new Promise((resolve, reject) => {
    const v = require(dirfn('package.json')).version;

    // If there isn't a bower.json, we don't need to do anything.
    try {
      require(dirfn('bower.json'));
    } catch (x) {
      reject(x);
      return;
    }

    exec(tsts.join`
      git add package.json &&
      git commit -m "${v}" &&
      npm run build &&
      git add -f dist
    `, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
spell.help = () => tsts.pre`
  The "version" spell can be cast in a video.js plugin project by way of
  the "npm version" script.

  It will look for a "bower.json" file to decide if the project wants to
  support Bower. If so, when the tag is created, it will be created on a
  special commit off the main history with the "dist/" directory added.

  It takes no arguments or options:

    cast version
` + os.EOL;

export default spell;
