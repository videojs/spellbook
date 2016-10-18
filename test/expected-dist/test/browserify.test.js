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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L3Rlc3QvYnJvd3NlcmlmeS5zdGFydC5qcyIsInNyYy9qcy9pbmRleC5qcyIsIi4uL3Rlc3QtcGtnLXR3by9lczUtaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0dBOzs7Ozs7QUFFQSxNQUFNLE1BQU4sQ0FBYSxvQkFBYixFLENBTEE7Ozs7QUFNQSxNQUFNLElBQU4sQ0FBVyxvREFBWCxFQUFpRSxVQUFDLE1BQUQsRUFBWTtBQUMzRSxTQUFPLEVBQVAsa0JBQWUsb0NBQWY7QUFDRCxDQUZEOzs7Ozs7Ozs7OztBQ05BOzs7Ozs7OztJQUVxQixZO0FBQ25CLDBCQUFjO0FBQUE7O0FBQ1osU0FBSyxHQUFMLEdBQVcsS0FBWDtBQUNEOzs7OzBCQUNLO0FBQ0osYUFBTywwQkFBUyxLQUFLLEdBQWQsQ0FBUDtBQUNEOzs7Ozs7a0JBTmtCLFk7OztBQVNyQixJQUFNLElBQUksSUFBSSxZQUFKLEVBQVY7QUFDQSxRQUFRLEdBQVIsQ0FBWSxFQUFFLEdBQUYsRUFBWjs7QUFFQTs7O0FBR0E7QUFDQTs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogYnJvd3NlcmlmeSB0ZXN0IFxuICovXG5pbXBvcnQgcGtnIGZyb20gXCIuLi8uLi9zcmMvanMvaW5kZXguanNcIjtcblxuUVVuaXQubW9kdWxlKFwiYnJvd3NlcmlmeSByZXF1aXJlXCIpO1xuUVVuaXQudGVzdChcInRlc3QtcGtnLW1haW4gc2hvdWxkIGJlIHJlcXVpcmVhYmxlIHZpYSBicm93c2VyaWZ5XCIsIChhc3NlcnQpID0+IHtcbiAgYXNzZXJ0Lm9rKHBrZywgXCJ0ZXN0LXBrZy1tYWluIGlzIHJlcXVpcmVkIHByb3Blcmx5XCIpO1xufSk7IiwiaW1wb3J0IFJldHVybk1lIGZyb20gJ3Rlc3QtcGtnLXR3byc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RpbmdUaGluZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYmFyID0gJ2Jhcic7XG4gIH1cbiAgZm9vKCkge1xuICAgIHJldHVybiBSZXR1cm5NZSh0aGlzLmJhcik7XG4gIH1cbn1cblxuY29uc3QgdCA9IG5ldyBUZXN0aW5nVGhpbmcoKTtcbmNvbnNvbGUubG9nKHQuZm9vKCkpO1xuXG4vLyBpbnRlbnRpb25hbCBkb3VibGUgZW1wdHkgbGluZSB0byBjYXVzZSBlcnJvclxuXG5cbi8vIGxvbmcgY29tbWVudCB0byBjYXVzZSBhIHdhcm5pbmcgaW4gZXNsaW50XG4vLyBhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG5cdHJldHVybiBhO1xufTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLy8gdGhpcyBzaG91bGQgYWxsIGJlIGRlbGV0ZWRcbnZhciBVbHRpbWF0ZVRlc3QgPSBleHBvcnRzLlVsdGltYXRlVGVzdCA9IGZ1bmN0aW9uIFVsdGltYXRlVGVzdCh0ZXN0KSB7XG5cdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBVbHRpbWF0ZVRlc3QpO1xuXG5cdHRoaXMudGVzdCA9IHRlc3Q7XG59O1xuXG47XG5cbiJdfQ==
