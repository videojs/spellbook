(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _index = require(2);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

QUnit.module("browserify require"); /**
                                     * browserify test 
                                     */

QUnit.test("test-pkg-main should be requireable via browserify", function (assert) {
  assert.ok(_index2.default, "test-pkg-main is required properly");
});

},{"2":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _testPkgTwo = require(3);

var _testPkgTwo2 = _interopRequireDefault(_testPkgTwo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestingThing = function () {
  function TestingThing() {
    _classCallCheck(this, TestingThing);

    this.bar = 'bar';
  }

  _createClass(TestingThing, [{
    key: 'foo',
    value: function foo() {
      return (0, _testPkgTwo2.default)(this.bar);
    }
  }]);

  return TestingThing;
}();

exports.default = TestingThing;


var t = new TestingThing();
console.log(t.foo());

// intentional double empty line to cause error


// long comment to cause a warning in eslint
// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

},{"3":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (a) {
	return a;
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// this should all be deleted
var UltimateTest = exports.UltimateTest = function UltimateTest(test) {
	_classCallCheck(this, UltimateTest);

	this.test = test;
};

;


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC90ZXN0L2Jyb3dzZXJpZnkuc3RhcnQuanMiLCJzcmMvanMvaW5kZXguanMiLCIuLi90ZXN0LXBrZy10d28vZXM1LWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNHQTs7Ozs7O0FBRUEsTUFBTSxNQUFOLENBQWEsb0JBQWIsRSxDQUxBOzs7O0FBTUEsTUFBTSxJQUFOLENBQVcsb0RBQVgsRUFBaUUsVUFBQyxNQUFELEVBQVk7QUFDM0UsU0FBTyxFQUFQLGtCQUFlLG9DQUFmO0FBQ0QsQ0FGRDs7Ozs7Ozs7Ozs7QUNOQTs7Ozs7Ozs7SUFFcUIsWTtBQUNuQiwwQkFBYztBQUFBOztBQUNaLFNBQUssR0FBTCxHQUFXLEtBQVg7QUFDRDs7OzswQkFDSztBQUNKLGFBQU8sMEJBQVMsS0FBSyxHQUFkLENBQVA7QUFDRDs7Ozs7O2tCQU5rQixZOzs7QUFTckIsSUFBTSxJQUFJLElBQUksWUFBSixFQUFWO0FBQ0EsUUFBUSxHQUFSLENBQVksRUFBRSxHQUFGLEVBQVo7O0FBRUE7OztBQUdBO0FBQ0E7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIGJyb3dzZXJpZnkgdGVzdCBcbiAqL1xuaW1wb3J0IHBrZyBmcm9tIFwiLi4vLi4vc3JjL2pzL2luZGV4LmpzXCI7XG5cblFVbml0Lm1vZHVsZShcImJyb3dzZXJpZnkgcmVxdWlyZVwiKTtcblFVbml0LnRlc3QoXCJ0ZXN0LXBrZy1tYWluIHNob3VsZCBiZSByZXF1aXJlYWJsZSB2aWEgYnJvd3NlcmlmeVwiLCAoYXNzZXJ0KSA9PiB7XG4gIGFzc2VydC5vayhwa2csIFwidGVzdC1wa2ctbWFpbiBpcyByZXF1aXJlZCBwcm9wZXJseVwiKTtcbn0pOyIsImltcG9ydCBSZXR1cm5NZSBmcm9tICd0ZXN0LXBrZy10d28nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0aW5nVGhpbmcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJhciA9ICdiYXInO1xuICB9XG4gIGZvbygpIHtcbiAgICByZXR1cm4gUmV0dXJuTWUodGhpcy5iYXIpO1xuICB9XG59XG5cbmNvbnN0IHQgPSBuZXcgVGVzdGluZ1RoaW5nKCk7XG5jb25zb2xlLmxvZyh0LmZvbygpKTtcblxuLy8gaW50ZW50aW9uYWwgZG91YmxlIGVtcHR5IGxpbmUgdG8gY2F1c2UgZXJyb3JcblxuXG4vLyBsb25nIGNvbW1lbnQgdG8gY2F1c2UgYSB3YXJuaW5nIGluIGVzbGludFxuLy8gYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuXHRyZXR1cm4gYTtcbn07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8vIHRoaXMgc2hvdWxkIGFsbCBiZSBkZWxldGVkXG52YXIgVWx0aW1hdGVUZXN0ID0gZXhwb3J0cy5VbHRpbWF0ZVRlc3QgPSBmdW5jdGlvbiBVbHRpbWF0ZVRlc3QodGVzdCkge1xuXHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgVWx0aW1hdGVUZXN0KTtcblxuXHR0aGlzLnRlc3QgPSB0ZXN0O1xufTtcblxuO1xuXG4iXX0=
