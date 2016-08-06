(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("vega"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "vega"], factory);
	else if(typeof exports === 'object')
		exports["ReactVega"] = factory(require("react"), require("vega"));
	else
		root["ReactVega"] = factory(root["React"], root["vg"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
	exports.createClassFromSpec = undefined;

	var _Vega = __webpack_require__(1);

	var _Vega2 = _interopRequireDefault(_Vega);

	var _createClassFromSpec2 = __webpack_require__(5);

	var _createClassFromSpec3 = _interopRequireDefault(_createClassFromSpec2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Vega2.default;
	var createClassFromSpec = exports.createClassFromSpec = _createClassFromSpec3.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _vega = __webpack_require__(3);

	var _vega2 = _interopRequireDefault(_vega);

	var _util = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  spec: _react.PropTypes.object,
	  isSpecFixed: _react.PropTypes.bool,
	  width: _react.PropTypes.number,
	  height: _react.PropTypes.number,
	  padding: _react.PropTypes.object,
	  viewport: _react.PropTypes.array,
	  renderer: _react.PropTypes.string,
	  data: _react.PropTypes.object
	};

	var defaultProps = {
	  isSpecFixed: false
	};

	var Vega = function (_React$Component) {
	  _inherits(Vega, _React$Component);

	  function Vega(props) {
	    _classCallCheck(this, Vega);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Vega).call(this, props));

	    _this.state = {
	      isSpecFixed: props.isSpecFixed,
	      spec: props.spec
	    };
	    return _this;
	  }

	  _createClass(Vega, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.createVis(this.state.spec);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var isSpecFixed = Boolean(nextProps.isSpecFixed);
	      var isSpecFixedChange = this.state.isSpecFixed !== isSpecFixed;
	      if (isSpecFixedChange) {
	        this.setState({ isSpecFixed: isSpecFixed });
	      }

	      if (!this.state.isSpecFixed || isSpecFixedChange) {
	        if (!Vega.isSameSpec(this.state.spec, nextProps.spec)) {
	          this.setState({ spec: nextProps.spec });
	        }
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      var _this2 = this;

	      if (this.state.spec !== prevState.spec) {
	        this.clearListeners(this.state.spec);
	        this.createVis(this.state.spec);
	      } else if (this.vis) {
	        (function () {
	          var props = _this2.props;
	          var spec = _this2.state.spec;
	          var changed = false;

	          // update view properties
	          ['width', 'height', 'padding', 'viewport', 'renderer'].forEach(function (field) {
	            if (props[field] !== prevProps[field]) {
	              _this2.vis[field](props[field] || spec[field]);
	              changed = true;
	            }
	          });

	          // update data
	          if (spec.data && props.data) {
	            _this2.vis.update();
	            spec.data.forEach(function (d) {
	              var oldData = prevProps.data[d.name];
	              var newData = props.data[d.name];
	              if (!Vega.isSameData(oldData, newData)) {
	                _this2.updateData(d.name, newData);
	              }
	            });
	          }

	          if (changed) {
	            _this2.vis.update();
	          }
	        })();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.clearListeners(this.state.spec);
	    }
	  }, {
	    key: 'createVis',
	    value: function createVis(spec) {
	      var _this3 = this;

	      if (spec) {
	        (function () {
	          var props = _this3.props;
	          // Parse the vega spec and create the vis
	          _vega2.default.parse.spec(spec, function (chart) {
	            var vis = chart({ el: _this3.element });

	            // Attach listeners onto the signals
	            if (spec.signals) {
	              spec.signals.forEach(function (signal) {
	                vis.onSignal(signal.name, function () {
	                  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                  }

	                  var listener = _this3.props[Vega.listenerName(signal.name)];
	                  if (listener) {
	                    listener.apply(_this3, args);
	                  }
	                });
	              });
	            }

	            // store the vis object to be used on later updates
	            _this3.vis = vis;

	            vis.width(props.width || spec.width).height(props.height || spec.height).padding(props.padding || spec.padding).viewport(props.viewport || spec.viewport);
	            if (props.renderer) {
	              vis.renderer(props.renderer);
	            }
	            if (spec.data && props.data) {
	              vis.update();
	              spec.data.forEach(function (d) {
	                _this3.updateData(d.name, props.data[d.name]);
	              });
	            }
	            vis.update();
	          });
	        })();
	      } else {
	        this.clearListeners(this.state.spec);
	        this.vis = null;
	      }
	      return this;
	    }
	  }, {
	    key: 'updateData',
	    value: function updateData(name, value) {
	      if (value) {
	        if ((0, _util.isFunction)(value)) {
	          value(this.vis.data(name));
	        } else {
	          this.vis.data(name).remove(function () {
	            return true;
	          }).insert(value);
	        }
	      }
	    }

	    // Remove listeners from the signals

	  }, {
	    key: 'clearListeners',
	    value: function clearListeners(spec) {
	      var vis = this.vis;
	      if (vis && spec && spec.signals) {
	        spec.signals.forEach(function (signal) {
	          return vis.offSignal(signal.name);
	        });
	      }
	      return this;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      return(
	        // Create the container Vega draws inside
	        _react2.default.createElement('div', { ref: function ref(c) {
	            return _this4.element = c;
	          }, __self: this
	        })
	      );
	    }
	  }]);

	  return Vega;
	}(_react2.default.Component);

	Vega.isSameData = function isSameData(a, b) {
	  return a === b && !(0, _util.isFunction)(a);
	};

	Vega.isSameSpec = function isSameSpec(a, b) {
	  return a === b || JSON.stringify(a) === JSON.stringify(b);
	};

	Vega.listenerName = function listenerName(signalName) {
	  return 'onSignal' + (0, _util.capitalize)(signalName);
	};

	Vega.propTypes = propTypes;
	Vega.defaultProps = defaultProps;

	exports.default = Vega;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.capitalize = capitalize;
	exports.isFunction = isFunction;
	function capitalize(str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function isFunction(functionToCheck) {
	  var getType = {};
	  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createClassFromSpec;

	var _react = __webpack_require__(2);

	var _Vega2 = __webpack_require__(1);

	var _Vega3 = _interopRequireDefault(_Vega2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function createClassFromSpec(name, spec) {
	  var propTypes = {
	    width: _react.PropTypes.number,
	    height: _react.PropTypes.number,
	    padding: _react.PropTypes.object,
	    viewport: _react.PropTypes.array,
	    renderer: _react.PropTypes.string,
	    data: _react.PropTypes.object
	  };
	  if (spec.signals) {
	    spec.signals.forEach(function (signal) {
	      propTypes[_Vega3.default.listenerName(signal.name)] = _react.PropTypes.func;
	    });
	  }

	  var Chart = function (_Vega) {
	    _inherits(Chart, _Vega);

	    function Chart(props) {
	      _classCallCheck(this, Chart);

	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Chart).call(this, props));

	      _this.state.spec = spec;
	      _this.state.isSpecFixed = true;
	      return _this;
	    }

	    return Chart;
	  }(_Vega3.default);

	  Chart.getSpec = function getSpec() {
	    return spec;
	  };

	  Chart.propTypes = propTypes;

	  return Chart;
	}

/***/ }
/******/ ])
});
;