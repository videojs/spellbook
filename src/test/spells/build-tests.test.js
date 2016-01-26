import tap from 'tap';
import spell from '../../spells/build-tests';

tap.equal(typeof spell, 'function', 'the spell is a function');
tap.equal(typeof spell.help(), 'string', 'the spell help returns a string');
