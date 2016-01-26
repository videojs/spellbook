import fs from 'fs-extra';
import tap from 'tap';
import spell from '../../spells/build-js';
import {useFixture} from '../helpers';

tap.equal(typeof spell, 'function', 'the spell is a function');
tap.equal(typeof spell.help(), 'string', 'the spell help returns a string');

tap.test('compiles js', useFixture('build-js', (t, tmp, teardown) => {
  spell(tmp).then(() => {
    t.ok(fs.existsSync(tmp('es5/other.js')), 'the es5/other.js file was created');
    t.ok(fs.existsSync(tmp('es5/plugin.js')), 'the es5/plugin.js file was created');
    teardown();
  });
}));
