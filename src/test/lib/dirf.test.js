import path from 'path';
import tap from 'tap';
import dirf from '../../lib/dirf';

tap.equal(dirf('/foo')('bar', 'baz/bop'), '/foo/bar/baz/bop');
tap.equal(dirf('foo')('bar', 'baz/bop'), 'foo/bar/baz/bop');
tap.equal(dirf()(), process.cwd());
tap.equal(dirf()('foo', '..', 'bar'), path.join(process.cwd(), 'bar'));

