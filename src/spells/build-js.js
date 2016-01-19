/* eslint no-console:0 */
import 'babel-polyfill';
import browserify from 'browserify';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import uglifyjs from 'uglify-js';
import bannerize from '../lib/bannerize';
import descope from '../lib/descope';

const babel = require('babel');

const cwd = process.cwd();

/**
 * Transpile an array of files.
 *
 * @param  {String[]} files
 */
const transpile = files => {
  files.forEach(filename => {
    filename = path.resolve(cwd, filename);

    let result = babel.transformFileSync(filename);

    let outname = filename.replace(
      path.join(cwd, 'src'),
      path.join(cwd, 'es5')
    );

    fs.ensureDirSync(path.dirname(outname));
    fs.writeFileSync(outname, result.code);
  });
};

/**
 * Creates a Browserify bundle from the plugin entry point.
 *
 * @param  {String} name
 * @return {Promise}
 */
const bundle = (name) => {
  return new Promise((resolve, reject) => {
    browserify('es5/plugin.js', {standalone: name})
      .transform('browserify-shim')
      .bundle()
      .pipe(fs.createWriteStream(`dist/${name}.js`))
      .on('finish', resolve)
      .on('error', reject);
  });
};

/**
 * Build JS spell.
 *
 * @param  {Object} pkg
 */
const buildJS = (pkg) => {
  const name = descope(pkg.name);

  transpile(glob.sync('src/**/*.js'));
  fs.ensureDirSync('dist');

  bundle(name)
    .then(() => {
      let minified = uglifyjs.minify(`dist/${name}.js`);

      fs.writeFileSync(`dist/${name}.min.js`, minified.code);
      bannerize('dist/*.js');
      console.log('build-js complete.');
    })
    .catch(err => {
      throw err;
    });
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
buildJS.help = () => 'help me!';

export default buildJS;
