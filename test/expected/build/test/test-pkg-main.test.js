(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _interopDefault(ex) {
  return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var QUnit = _interopDefault((typeof window !== "undefined" ? window['QUnit'] : typeof global !== "undefined" ? global['QUnit'] : null));
var sinon = _interopDefault((typeof window !== "undefined" ? window['sinon'] : typeof global !== "undefined" ? global['sinon'] : null));

// this should all be deleted


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

// some super long line, some super long line, some super long line, some super long line, some super long line

QUnit.module('test', {
  beforeEach: function beforeEach() {
    this.clock = sinon.useFakeTimers();
  },
  afterEach: function afterEach() {
    this.clock.restore();
  }
});

QUnit.test('foo fn returns bar', function (assert) {
  var test = new TestingThing();
  var nope = 'not used';

  assert.strictEqual(test.foo(), 'bar', 'bar returns this.bar');
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L2luZGV4LnRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7Ozs7Ozs7O0FBRUEsU0FBUyxlQUFULENBQTBCLEVBQTFCLEVBQThCO0FBQUUsU0FBUSxNQUFPLFFBQU8sRUFBUCx5Q0FBTyxFQUFQLE9BQWMsUUFBckIsSUFBa0MsYUFBYSxFQUFoRCxHQUFzRCxHQUFHLFNBQUgsQ0FBdEQsR0FBc0UsRUFBN0U7QUFBa0Y7O0FBRWxILElBQUksUUFBUSxnQkFBZ0IsUUFBUSxTQUFSLENBQWhCLENBQVo7QUFDQSxJQUFJLFFBQVEsZ0JBQWdCLFFBQVEsT0FBUixDQUFoQixDQUFaOztBQUVBOzs7QUFHQSxJQUFJLFdBQVcsU0FBWCxRQUFXLENBQUMsQ0FBRDtBQUFBLFNBQU8sQ0FBUDtBQUFBLENBQWY7O0lBRU0sWTtBQUNKLDBCQUFjO0FBQUE7O0FBQ1osU0FBSyxHQUFMLEdBQVcsS0FBWDtBQUNEOzs7OzBCQUNLO0FBQ0osYUFBTyxTQUFTLEtBQUssR0FBZCxDQUFQO0FBQ0Q7Ozs7OztBQUdILElBQU0sSUFBSSxJQUFJLFlBQUosRUFBVjtBQUNBLFFBQVEsR0FBUixDQUFZLEVBQUUsR0FBRixFQUFaOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBLE1BQU0sTUFBTixDQUFhLE1BQWIsRUFBcUI7QUFDbkIsWUFEbUIsd0JBQ047QUFDWCxTQUFLLEtBQUwsR0FBYSxNQUFNLGFBQU4sRUFBYjtBQUNELEdBSGtCO0FBSW5CLFdBSm1CLHVCQUlQO0FBQ1YsU0FBSyxLQUFMLENBQVcsT0FBWDtBQUNEO0FBTmtCLENBQXJCOztBQVNBLE1BQU0sSUFBTixDQUFXLG9CQUFYLEVBQWlDLFVBQVMsTUFBVCxFQUFpQjtBQUNoRCxNQUFNLE9BQU8sSUFBSSxZQUFKLEVBQWI7QUFDQSxNQUFNLE9BQU8sVUFBYjs7QUFFQSxTQUFPLFdBQVAsQ0FBbUIsS0FBSyxHQUFMLEVBQW5CLEVBQStCLEtBQS9CLEVBQXNDLHNCQUF0QztBQUNELENBTEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfaW50ZXJvcERlZmF1bHQgKGV4KSB7IHJldHVybiAoZXggJiYgKHR5cGVvZiBleCA9PT0gJ29iamVjdCcpICYmICdkZWZhdWx0JyBpbiBleCkgPyBleFsnZGVmYXVsdCddIDogZXg7IH1cblxudmFyIFFVbml0ID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3F1bml0anMnKSk7XG52YXIgc2lub24gPSBfaW50ZXJvcERlZmF1bHQocmVxdWlyZSgnc2lub24nKSk7XG5cbi8vIHRoaXMgc2hvdWxkIGFsbCBiZSBkZWxldGVkXG5cblxudmFyIFJldHVybk1lID0gKGEpID0+IGE7XG5cbmNsYXNzIFRlc3RpbmdUaGluZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYmFyID0gJ2Jhcic7XG4gIH1cbiAgZm9vKCkge1xuICAgIHJldHVybiBSZXR1cm5NZSh0aGlzLmJhcik7XG4gIH1cbn1cblxuY29uc3QgdCA9IG5ldyBUZXN0aW5nVGhpbmcoKTtcbmNvbnNvbGUubG9nKHQuZm9vKCkpO1xuXG4vLyBpbnRlbnRpb25hbCBkb3VibGUgZW1wdHkgbGluZSB0byBjYXVzZSBlcnJvclxuXG5cbi8vIGxvbmcgY29tbWVudCB0byBjYXVzZSBhIHdhcm5pbmcgaW4gZXNsaW50XG4vLyBhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYVxuXG4vLyBzb21lIHN1cGVyIGxvbmcgbGluZSwgc29tZSBzdXBlciBsb25nIGxpbmUsIHNvbWUgc3VwZXIgbG9uZyBsaW5lLCBzb21lIHN1cGVyIGxvbmcgbGluZSwgc29tZSBzdXBlciBsb25nIGxpbmVcblxuUVVuaXQubW9kdWxlKCd0ZXN0Jywge1xuICBiZWZvcmVFYWNoKCkge1xuICAgIHRoaXMuY2xvY2sgPSBzaW5vbi51c2VGYWtlVGltZXJzKCk7XG4gIH0sXG4gIGFmdGVyRWFjaCgpIHtcbiAgICB0aGlzLmNsb2NrLnJlc3RvcmUoKTtcbiAgfVxufSk7XG5cblFVbml0LnRlc3QoJ2ZvbyBmbiByZXR1cm5zIGJhcicsIGZ1bmN0aW9uKGFzc2VydCkge1xuICBjb25zdCB0ZXN0ID0gbmV3IFRlc3RpbmdUaGluZygpO1xuICBjb25zdCBub3BlID0gJ25vdCB1c2VkJztcblxuICBhc3NlcnQuc3RyaWN0RXF1YWwodGVzdC5mb28oKSwgJ2JhcicsICdiYXIgcmV0dXJucyB0aGlzLmJhcicpO1xufSk7XG4iXX0=
