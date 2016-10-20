(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReturnMe = function ReturnMe(a) {
  return a;
};

var TestingThing = function () {
  function TestingThing() {
    _classCallCheck(this, TestingThing);

    this.bar = 'bar';
  }

  _createClass(TestingThing, [{
    key: 'foo',
    value: function foo() {
      return ReturnMe(this.bar);
    }
  }]);

  return TestingThing;
}();

var t = new TestingThing();
console.log(t.foo());

// intentional double empty line to cause error


// long comment to cause a warning in eslint
// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

/**
 * rollup test 
 */
QUnit.module("rollup require");
QUnit.test("test-pkg-main should be requireable via rollup", function (assert) {
  assert.ok(TestingThing, "test-pkg-main is required properly");
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L3Rlc3Qvcm9sbHVwLnN0YXJ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7OztBQUVBLElBQUksV0FBVyxTQUFYLFFBQVcsQ0FBQyxDQUFEO0FBQUEsU0FBTyxDQUFQO0FBQUEsQ0FBZjs7SUFFTSxZO0FBQ0osMEJBQWM7QUFBQTs7QUFDWixTQUFLLEdBQUwsR0FBVyxLQUFYO0FBQ0Q7Ozs7MEJBQ0s7QUFDSixhQUFPLFNBQVMsS0FBSyxHQUFkLENBQVA7QUFDRDs7Ozs7O0FBR0gsSUFBTSxJQUFJLElBQUksWUFBSixFQUFWO0FBQ0EsUUFBUSxHQUFSLENBQVksRUFBRSxHQUFGLEVBQVo7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7OztBQUdBLE1BQU0sTUFBTixDQUFhLGdCQUFiO0FBQ0EsTUFBTSxJQUFOLENBQVcsZ0RBQVgsRUFBNkQsVUFBQyxNQUFELEVBQVk7QUFDdkUsU0FBTyxFQUFQLENBQVUsWUFBVixFQUF3QixvQ0FBeEI7QUFDRCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJldHVybk1lID0gKGEpID0+IGE7XG5cbmNsYXNzIFRlc3RpbmdUaGluZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYmFyID0gJ2Jhcic7XG4gIH1cbiAgZm9vKCkge1xuICAgIHJldHVybiBSZXR1cm5NZSh0aGlzLmJhcik7XG4gIH1cbn1cblxuY29uc3QgdCA9IG5ldyBUZXN0aW5nVGhpbmcoKTtcbmNvbnNvbGUubG9nKHQuZm9vKCkpO1xuXG4vLyBpbnRlbnRpb25hbCBkb3VibGUgZW1wdHkgbGluZSB0byBjYXVzZSBlcnJvclxuXG5cbi8vIGxvbmcgY29tbWVudCB0byBjYXVzZSBhIHdhcm5pbmcgaW4gZXNsaW50XG4vLyBhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYVxuXG4vKipcbiAqIHJvbGx1cCB0ZXN0IFxuICovXG5RVW5pdC5tb2R1bGUoXCJyb2xsdXAgcmVxdWlyZVwiKTtcblFVbml0LnRlc3QoXCJ0ZXN0LXBrZy1tYWluIHNob3VsZCBiZSByZXF1aXJlYWJsZSB2aWEgcm9sbHVwXCIsIChhc3NlcnQpID0+IHtcbiAgYXNzZXJ0Lm9rKFRlc3RpbmdUaGluZywgXCJ0ZXN0LXBrZy1tYWluIGlzIHJlcXVpcmVkIHByb3Blcmx5XCIpO1xufSk7Il19
