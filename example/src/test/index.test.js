import TestingThing from '../js/index';
import QUnit from 'qunitjs';
import sinon from 'sinon';

QUnit.module('test', {
  beforeEach() {},
  afterEach() {}
});

QUnit.test('foo fn returns bar', function(assert) {
  const test = new TestingThing();

  assert.strictEqual(test.foo(), 'bar', 'bar returns this.bar');
});
