import fs from 'fs-extra';
import tap from 'tap';
import spell from '../../spells/build-css';
import {useFixture} from '../helpers';

tap.equal(typeof spell, 'function', 'the spell is a function');
tap.equal(typeof spell.help(), 'string', 'the spell help returns a string');

tap.test('compiles css', useFixture('build-css', (t, tmp, teardown) => {
  let css = tmp('dist/build-css-fixture.css');

  spell(tmp).then(() => {
    t.ok(fs.existsSync(css), 'css file should have been created');

    t.equal(
      fs.readFileSync(css, 'utf8').trim(),
      '.video-js{color:red}',
      'sass should have been processed'
    );

    teardown();
  });
}));
