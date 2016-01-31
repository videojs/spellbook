import fs from 'fs-extra';
import tap from 'tap';
import spell from '../../spells/build-tests';
import {useFixture} from '../helpers';

tap.equal(typeof spell, 'function', 'the spell is a function');
tap.equal(typeof spell.help(), 'string', 'the spell help returns a string');

tap.test('compiles tests', useFixture('build-tests', (t, tmp, teardown) => {
  spell(tmp).then(() => {
    t.ok(
      fs.existsSync(tmp('test/dist/bundle.js')),
      'tests were compiled into one file'
    );

    teardown();
  });
}));
