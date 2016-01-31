import 'babel-polyfill';
import fs from 'fs-extra';
import sass from 'node-sass';
import util from 'util';
import bannerize from '../bannerize';

// Paths relative to a plugin's root directory.
const PATH_DEST = 'dist';
const PATH_SRC = 'src/plugin.scss';
const PATH_OUT = 'dist/%s.css';

/**
 * Builds styles for the plugin.
 *
 * @param  {Function} dirfn
 *         A function that creates paths relative to the project root.
 * @param  {String} name
 *         The plugin name (without a scope).
 * @return {Promise}
 */
const css = (dirfn, name) => {
  return new Promise((resolve, reject) => {
    try {
      const outfile = util.format(PATH_OUT, name);
      const result = sass.renderSync({
        file: dirfn(PATH_SRC),
        outputStyle: 'compressed'
      });

      fs.ensureDirSync(dirfn(PATH_DEST));
      fs.writeFileSync(dirfn(outfile), result.css);
      bannerize(dirfn(outfile));
      resolve();
    } catch (x) {
      reject(x);
    }
  });
};

export default css;
