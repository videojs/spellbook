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
var sinon = (typeof window !== "undefined" ? window['sinon'] : typeof global !== "undefined" ? global['sinon'] : null);

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

QUnit.module('test', {
  beforeEach: function beforeEach() {},
  afterEach: function afterEach() {}
});

QUnit.test('foo fn returns bar', function (assert) {
  var test = new TestingThing();

  assert.strictEqual(test.foo(), 'bar', 'bar returns this.bar');
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L2luZGV4LnRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7Ozs7Ozs7O0FBRUEsU0FBUyxlQUFULENBQTBCLEVBQTFCLEVBQThCO0FBQUUsU0FBUSxNQUFPLFFBQU8sRUFBUCx5Q0FBTyxFQUFQLE9BQWMsUUFBckIsSUFBa0MsYUFBYSxFQUFoRCxHQUFzRCxHQUFHLFNBQUgsQ0FBdEQsR0FBc0UsRUFBN0U7QUFBa0Y7O0FBRWxILElBQUksUUFBUSxnQkFBZ0IsUUFBUSxTQUFSLENBQWhCLENBQVo7QUFDQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVo7O0FBRUEsSUFBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLENBQUQ7QUFBQSxTQUFPLENBQVA7QUFBQSxDQUFmOztJQUVNLFk7QUFDSiwwQkFBYztBQUFBOztBQUNaLFNBQUssR0FBTCxHQUFXLEtBQVg7QUFDRDs7OzswQkFDSztBQUNKLGFBQU8sU0FBUyxLQUFLLEdBQWQsQ0FBUDtBQUNEOzs7Ozs7QUFHSCxJQUFNLElBQUksSUFBSSxZQUFKLEVBQVY7QUFDQSxRQUFRLEdBQVIsQ0FBWSxFQUFFLEdBQUYsRUFBWjs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQSxNQUFNLE1BQU4sQ0FBYSxNQUFiLEVBQXFCO0FBQ25CLFlBRG1CLHdCQUNOLENBQUUsQ0FESTtBQUVuQixXQUZtQix1QkFFUCxDQUFFO0FBRkssQ0FBckI7O0FBS0EsTUFBTSxJQUFOLENBQVcsb0JBQVgsRUFBaUMsVUFBUyxNQUFULEVBQWlCO0FBQ2hELE1BQU0sT0FBTyxJQUFJLFlBQUosRUFBYjs7QUFFQSxTQUFPLFdBQVAsQ0FBbUIsS0FBSyxHQUFMLEVBQW5CLEVBQStCLEtBQS9CLEVBQXNDLHNCQUF0QztBQUNELENBSkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfaW50ZXJvcERlZmF1bHQgKGV4KSB7IHJldHVybiAoZXggJiYgKHR5cGVvZiBleCA9PT0gJ29iamVjdCcpICYmICdkZWZhdWx0JyBpbiBleCkgPyBleFsnZGVmYXVsdCddIDogZXg7IH1cblxudmFyIFFVbml0ID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3F1bml0anMnKSk7XG52YXIgc2lub24gPSByZXF1aXJlKCdzaW5vbicpO1xuXG52YXIgUmV0dXJuTWUgPSAoYSkgPT4gYTtcblxuY2xhc3MgVGVzdGluZ1RoaW5nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5iYXIgPSAnYmFyJztcbiAgfVxuICBmb28oKSB7XG4gICAgcmV0dXJuIFJldHVybk1lKHRoaXMuYmFyKTtcbiAgfVxufVxuXG5jb25zdCB0ID0gbmV3IFRlc3RpbmdUaGluZygpO1xuY29uc29sZS5sb2codC5mb28oKSk7XG5cbi8vIGludGVudGlvbmFsIGRvdWJsZSBlbXB0eSBsaW5lIHRvIGNhdXNlIGVycm9yXG5cblxuLy8gbG9uZyBjb21tZW50IHRvIGNhdXNlIGEgd2FybmluZyBpbiBlc2xpbnRcbi8vIGFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhXG5cblFVbml0Lm1vZHVsZSgndGVzdCcsIHtcbiAgYmVmb3JlRWFjaCgpIHt9LFxuICBhZnRlckVhY2goKSB7fVxufSk7XG5cblFVbml0LnRlc3QoJ2ZvbyBmbiByZXR1cm5zIGJhcicsIGZ1bmN0aW9uKGFzc2VydCkge1xuICBjb25zdCB0ZXN0ID0gbmV3IFRlc3RpbmdUaGluZygpO1xuXG4gIGFzc2VydC5zdHJpY3RFcXVhbCh0ZXN0LmZvbygpLCAnYmFyJywgJ2JhciByZXR1cm5zIHRoaXMuYmFyJyk7XG59KTsiXX0=
