/* eslint no-console:0 */
import fs from 'fs-extra';
import tap from 'tap';
import buildCSS from '../../spells/build-css';
import {useFixture} from '../helpers';

tap.test('compiles css', t => {
  useFixture('build-css', tmp => {
    let css = tmp('dist/build-css-fixture.css');

    buildCSS(tmp);
    t.ok(fs.existsSync(css), 'css file should have been created');

    t.equal(
      fs.readFileSync(css, 'utf8').trim(),
      '.video-js{color:red}',
      'sass should have been processed'
    );

    t.end();
  });
});
