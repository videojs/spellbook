import 'babel-polyfill';

import bannerize from 'bannerize';
import browserify from 'browserify';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import sh from 'shelljs';
import tsts from 'tsts';
import uglifyjs from 'uglify-js';

const babel = require('babel');

const cwd = process.cwd();

/**
 * Removes the "@foo" scope from a package name.
 *
 * @param  {String} name
 */
const descope = name => name.split('/').reverse()[0];

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
      .bundle()
      .pipe(fs.createWriteStream(`dist/${name}.js`))
      .on('finish', resolve)
      .on('error', reject);
  });
};

/**
 * Build spell.
 *
 * @param  {Object} pkg
 */
const build = (pkg) => {
  const cwd = process.cwd();
  const name = descope(pkg.name);

  transpile(glob.sync('src/**/*.js'));
  fs.ensureDirSync('dist');

  bundle(name)
    .then(() => {

      let minified = uglifyjs.minify(`dist/${name}.js`);
      fs.writeFileSync(`dist/${name}.min.js`, minified.code);

      bannerize(`dist/*.js`, {

        // Make sure to pass an absolute path here, so that `bannerize()` does
        // not look for the banner template in `cwd`.
        banner: path.join(__dirname, '..', 'assets', 'banner.ejs'),
        cwd
      });

      console.log('build complete.');
    })
    .catch(x => throw x);
};

/**
 * Gets help text for the build spell.
 *
 * @return {String}
 */
build.help = () => 'help me!';

export default build;
