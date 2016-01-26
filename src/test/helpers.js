import fs from 'fs-extra';
import path from 'path';
import dirf from '../lib/dirf';

/**
 * Run a tests function in a temporary directory by copying a
 * fixture directory before hand.
 *
 * @param  {String} name
 *         The name of the fixture sub-dir to copy.
 * @param  {Function} cb
 *         This function runs tests. It gets a single argument: a function
 *         which generates paths (e.g. path.join) within the created
 *         temporary directory.
 */
const useFixture = (name, cb) => {

  // The `t` here is a `tap` object.
  return t => {
    let tmp = path.join(__dirname, '..', 'tmp');

    fs.copySync(path.join(__dirname, '..', 'fixtures', name), tmp);

    // The callback is invoked with the `tap` object, a "dirf" of the temp
    // directory, and a teardown function.
    cb(t, dirf(tmp), () => {
      fs.removeSync(tmp);
      t.end();
    });
  };
};

export {
  useFixture
};
