(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("vega"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "vega"], factory);
	else if(typeof exports === 'object')
		exports["ReactVega"] = factory(require("react"), require("vega"));
	else
		root["ReactVega"] = factory(root["React"], root["vg"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
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

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createClassFromSpec = undefined;\n\nvar _Vega = __webpack_require__(1);\n\nvar _Vega2 = _interopRequireDefault(_Vega);\n\nvar _createClassFromSpec2 = __webpack_require__(5);\n\nvar _createClassFromSpec3 = _interopRequireDefault(_createClassFromSpec2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _Vega2.default;\nvar createClassFromSpec = exports.createClassFromSpec = _createClassFromSpec3.default;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/index.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/index.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _util = __webpack_require__(3);\n\nvar _vega = __webpack_require__(4);\n\nvar _vega2 = _interopRequireDefault(_vega);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nconsole.log(_vega2.default);\n\nvar propTypes = {\n  className: _react.PropTypes.string,\n  style: _react.PropTypes.object,\n  spec: _react.PropTypes.object.isRequired,\n  width: _react.PropTypes.number,\n  height: _react.PropTypes.number,\n  padding: _react.PropTypes.object,\n  viewport: _react.PropTypes.array,\n  renderer: _react.PropTypes.string,\n  data: _react.PropTypes.object,\n  updateOptions: _react.PropTypes.object\n};\n\nvar Vega = function (_React$Component) {\n  _inherits(Vega, _React$Component);\n\n  function Vega() {\n    _classCallCheck(this, Vega);\n\n    return _possibleConstructorReturn(this, (Vega.__proto__ || Object.getPrototypeOf(Vega)).apply(this, arguments));\n  }\n\n  _createClass(Vega, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      this.createVis(this.props.spec);\n    }\n  }, {\n    key: 'shouldComponentUpdate',\n    value: function shouldComponentUpdate(nextProps) {\n      var a = this.props;\n      var b = nextProps;\n      return ['width', 'height', 'renderer', 'spec', 'data', 'className', 'style'].some(function (name) {\n        return a[name] !== b[name];\n      }) || !Vega.isSameViewport(a.viewport, b.viewport) || !Vega.isSamePadding(a.padding, b.padding);\n    }\n  }, {\n    key: 'componentDidUpdate',\n    value: function componentDidUpdate(prevProps) {\n      var _this2 = this;\n\n      if (!Vega.isSameSpec(this.props.spec, prevProps.spec)) {\n        this.clearListeners(this.props.spec);\n        this.createVis(this.props.spec);\n      } else if (this.vis) {\n        var props = this.props;\n        var spec = this.props.spec;\n        var changed = false;\n\n        // update view properties\n        ['width', 'height', 'renderer'].forEach(function (field) {\n          if (props[field] !== prevProps[field]) {\n            _this2.vis[field](props[field] || spec[field]);\n            changed = true;\n          }\n        });\n\n        if (!Vega.isSameViewport) {\n          this.vis.viewport(props.viewport || spec.viewport);\n          changed = true;\n        }\n        if (!Vega.isSamePadding) {\n          this.vis.padding(props.padding || spec.padding);\n          changed = true;\n        }\n\n        // update data\n        if (spec.data && props.data) {\n          this.vis.update();\n          spec.data.forEach(function (d) {\n            var oldData = prevProps.data[d.name];\n            var newData = props.data[d.name];\n            if (!Vega.isSameData(oldData, newData)) {\n              _this2.updateData(d.name, newData);\n              changed = true;\n            }\n          });\n        }\n\n        if (changed) {\n          this.vis.update(props.updateOptions);\n        }\n      }\n    }\n  }, {\n    key: 'componentWillUnmount',\n    value: function componentWillUnmount() {\n      this.clearListeners(this.props.spec);\n    }\n  }, {\n    key: 'createVis',\n    value: function createVis(spec) {\n      var _this3 = this;\n\n      if (spec) {\n        var props = this.props;\n        // Parse the vega spec and create the vis\n        _vega2.default.parse.spec(spec, function (chart) {\n          var vis = chart({ el: _this3.element });\n\n          // Attach listeners onto the signals\n          if (spec.signals) {\n            spec.signals.forEach(function (signal) {\n              vis.onSignal(signal.name, function () {\n                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n                  args[_key] = arguments[_key];\n                }\n\n                var listener = _this3.props[Vega.listenerName(signal.name)];\n                if (listener) {\n                  listener.apply(_this3, args);\n                }\n              });\n            });\n          }\n\n          // store the vis object to be used on later updates\n          _this3.vis = vis;\n\n          vis.width(props.width || spec.width).height(props.height || spec.height).padding(props.padding || spec.padding).viewport(props.viewport || spec.viewport);\n          if (props.renderer) {\n            vis.renderer(props.renderer);\n          }\n          if (spec.data && props.data) {\n            vis.update();\n            spec.data.forEach(function (d) {\n              _this3.updateData(d.name, props.data[d.name]);\n            });\n          }\n          vis.update();\n        });\n      } else {\n        this.clearListeners(this.props.spec);\n        this.vis = null;\n      }\n      return this;\n    }\n  }, {\n    key: 'updateData',\n    value: function updateData(name, value) {\n      if (value) {\n        if ((0, _util.isFunction)(value)) {\n          value(this.vis.data(name));\n        } else {\n          this.vis.data(name).remove(function () {\n            return true;\n          }).insert(value);\n        }\n      }\n    }\n\n    // Remove listeners from the signals\n\n  }, {\n    key: 'clearListeners',\n    value: function clearListeners(spec) {\n      var vis = this.vis;\n      if (vis && spec && spec.signals) {\n        spec.signals.forEach(function (signal) {\n          return vis.offSignal(signal.name);\n        });\n      }\n      return this;\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this4 = this;\n\n      return (\n        // Create the container Vega draws inside\n        _react2.default.createElement('div', {\n          ref: function ref(c) {\n            _this4.element = c;\n          },\n          className: this.props.className,\n          style: this.props.style\n        })\n      );\n    }\n  }], [{\n    key: 'isSameViewport',\n    value: function isSameViewport(a, b) {\n      if (Array.isArray(a) && Array.isArray(b)) {\n        if (a.length !== b.length) return false;\n        return a.every(function (value, index) {\n          return value === b[index];\n        });\n      }\n      return a === b;\n    }\n  }, {\n    key: 'isSamePadding',\n    value: function isSamePadding(a, b) {\n      if ((0, _util.isDefined)(a) && (0, _util.isDefined)(b)) {\n        return a.top === b.top && a.left === b.left && a.right === b.right && a.bottom === b.bottom;\n      }\n      return a === b;\n    }\n  }, {\n    key: 'isSameData',\n    value: function isSameData(a, b) {\n      return a === b && !(0, _util.isFunction)(a);\n    }\n  }, {\n    key: 'isSameSpec',\n    value: function isSameSpec(a, b) {\n      return a === b || JSON.stringify(a) === JSON.stringify(b);\n    }\n  }, {\n    key: 'listenerName',\n    value: function listenerName(signalName) {\n      return 'onSignal' + (0, _util.capitalize)(signalName);\n    }\n  }]);\n\n  return Vega;\n}(_react2.default.Component);\n\nVega.propTypes = propTypes;\n\nexports.default = Vega;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/Vega.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/Vega.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_2__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external {\"root\":\"React\",\"commonjs2\":\"react\",\"commonjs\":\"react\",\"amd\":\"react\"}\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%7B%22root%22:%22React%22,%22commonjs2%22:%22react%22,%22commonjs%22:%22react%22,%22amd%22:%22react%22%7D?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.capitalize = capitalize;\nexports.isDefined = isDefined;\nexports.isFunction = isFunction;\nfunction capitalize(str) {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}\n\nfunction isDefined(x) {\n  return x !== null && x !== undefined;\n}\n\nfunction isFunction(functionToCheck) {\n  var getType = {};\n  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/util.js\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/util.js?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_4__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external {\"root\":\"vg\",\"commonjs2\":\"vega\",\"commonjs\":\"vega\",\"amd\":\"vega\"}\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%7B%22root%22:%22vg%22,%22commonjs2%22:%22vega%22,%22commonjs%22:%22vega%22,%22amd%22:%22vega%22%7D?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nexports.default = createClassFromSpec;\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Vega = __webpack_require__(1);\n\nvar _Vega2 = _interopRequireDefault(_Vega);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// USAGE:\n// createClassFromSpec(name, spec);\n// createClassFromSpec(spec);\nfunction createClassFromSpec() {\n  var spec = arguments.length === 1 ? arguments.length <= 0 ? undefined : arguments[0] : arguments.length <= 1 ? undefined : arguments[1];\n\n  var propTypes = _extends({}, _Vega2.default.propTypes);\n  delete propTypes.spec;\n  if (spec.signals) {\n    spec.signals.forEach(function (signal) {\n      propTypes[_Vega2.default.listenerName(signal.name)] = _react.PropTypes.func;\n    });\n  }\n\n  function Chart(props) {\n    return _react2.default.createElement(_Vega2.default, _extends({ spec: spec }, props));\n  }\n\n  Chart.getSpec = function getSpec() {\n    return spec;\n  };\n\n  Chart.propTypes = propTypes;\n\n  return Chart;\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/createClassFromSpec.js\n ** module id = 5\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/createClassFromSpec.js?");

/***/ }
/******/ ])
});
;