(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("vega"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "vega"], factory);
	else if(typeof exports === 'object')
		exports["reactVega"] = factory(require("react"), require("vega"));
	else
		root["reactVega"] = factory(root["react"], root["vega"]);
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createClassFromSpec = createClassFromSpec;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _vega = __webpack_require__(2);

	var _vega2 = _interopRequireDefault(_vega);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function capitalize(str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function listenerName(signalName) {
	  return 'onSignal' + capitalize(signalName);
	}

	function isFunction(functionToCheck) {
	  var getType = {};
	  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	function createClassFromSpec(name, spec) {
	  spec = isFunction(spec) ? spec() : spec;

	  var propTypes = {
	    width: _react.PropTypes.number,
	    height: _react.PropTypes.number,
	    padding: _react.PropTypes.object,
	    viewport: _react.PropTypes.array,
	    renderer: _react.PropTypes.string,
	    data: _react.PropTypes.any
	  };
	  if (spec.signals) {
	    spec.signals.forEach(function (signal) {
	      propTypes[listenerName(signal.name)] = _react.PropTypes.func;
	    });
	  }

	  return _react2.default.createClass({
	    displayName: name,
	    propTypes: propTypes,
	    getDefaultProps: function getDefaultProps() {
	      return {
	        width: spec.width,
	        height: spec.height,
	        padding: spec.padding,
	        viewport: null,
	        renderer: 'svg'
	      };
	    },
	    componentDidMount: function componentDidMount() {
	      var _this = this;

	      var self = this;

	      // Parse the vega spec and create the vis
	      _vega2.default.parse.spec(spec, function (chart) {
	        var vis = chart({ el: _this.refs.chartContainer });

	        // Attach listeners onto the signals
	        if (spec.signals) {
	          spec.signals.forEach(function (signal) {
	            vis.onSignal(signal.name, function () {
	              var listener = self.props[listenerName(signal.name)];
	              if (listener) {
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                  args[_key] = arguments[_key];
	                }

	                listener.apply(self, args);
	              }
	            });
	          });
	        }

	        var props = self.props;
	        vis.width(props.width).height(props.height).padding(props.padding).viewport(props.viewport).renderer(props.renderer);
	        self.updateData(vis);
	        vis.update();

	        // store the vis object to be used on later updates
	        self.vis = vis;
	      });
	    },
	    componentDidUpdate: function componentDidUpdate() {
	      var vis = this.vis;
	      if (vis) {
	        var props = this.props;
	        vis.width(props.width).height(props.height).padding(props.padding).viewport(props.viewport).renderer(props.renderer);
	        this.updateData(vis);
	        vis.update();
	      }
	    },
	    componentWillUnmount: function componentWillUnmount() {
	      var vis = this.vis;
	      // Remove listeners from the signals
	      if (vis && spec.signals) {
	        spec.signals.forEach(function (signal) {
	          return vis.offSignal(signal.name);
	        });
	      }
	    },
	    updateData: function updateData(vis) {
	      var props = this.props;
	      if (spec.data) {
	        spec.data.forEach(function (d) {
	          vis.data(d.name).remove(function () {
	            return true;
	          });
	          if (props.data && props.data[d.name]) {
	            vis.data(d.name).insert(props.data[d.name]);
	          }
	        });
	      }
	      return vis;
	    },

	    // dummy render method that creates the container vega draws inside
	    render: function render() {
	      return _react2.default.createElement('div', { ref: 'chartContainer' });
	    }
	  });
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;