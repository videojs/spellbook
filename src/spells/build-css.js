import 'babel-polyfill';
import fs from 'fs-extra';
import sass from 'node-sass';
import bannerize from '../lib/bannerize';
import descope from '../lib/descope';

/**
 * Build CSS spell.
 *
 * @param {Function} dir
 * @param {Object} argv
 */
const buildCSS = (dir) => {
  const pkg = require(dir('package.json'));
  const name = descope(pkg.name);
  const result = sass.renderSync({
    file: dir('src/plugin.scss'),
    outputStyle: 'compressed'
  });

  fs.ensureDirSync(dir('dist'));
  fs.writeFileSync(dir(`dist/${name}.css`), result.css);
  bannerize(dir(`dist/${name}.css`));
  return new Promise((resolve, reject) => resolve());
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
buildCSS.help = () => 'help me!';

export default buildCSS;
