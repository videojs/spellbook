import fs from 'fs-extra';
import tap from 'tap';
import spell from '../../spells/build-js';
import {useFixture} from '../helpers';

tap.equal(typeof spell, 'function', 'the spell is a function');
tap.equal(typeof spell.help(), 'string', 'the spell help returns a string');

tap.test('compiles js', useFixture('build-js', (t, tmp, teardown) => {
  spell(tmp).then(() => {

    t.ok(fs.existsSync(tmp('es5/other.js')), 'babel was run on src/other.js');

    t.ok(fs.existsSync(tmp('es5/plugin.js')), 'babel was run on src/plugin.js');

    t.ok(
      fs.existsSync(tmp('dist/build-js-fixture.js')),
      'browserify was run on plugin.js'
    );

    t.ok(
      fs.existsSync(tmp('dist/build-js-fixture.min.js')),
      'uglify was run on dist/build-js-fixture.js'
    );

    teardown();
  });
}));
