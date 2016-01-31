import buildCSS from './build-css';
import buildJS from './build-js';
import buildLangs from './build-langs';
import buildTests from './build-tests';
import clean from './clean';
import server from './server';
import test from './test';
import version from './version';

export default {
  'build-css': buildCSS,
  'build-js': buildJS,
  'build-langs': buildLangs,
  'build-tests': buildTests,
  clean,
  server,
  test,
  version
};
