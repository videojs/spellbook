import TestingThing from '../js/index';
import QUnit from 'qunitjs';

QUnit.module('test', {
  beforeEach() {},
  afterEach() {}
});

QUnit.test('bar fn returns bar', function(assert) {
  const test = new TestingThing();

  assert.strictEqual(test.bar(), 'bar', 'bar returns this.bar');
});
