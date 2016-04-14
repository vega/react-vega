(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("vg"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "vg"], factory);
	else if(typeof exports === 'object')
		exports["reactVega"] = factory(require("React"), require("vg"));
	else
		root["reactVega"] = factory(root["React"], root["vg"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createClassFromSpec = createClassFromSpec;\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _vega = __webpack_require__(2);\n\nvar _vega2 = _interopRequireDefault(_vega);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction capitalize(str) {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}\n\nfunction listenerName(signalName) {\n  return 'onSignal' + capitalize(signalName);\n}\n\nfunction isFunction(functionToCheck) {\n  var getType = {};\n  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';\n}\n\nfunction createClassFromSpec(name, spec) {\n  spec = isFunction(spec) ? spec() : spec;\n\n  var propTypes = {\n    width: _react.PropTypes.number,\n    height: _react.PropTypes.number,\n    padding: _react.PropTypes.object,\n    viewport: _react.PropTypes.array,\n    renderer: _react.PropTypes.string,\n    data: _react.PropTypes.any\n  };\n  if (spec.signals) {\n    spec.signals.forEach(function (signal) {\n      propTypes[listenerName(signal.name)] = _react.PropTypes.func;\n    });\n  }\n\n  return _react2.default.createClass({\n    displayName: name,\n    propTypes: propTypes,\n    getDefaultProps: function getDefaultProps() {\n      return {\n        width: spec.width,\n        height: spec.height,\n        padding: spec.padding,\n        viewport: null,\n        renderer: 'svg'\n      };\n    },\n    componentDidMount: function componentDidMount() {\n      var _this = this;\n\n      var self = this;\n\n      // Parse the vega spec and create the vis\n      _vega2.default.parse.spec(spec, function (chart) {\n        var vis = chart({ el: _this.refs.chartContainer });\n\n        // Attach listeners onto the signals\n        if (spec.signals) {\n          spec.signals.forEach(function (signal) {\n            vis.onSignal(signal.name, function () {\n              var listener = self.props[listenerName(signal.name)];\n              if (listener) {\n                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n                  args[_key] = arguments[_key];\n                }\n\n                listener.apply(self, args);\n              }\n            });\n          });\n        }\n\n        var props = self.props;\n        vis.width(props.width).height(props.height).padding(props.padding).viewport(props.viewport).renderer(props.renderer);\n        self.updateData(vis);\n        vis.update();\n\n        // store the vis object to be used on later updates\n        self.vis = vis;\n      });\n    },\n    componentDidUpdate: function componentDidUpdate() {\n      var vis = this.vis;\n      if (vis) {\n        var props = this.props;\n        vis.width(props.width).height(props.height).padding(props.padding).viewport(props.viewport).renderer(props.renderer);\n        this.updateData(vis);\n        vis.update();\n      }\n    },\n    componentWillUnmount: function componentWillUnmount() {\n      var vis = this.vis;\n      // Remove listeners from the signals\n      if (vis && spec.signals) {\n        spec.signals.forEach(function (signal) {\n          return vis.offSignal(signal.name);\n        });\n      }\n    },\n    updateData: function updateData(vis) {\n      var props = this.props;\n      if (spec.data) {\n        spec.data.forEach(function (d) {\n          vis.data(d.name).remove(function () {\n            return true;\n          });\n          if (props.data && props.data[d.name]) {\n            vis.data(d.name).insert(props.data[d.name]);\n          }\n        });\n      }\n      return vis;\n    },\n\n    // dummy render method that creates the container vega draws inside\n    render: function render() {\n      return _react2.default.createElement('div', { ref: 'chartContainer' });\n    }\n  });\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/index.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/index.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_1__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"React\"\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22React%22?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_2__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"vg\"\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22vg%22?");

/***/ }
/******/ ])
});
;