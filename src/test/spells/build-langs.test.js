import fs from 'fs-extra';
import tap from 'tap';
import spell from '../../spells/build-langs';
import {useFixture} from '../helpers';

tap.equal(typeof spell, 'function', 'the spell is a function');
tap.equal(typeof spell.help(), 'string', 'the spell help returns a string');

tap.test('compiles langs', useFixture('build-langs', (t, tmp, teardown) => {
  spell(tmp).then(() => {
    t.ok(fs.existsSync(tmp('dist/lang/foo.js')), 'videojs-languages was run');
    teardown();
  });
}));
