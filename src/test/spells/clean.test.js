import fs from 'fs-extra';
import tap from 'tap';
import spell from '../../spells/clean';
import {useFixture} from '../helpers';

tap.equal(typeof spell, 'function', 'the spell is a function');
tap.equal(typeof spell.help(), 'string', 'the spell help returns a string');

tap.test('cleans up build artifacts', useFixture('clean', (t, tmp, teardown) => {
  spell(tmp).then(() => {
    t.ok(fs.existsSync(tmp('package.json')), 'does not delete package.json');
    t.ok(fs.existsSync(tmp('src/plugin.js')), 'does not delete src/');
    t.notOk(fs.existsSync(tmp('dist')), 'deletes dist/');
    t.notOk(fs.existsSync(tmp('dist-test')), 'deletes dist-test/');
    t.notOk(fs.existsSync(tmp('es5')), 'deletes es5/');
    teardown();
  });
}));
