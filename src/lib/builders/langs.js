import 'babel-polyfill';
import fs from 'fs-extra';
import languages from 'videojs-languages';

// Paths relative to a plugin's root directory.
const PATH_DEST = 'dist/lang';
const PATH_SRC = 'lang/*.json';

/**
 * Builds language files for the plugin.
 *
 * @param  {Function} dirfn
 *         A function that creates paths relative to the project root.
 * @return {Promise}
 */
const langs = (dirfn) => {
  return new Promise((resolve, reject) => {
    try {
      const dist = dirfn(PATH_DEST);

      fs.ensureDirSync(dist);
      languages(dirfn(PATH_SRC), dist);
      resolve();
    } catch (x) {
      reject(x);
    }
  });
};

export default langs;
