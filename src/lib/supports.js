import fs from 'fs-extra';

/**
 * Determines whether or not a project supports Bower.
 *
 * @param  {Function} dirfn
 * @return {Boolean}
 */
const bower = (dirfn) => {
  try {
    fs.statSync(dirfn('bower.json'));
    return true;
  } catch (x) {
    return false;
  }
};

/**
 * Determines whether or not a project has the CHANGELOG setup provided
 * by the plugin generator.
 *
 * @param  {Function} dirfn
 * @return {Boolean}
 */
const changelog = (dirfn) => {
  let pkg;

  try {
    pkg = require(dirfn('package.json'));
    fs.statSync(dirfn('CHANGELOG.md'));
  } catch (x) {
    return false;
  }

  return pkg.devDependencies.hasOwnProperty('chg') &&
    pkg.scripts.hasOwnProperty('change');
};

export {bower, changelog};
