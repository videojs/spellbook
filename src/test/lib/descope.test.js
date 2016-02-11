import tap from 'tap';
import descope from '../../lib/descope';

tap.equal(descope('@foo/bar'), 'bar');
tap.equal(descope('@foo/bar-baz'), 'bar-baz');
tap.equal(descope('foo'), 'foo');
tap.equal(descope('foo/bar'), 'bar');
tap.equal(descope('foo/bar/baz'), 'baz');
