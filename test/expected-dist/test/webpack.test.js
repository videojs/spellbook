/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nvar _index = __webpack_require__(1);\n\nvar _index2 = _interopRequireDefault(_index);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nQUnit.module(\"webpack require\"); /**\n                                  * webpack test \n                                  */\n\nQUnit.test(\"test-pkg-main should be requireable via webpack\", function (assert) {\n  assert.ok(_index2.default, \"test-pkg-main is required properly\");\n});\n\n/*****************\n ** WEBPACK FOOTER\n ** ./dist/test/webpack.start.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./dist/test/webpack.start.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _testPkgTwo = __webpack_require__(2);\n\nvar _testPkgTwo2 = _interopRequireDefault(_testPkgTwo);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar TestingThing = function () {\n  function TestingThing() {\n    _classCallCheck(this, TestingThing);\n\n    this.bar = 'bar';\n  }\n\n  _createClass(TestingThing, [{\n    key: 'foo',\n    value: function foo() {\n      return (0, _testPkgTwo2.default)(this.bar);\n    }\n  }]);\n\n  return TestingThing;\n}();\n\nexports.default = TestingThing;\n\n\nvar t = new TestingThing();\nconsole.log(t.foo());\n\n// intentional double empty line to cause error\n\n\n// long comment to cause a warning in eslint\n// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/js/index.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nexports.default = function (a) {\n\treturn a;\n};\n\nfunction _classCallCheck(instance, Constructor) {\n\tif (!(instance instanceof Constructor)) {\n\t\tthrow new TypeError(\"Cannot call a class as a function\");\n\t}\n}\n\n// this should all be deleted\nvar UltimateTest = exports.UltimateTest = function UltimateTest(test) {\n\t_classCallCheck(this, UltimateTest);\n\n\tthis.test = test;\n};\n\n;\n\n/*****************\n ** WEBPACK FOOTER\n ** ../test-pkg-two/es5-index.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///../test-pkg-two/es5-index.js?");

/***/ }
/******/ ]);