import 'babel-polyfill';
import assign from 'object.assign';
import {exec} from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const BROWSER_NAMES = {
  chrome: 'Chrome',
  firefox: 'Firefox',
  ie: 'IE',
  safari: 'Safari'
};

/**
 * Given an optional array of keys, produces a comma-separated string of
 * browser names.
 *
 * @example
 *   browsers(['chrome', 'safari']); // "Chrome,Safari"
 *   browsers([]); // ""
 * @param  {Array} [keys]
 * @return {String}
 */
const getBrowserString = (keys) => {

  // On Travis, _only_ Firefox is supported, so we can shortcut out here.
  if (process.env.TRAVIS) {
    return BROWSER_NAMES.firefox;
  }

  // If a custom list of browsers was provided from the CLI, narrow it
  // down to those that are known and return a string.
  if (Array.isArray(keys)) {
    return keys
      .filter(k => BROWSER_NAMES.hasOwnProperty(k))
      .map(k => BROWSER_NAMES[k]).join(',');
  }

  // By default, return an empty string. This indicates we'll use whichever
  // browsers are found on the machine.
  return '';
};

/**
 * Test spell.
 *
 * @param {Function} dir
 * @param {Object} argv
 * @param {Array} [argv._]
 *        An array of browser names. Defaults to all.
 */
const spell = (dir, argv) => {
  return new Promise((resolve, reject) => {

    // We _don't_ want a full path here; Karma doesn't like that. :)
    let configTempFile = `karma-${process.pid}-${Date.now()}.conf.js`;
    let cmd = `karma start ${configTempFile}`;
    let browsers = getBrowserString(argv ? argv._ : null);

    fs.copySync(
      path.join(__dirname, '..', 'karma.conf.js'),
      dir(configTempFile)
    );

    // If there are browsers requested, append them to the command.
    if (browsers) {
      cmd += ` --browsers ${browsers}`;
    }

    let finish = (error, stdout, stderr) => {
      fs.removeSync(configTempFile);

      if (error) {
        reject(stdout);
      } else {
        resolve(stdout);
      }
    };

    exec('npm bin', (error, stdout, stderr) => {
      if (error) {
        reject(stdout);
      }

      // Make sure `karma` is on our PATH for this command. This is because
      // Karma needs to run from within the project directory. It doesn't seem
      // to work if we try to run it from the spellbook!
      let env = assign({}, process.env, {
        PATH: stdout.toString().trim() + ':' + process.env.PATH
      });

      exec(cmd, {env}, finish);
    });
  });
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
spell.help = () => 'help me!';

export default spell;
