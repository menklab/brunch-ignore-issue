(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("bslf/theme/components/calloutBox/CalloutBox.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _HeroImage = require('../heroImage/HeroImage');

var _HeroImage2 = _interopRequireDefault(_HeroImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalloutBox = function (_React$Component) {
    (0, _inherits3.default)(CalloutBox, _React$Component);

    function CalloutBox(props) {
        (0, _classCallCheck3.default)(this, CalloutBox);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CalloutBox.__proto__ || Object.getPrototypeOf(CalloutBox)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(CalloutBox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'callout-box ' + this.props.className },
                this.props.children
            );
        }
    }]);
    return CalloutBox;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(CalloutBox);

});

require.register("bslf/theme/components/contactForm/ContactForm.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeroImage = function (_React$Component) {
    (0, _inherits3.default)(HeroImage, _React$Component);

    function HeroImage(props) {
        (0, _classCallCheck3.default)(this, HeroImage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HeroImage.__proto__ || Object.getPrototypeOf(HeroImage)).call(this, props));

        _this.state = {};

        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(HeroImage, [{
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            var target = event.target;
            var value = target.type === 'checkbox' ? target.checked : target.value;
            var name = target.name;

            var partialState = {};
            partialState[name] = value;
            this.setState(partialState);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();
            console.log("Name: " + this.state.name + ", Email: " + this.state.email);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'contact-form-wrapper ' + this.props.className },
                _react2.default.createElement(
                    'form',
                    { className: 'form', onSubmit: this.handleSubmit, noValidate: true },
                    _react2.default.createElement(
                        'label',
                        { className: 'label label-default' },
                        'Your Name'
                    ),
                    _react2.default.createElement('input', { className: 'input input-default', name: 'name', type: 'text', required: true, onChange: this.handleInputChange }),
                    _react2.default.createElement(
                        'label',
                        { className: 'label label-default' },
                        'Email'
                    ),
                    _react2.default.createElement('input', { className: 'input input-default', name: 'email', type: 'email', required: true, onChange: this.handleInputChange }),
                    _react2.default.createElement('input', { className: 'input btn btn-primary', type: 'submit', value: 'Send request' })
                )
            );
        }
    }]);
    return HeroImage;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(HeroImage);

});

require.register("bslf/theme/components/divider/Divider.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _HeroImage = require('../heroImage/HeroImage');

var _HeroImage2 = _interopRequireDefault(_HeroImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Divider = function (_React$Component) {
    (0, _inherits3.default)(Divider, _React$Component);

    function Divider(props) {
        (0, _classCallCheck3.default)(this, Divider);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Divider.__proto__ || Object.getPrototypeOf(Divider)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(Divider, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'wrapper-divider' },
                _react2.default.createElement('div', { className: 'divider-line-break divider-line-break-left' }),
                _react2.default.createElement(
                    'div',
                    { className: 'divider-circle-wrapper' },
                    _react2.default.createElement('div', { className: 'divider-circle-overlay' })
                ),
                _react2.default.createElement('div', { className: 'divider-line-break divider-line-break-right' })
            );
        }
    }]);
    return Divider;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(Divider);

});

require.register("bslf/theme/components/heroImage/HeroImage.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeroImage = function (_React$Component) {
    (0, _inherits3.default)(HeroImage, _React$Component);

    function HeroImage(props) {
        (0, _classCallCheck3.default)(this, HeroImage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HeroImage.__proto__ || Object.getPrototypeOf(HeroImage)).call(this, props));

        _this.state = {
            wrapperStyle: {
                backgroundImage: 'url("' + _this.props.backgroundImage + '")',
                backgroundSize: _this.props.backgroundSize,
                backgroundPosition: _this.props.backgroundPosition,
                backgroundColor: _this.props.backgroundColor,
                backgroundRepeat: _this.props.backgroundRepeat,
                height: _this.props.height,
                width: '100%'
            }
        };
        return _this;
    }

    (0, _createClass3.default)(HeroImage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid-no-padding' },
                _react2.default.createElement(
                    'div',
                    { className: 'hero-image-wrapper ' + this.props.className, style: this.state.wrapperStyle },
                    this.props.children
                )
            );
        }
    }]);
    return HeroImage;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(HeroImage);

});

require.register("bslf/theme/components/threeBoxCallout/ThreeBoxCallout.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _HeroImage = require('../heroImage/HeroImage');

var _HeroImage2 = _interopRequireDefault(_HeroImage);

var _CalloutBox = require('../calloutBox/CalloutBox');

var _CalloutBox2 = _interopRequireDefault(_CalloutBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThreeBoxCallout = function (_React$Component) {
    (0, _inherits3.default)(ThreeBoxCallout, _React$Component);

    function ThreeBoxCallout(props) {
        (0, _classCallCheck3.default)(this, ThreeBoxCallout);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ThreeBoxCallout.__proto__ || Object.getPrototypeOf(ThreeBoxCallout)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(ThreeBoxCallout, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            var height = this.props.height;
            if (height == "") {
                height = "329px";
            }
            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                _react2.default.createElement(
                    _HeroImage2.default,
                    { height: height, backgroundImage: '/themes/bslf/img/home/hero-pattern-bg.png',
                        backgroundColor: '#2CAFC1', backgroundSize: 'auto 329px', backgroundRepeat: 'repeat-x' },
                    _react2.default.createElement(
                        'div',
                        { className: 'three-box-callout-box-wrapper container' },
                        this.props.children
                    )
                )
            );
        }
    }]);
    return ThreeBoxCallout;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(ThreeBoxCallout);

});

require.register("bslf/theme/config/actions/page.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestPage = requestPage;
exports.receivePage = receivePage;
var REQUEST_PAGE = exports.REQUEST_PAGE = 'REQUEST_PAGE';
var RECEIVE_PAGE = exports.RECEIVE_PAGE = 'RECEIVE_PAGE';

function requestPage(uri) {
    return {
        type: REQUEST_PAGE,
        uri: uri
    };
}

function receivePage(uri, pageData) {
    return {
        type: RECEIVE_PAGE,
        uri: uri,
        content: pageData,
        receivedAt: Date.now()
    };
}

});

;require.register("bslf/theme/config/init.js", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _routes = require('./router/routes');

var _routes2 = _interopRequireDefault(_routes);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _sagas = require('./sagas');

var _sagas2 = _interopRequireDefault(_sagas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("init theme");

// const store = configureStore(window.__INITIAL_STATE__);
// store.runSaga(rootSaga, store.dispatch);

// const history = syncHistoryWithStore(browserHistory, store);

//
// // regular render
// export function run() {
//     render(
//         <Provider store={store}>
//             <Router history={history} routes={routes}/>
//         </Provider>,
//         document.getElementById('app')
//     );
// }

// export function getStore() {
//     return store;
// }

});

;require.register("bslf/theme/config/reducers.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _page = require('./actions/page');

var _reactRouterRedux = require('react-router-redux');

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import home from '../containers/home/home.reducers'

function pageByUri() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var uri = action.uri;
    switch (action.type) {
        case _page.REQUEST_PAGE:
            return (0, _extends5.default)({}, state, (0, _defineProperty3.default)({}, uri, (0, _extends5.default)({}, state[uri], {
                uri: action.uri,
                isFetching: true
            })));

        case _page.RECEIVE_PAGE:
            var content = action.content;
            return (0, _extends5.default)({}, state, (0, _defineProperty3.default)({}, uri, (0, _extends5.default)({}, state[uri], {
                isFetching: false,
                content: content,
                uri: action.uri,
                lastUpdated: action.receivedAt
            })));
        default:
            return state;
    }
}

var rootReducer = (0, _redux.combineReducers)({
    // home: home,
    page: pageByUri,
    routing: _reactRouterRedux.routerReducer
});

exports.default = rootReducer;

});

require.register("bslf/theme/config/router/routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _default_tmpl = require('../../templates/default_tmpl');

var _default_tmpl2 = _interopRequireDefault(_default_tmpl);

var _homePage = require('../../containers/homePage/homePage.routes');

var _homePage2 = _interopRequireDefault(_homePage);

var _classroomPage = require('../../containers/classroomPage/classroomPage.routes');

var _classroomPage2 = _interopRequireDefault(_classroomPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
    _reactRouter.Route,
    { component: _default_tmpl2.default },
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '/' },
        _homePage2.default,
        ' /* default route */'
    ),
    _classroomPage2.default,
    _react2.default.createElement(_reactRouter.Redirect, { from: '*', to: '/' })
);

});

require.register("bslf/theme/config/sagas.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.fetchPageApi = fetchPageApi;
exports.fetchPageData = fetchPageData;
exports.watchRequestPage = watchRequestPage;
exports.default = rootSaga;

var _effects = require('redux-saga/effects');

var _page = require('./actions/page');

var actions = _interopRequireWildcard(_page);

var _api = require('../services/api');

var _reactRouter = require('react-router');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [fetchPageApi, fetchPageData, watchRequestPage, rootSaga].map(_regenerator2.default.mark);

// import homeContainer from '../containers/home/home.sagas'


// fetch page content data based on uri from api
function fetchPageApi(uri) {
    var cleanUri, _ref, res, err;

    return _regenerator2.default.wrap(function fetchPageApi$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    cleanUri = uri;

                    if (uri == "/") {
                        cleanUri = "";
                    }
                    _context.next = 4;
                    return (0, _effects.call)(_api.Get, 'http://localhost:9090/themes/bslf/pages' + cleanUri + '/data.json');

                case 4:
                    _ref = _context.sent;
                    res = _ref.res;
                    err = _ref.err;

                    if (!res) {
                        _context.next = 11;
                        break;
                    }

                    return _context.abrupt('return', res);

                case 11:
                    console.log("error getting page data.");
                    _reactRouter.browserHistory.push("/");

                case 13:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}

// fetch page data based on uri
function fetchPageData(action) {
    var pageData;
    return _regenerator2.default.wrap(function fetchPageData$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return (0, _effects.call)(fetchPageApi, action.uri);

                case 2:
                    pageData = _context2.sent;
                    _context2.next = 5;
                    return (0, _effects.put)(actions.receivePage(action.uri, pageData));

                case 5:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[1], this);
}

// watch for page requests
function watchRequestPage() {
    return _regenerator2.default.wrap(function watchRequestPage$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return (0, _effects.takeEvery)(actions.REQUEST_PAGE, fetchPageData);

                case 2:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked[2], this);
}

/**
 * rootSaga
 */
function rootSaga() {
    return _regenerator2.default.wrap(function rootSaga$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    _context4.next = 2;
                    return [(0, _effects.fork)(watchRequestPage)];

                case 2:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _marked[3], this);
}

});

;require.register("bslf/theme/config/store/configureStore.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _reduxLogger = require('redux-logger');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(initialState) {

    var sagaMiddleware = (0, _reduxSaga2.default)();
    var logger = (0, _reduxLogger.createLogger)({
        collapsed: true
    });

    var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

    var store = (0, _redux.createStore)(_reducers2.default, initialState, composeEnhancers((0, _redux.applyMiddleware)(sagaMiddleware, logger)));

    // detect if we're loading for the first time or reloading
    if (module.hot) {
        module.hot.accept('./reducers', function (d) {
            store.replaceReducer(require('../reducers').default);
        });
    }

    store.runSaga = sagaMiddleware.run;
    store.close = function () {
        return store.dispatch(_reduxSaga.END);
    };

    return store;
}

});

;require.register("bslf/theme/containers/classroomPage/classroomPage.container.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _page = require('../../config/actions/page');

var _reactRedux = require('react-redux');

var _HeroImage = require('../../components/heroImage/HeroImage');

var _HeroImage2 = _interopRequireDefault(_HeroImage);

var _ClassroomDetails = require('./components/classroomDetails/ClassroomDetails');

var _ClassroomDetails2 = _interopRequireDefault(_ClassroomDetails);

var _ClassroomGallery = require('./components/classroomGallery/ClassroomGallery');

var _ClassroomGallery2 = _interopRequireDefault(_ClassroomGallery);

var _CalloutBox = require('../../components/calloutBox/CalloutBox');

var _CalloutBox2 = _interopRequireDefault(_CalloutBox);

var _Divider = require('../../components/divider/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _ContactForm = require('../../components/contactForm/ContactForm');

var _ContactForm2 = _interopRequireDefault(_ContactForm);

var _ThreeBoxCallout = require('../../components/threeBoxCallout/ThreeBoxCallout');

var _ThreeBoxCallout2 = _interopRequireDefault(_ThreeBoxCallout);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassRoomPage = function (_React$Component) {
    (0, _inherits3.default)(ClassRoomPage, _React$Component);

    function ClassRoomPage(props) {
        (0, _classCallCheck3.default)(this, ClassRoomPage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ClassRoomPage.__proto__ || Object.getPrototypeOf(ClassRoomPage)).call(this, props));

        _this.state = {};

        return _this;
    }

    (0, _createClass3.default)(ClassRoomPage, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.props.requestPage(this.props.path);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.path != this.props.path) {
                this.props.requestPage(nextProps.path);
            }

            if (this.props.content != nextProps.content) {
                this.setState = {
                    newContent: nextProps.content
                };
            }
        }
    }, {
        key: 'render',
        value: function render() {

            var html = getHtmlFromData(this.props.content);

            return html;
        }
    }]);
    return ClassRoomPage;
}(_react2.default.Component);

function getHtmlFromData(c) {
    if (!c) {
        return null;
    }
    var mainContentList = [];
    for (var i = 0; i < c.classroomDetails.mainContent.list.length; i++) {
        mainContentList.push(_react2.default.createElement(
            'li',
            { key: i },
            c.classroomDetails.mainContent.list[i]
        ));
    }

    var html = _react2.default.createElement(
        'div',
        { className: 'content-page-transition' },
        _react2.default.createElement(_HeroImage2.default, { className: 'hero-wrapper-classes', height: c.topHero.backgroundImage.height,
            backgroundImage: c.topHero.backgroundImage.src }),
        _react2.default.createElement(
            _ClassroomDetails2.default,
            null,
            _react2.default.createElement(
                'div',
                { className: 'container container-no-padding' },
                _react2.default.createElement(
                    'div',
                    { className: 'classroom-details-left-col' },
                    _react2.default.createElement(
                        'div',
                        { className: 'callout-box-wrapper' },
                        _react2.default.createElement(
                            _CalloutBox2.default,
                            { className: 'callout-box-classroom-cta' },
                            _react2.default.createElement(
                                'div',
                                { className: 'callout-box-classroom-icon-wrapper' },
                                _react2.default.createElement('div', { className: 'callout-box-classroom-icon',
                                    style: { "backgroundImage": 'url(' + c.classroomDetails.calloutBox.icon.src + ')' } })
                            ),
                            _react2.default.createElement(
                                'h1',
                                null,
                                c.classroomDetails.calloutBox.title
                            ),
                            _react2.default.createElement(
                                'h2',
                                null,
                                c.classroomDetails.calloutBox.subTitle
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                c.classroomDetails.calloutBox.content
                            ),
                            _react2.default.createElement(_Divider2.default, null),
                            _react2.default.createElement(_ContactForm2.default, { className: 'contact-form-wrapper-classroom-cta' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'classroom-details-right-col' },
                    _react2.default.createElement(
                        'div',
                        { className: 'wrapper-classroom-details' },
                        _react2.default.createElement(
                            'h1',
                            null,
                            c.classroomDetails.mainContent.title
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            c.classroomDetails.mainContent.content
                        ),
                        _react2.default.createElement(
                            'ul',
                            null,
                            mainContentList
                        )
                    )
                ),
                _react2.default.createElement('div', { className: 'clearfix' })
            ),
            _react2.default.createElement(
                'div',
                { className: 'container container-no-padding' },
                _react2.default.createElement(
                    'div',
                    { className: 'teacher-bio-classroom-wrapper' },
                    _react2.default.createElement(
                        'h1',
                        null,
                        c.threeBoxCallout.title
                    ),
                    _react2.default.createElement(
                        _ThreeBoxCallout2.default,
                        { className: 'three-box-callout-classroom', height: '326px' },
                        _react2.default.createElement(
                            _CalloutBox2.default,
                            {
                                className: 'three-box-callout-box three-box-callout-box-classroom three-box-callout-box-left' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                c.threeBoxCallout.box1.title
                            ),
                            _react2.default.createElement('img', { src: c.threeBoxCallout.box1.image.src, alt: c.threeBoxCallout.box1.image.alt }),
                            _react2.default.createElement(
                                'p',
                                null,
                                c.threeBoxCallout.box1.text
                            )
                        ),
                        _react2.default.createElement(
                            _CalloutBox2.default,
                            {
                                className: 'three-box-callout-box three-box-callout-box-classroom three-box-callout-box-center' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                c.threeBoxCallout.box2.title
                            ),
                            _react2.default.createElement('img', { src: c.threeBoxCallout.box2.image.src, alt: c.threeBoxCallout.box2.image.alt }),
                            _react2.default.createElement(
                                'p',
                                null,
                                c.threeBoxCallout.box2.text
                            )
                        ),
                        _react2.default.createElement(
                            _CalloutBox2.default,
                            {
                                className: 'three-box-callout-box three-box-callout-box-classroom three-box-callout-box-right' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                c.threeBoxCallout.box3.title
                            ),
                            _react2.default.createElement('img', { src: c.threeBoxCallout.box3.image.src, alt: c.threeBoxCallout.box3.image.alt }),
                            _react2.default.createElement(
                                'p',
                                null,
                                c.threeBoxCallout.box3.text
                            )
                        )
                    )
                )
            )
        ),
        _react2.default.createElement(
            _ClassroomGallery2.default,
            { images: c.gallery.images },
            _react2.default.createElement(
                'div',
                { className: 'container container-no-padding' },
                _react2.default.createElement(
                    'h1',
                    null,
                    c.gallery.title
                )
            )
        )
    );

    return html;
}

function mapStateToProps(state, ownProps) {
    var content = null;
    var path = ownProps.location.pathname;
    var page = state.page[path];
    if (!!page && !!page.content) {
        content = page.content;
    }
    return {
        content: content,
        path: path
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {
    requestPage: _page.requestPage
})(ClassRoomPage);

});

require.register("bslf/theme/containers/classroomPage/classroomPage.routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classroomPage = require('./classroomPage.container');

var _classroomPage2 = _interopRequireDefault(_classroomPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
    _reactRouter.Route,
    { path: '/classes' },
    _react2.default.createElement(_reactRouter.Route, { path: ':room', component: _classroomPage2.default })
);

});

require.register("bslf/theme/containers/classroomPage/components/classroomDetails/ClassroomDetails.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassroomDetails = function (_React$Component) {
    (0, _inherits3.default)(ClassroomDetails, _React$Component);

    function ClassroomDetails(props) {
        (0, _classCallCheck3.default)(this, ClassroomDetails);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ClassroomDetails.__proto__ || Object.getPrototypeOf(ClassroomDetails)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(ClassroomDetails, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'classroom-details-wrapper' },
                this.props.children
            );
        }
    }]);
    return ClassroomDetails;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(ClassroomDetails);

});

require.register("bslf/theme/containers/classroomPage/components/classroomGallery/ClassroomGallery.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactImageGallery = require('react-image-gallery');

var _reactImageGallery2 = _interopRequireDefault(_reactImageGallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassroomGallery = function (_React$Component) {
    (0, _inherits3.default)(ClassroomGallery, _React$Component);

    function ClassroomGallery(props) {
        (0, _classCallCheck3.default)(this, ClassroomGallery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ClassroomGallery.__proto__ || Object.getPrototypeOf(ClassroomGallery)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(ClassroomGallery, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {

            for (var i = 0; i < this.props.images.length; i++) {
                this.props.images[i].originalClass = "classroom-gallery-primary-image";
                this.props.images[i].thumbnailClass = "classroom-gallery-thumb-image";
            }

            return _react2.default.createElement(
                'div',
                { className: 'classroom-gallery-wrapper' },
                this.props.children,
                _react2.default.createElement(
                    'div',
                    { className: 'container container-no-padding' },
                    _react2.default.createElement(
                        'div',
                        { className: 'classroom-image-gallery-wrapper' },
                        _react2.default.createElement(_reactImageGallery2.default, {
                            items: this.props.images,
                            showNav: false,
                            showPlayButton: false

                        })
                    )
                )
            );
        }
    }]);
    return ClassroomGallery;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(ClassroomGallery);

});

require.register("bslf/theme/containers/devTools/DevTools.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxDevtools = require('redux-devtools');

var _reduxDevtoolsLogMonitor = require('redux-devtools-log-monitor');

var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);

var _reduxDevtoolsDockMonitor = require('redux-devtools-dock-monitor');

var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// DOCS: https://github.com/gaearon/redux-devtools

// createDevTools takes a monitor and produces a DevTools component
var DevTools = (0, _reduxDevtools.createDevTools)(_react2.default.createElement(
    _reduxDevtoolsDockMonitor2.default,
    { toggleVisibilityKey: 'ctrl-h',
        changePositionKey: 'ctrl-q',
        defaultPosition: 'left' },
    _react2.default.createElement(_reduxDevtoolsLogMonitor2.default, { theme: 'tomorrow' })
));

exports.default = DevTools;

});

require.register("bslf/theme/containers/footer/components/copyrightBar/CopyrightBar.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Copyright = function (_React$Component) {
    (0, _inherits3.default)(Copyright, _React$Component);

    function Copyright(props) {
        (0, _classCallCheck3.default)(this, Copyright);
        return (0, _possibleConstructorReturn3.default)(this, (Copyright.__proto__ || Object.getPrototypeOf(Copyright)).call(this, props));
    }

    (0, _createClass3.default)(Copyright, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid container-fluid-no-padding' },
                _react2.default.createElement(
                    'div',
                    { className: 'footer-copyright-bar-wrapper' },
                    _react2.default.createElement(
                        'p',
                        { className: 'footer-copyright-text' },
                        'Copyright \xA9 2017 Big Feet Little Steps Inc. All Rights Reserved '
                    )
                )
            );
        }
    }]);
    return Copyright;
}(_react2.default.Component);

exports.default = Copyright;

});

require.register("bslf/theme/containers/footer/components/footerContent/FooterContent.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FooterContent = function (_React$Component) {
    (0, _inherits3.default)(FooterContent, _React$Component);

    function FooterContent(props) {
        (0, _classCallCheck3.default)(this, FooterContent);
        return (0, _possibleConstructorReturn3.default)(this, (FooterContent.__proto__ || Object.getPrototypeOf(FooterContent)).call(this, props));
    }

    (0, _createClass3.default)(FooterContent, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid container-fluid-no-padding' },
                _react2.default.createElement(
                    'div',
                    { className: 'footer-content-wrapper container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'footer-col footer-col-left' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'About Us'
                        ),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'h3',
                            { className: 'footer-h3-top-margin-helper' },
                            'Videos'
                        ),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'h3',
                            { className: 'footer-h3-top-margin-helper' },
                            'Parent Resources'
                        ),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'h5',
                            null,
                            'Home Resources'
                        ),
                        _react2.default.createElement(
                            'h5',
                            { className: 'footer-h5-top-margin-helper' },
                            'Sign In'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'footer-ss-wrapper' },
                            _react2.default.createElement(
                                'a',
                                { className: 'footer-ss-facebook', href: '#' },
                                _react2.default.createElement('i', { className: 'icon-facebook' })
                            ),
                            _react2.default.createElement(
                                'a',
                                { className: 'footer-ss-twitter', href: '#' },
                                _react2.default.createElement('i', { className: 'icon-twitter' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer-col footer-col-center' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Programs'
                        ),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-md-6 col-no-padding' },
                                _react2.default.createElement(
                                    'h5',
                                    null,
                                    'Lovable Lambs (6w to 9m)'
                                ),
                                _react2.default.createElement(
                                    'h5',
                                    { className: 'footer-h5-top-margin-helper' },
                                    'Gentle Giraffes (10m to 18m)'
                                ),
                                _react2.default.createElement(
                                    'h5',
                                    { className: 'footer-h5-top-margin-helper' },
                                    'Curious Critters (18m to 2yrs)'
                                ),
                                _react2.default.createElement(
                                    'h5',
                                    { className: 'footer-h5-top-margin-helper' },
                                    'Helpful Hippos (2yrs to 2.5yrs)'
                                ),
                                _react2.default.createElement(
                                    'h5',
                                    { className: 'footer-h5-top-margin-helper' },
                                    'Cheerful Chipmunks (2.5yrs to 3yrs)'
                                ),
                                _react2.default.createElement(
                                    'h5',
                                    { className: 'footer-h5-top-margin-helper' },
                                    'Trustworthy Turtles (3yrs to 3.5yrs)'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-md-6 col-no-padding' },
                                _react2.default.createElement(
                                    'h5',
                                    null,
                                    'Courageous Cubs (3.5yrs to 4yrs)'
                                ),
                                _react2.default.createElement(
                                    'h5',
                                    { className: 'footer-h5-top-margin-helper' },
                                    'Friendly Frogs (4yrs to 5yrs)'
                                ),
                                _react2.default.createElement(
                                    'h5',
                                    { className: 'footer-h5-top-margin-helper' },
                                    'Responsible Raccoons (5yrs to 6yrs)'
                                ),
                                _react2.default.createElement(
                                    'h5',
                                    { className: 'footer-h5-top-margin-helper' },
                                    'Cool Kids (6yrs to 12yrs)'
                                ),
                                _react2.default.createElement(
                                    'h5',
                                    { className: 'footer-h5-top-margin-helper' },
                                    '\xA0'
                                ),
                                _react2.default.createElement(
                                    'h5',
                                    { className: 'footer-h5-top-margin-helper' },
                                    'Tuition'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'footer-email-signup-wrapper' },
                            _react2.default.createElement(
                                'form',
                                { className: 'form' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'label label-default' },
                                    'Sign up for our email newsletter'
                                ),
                                _react2.default.createElement('input', { className: 'input input-default', type: 'email' }),
                                _react2.default.createElement('input', { className: 'input btn btn-primary footer-email-input-btn', type: 'submit', value: 'Sign Up' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer-col footer-col-right' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Contact'
                        ),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'h5',
                            null,
                            'Phone: (616) 682-8300'
                        ),
                        _react2.default.createElement(
                            'h5',
                            { className: 'footer-h5-top-margin-helper' },
                            'Email: info@bigstepslittlefeet.org'
                        ),
                        _react2.default.createElement(
                            'h5',
                            { className: 'footer-h5-top-margin-helper' },
                            'Address: 7030 Fulton St. Ada, MI 49301'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'footer-map-wrapper' },
                            _react2.default.createElement('iframe', {
                                src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.9407402596225!2d-85.4971091841021!3d42.95845320509279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x881851bc853af87b%3A0xbdf929db1d60d271!2sBig+Steps+Little+Feet!5e0!3m2!1sen!2sus!4v1490550243779',
                                width: '358',
                                height: '183',
                                frameBorder: '0',
                                style: { border: "0" },
                                allowFullScreen: true })
                        )
                    )
                )
            );
        }
    }]);
    return FooterContent;
}(_react2.default.Component);

exports.default = FooterContent;

});

require.register("bslf/theme/containers/footer/footer.container.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _FooterContent = require('./components/footerContent/FooterContent');

var _FooterContent2 = _interopRequireDefault(_FooterContent);

var _CopyrightBar = require('./components/copyrightBar/CopyrightBar');

var _CopyrightBar2 = _interopRequireDefault(_CopyrightBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function (_React$Component) {
    (0, _inherits3.default)(Footer, _React$Component);

    function Footer(props) {
        (0, _classCallCheck3.default)(this, Footer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(Footer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'wrapper-footer' },
                _react2.default.createElement(_FooterContent2.default, null),
                _react2.default.createElement(_CopyrightBar2.default, null)
            );
        }
    }]);
    return Footer;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(Footer);

});

require.register("bslf/theme/containers/header/components/logo/Logo.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = function (_React$Component) {
    (0, _inherits3.default)(Logo, _React$Component);

    function Logo(props) {
        (0, _classCallCheck3.default)(this, Logo);
        return (0, _possibleConstructorReturn3.default)(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).call(this, props));
    }

    (0, _createClass3.default)(Logo, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { className: 'logo' },
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/' },
                    _react2.default.createElement('img', { src: '/themes/bslf/img/logo-sm.jpg', width: '165', alt: 'logo' })
                )
            );
        }
    }]);
    return Logo;
}(_react2.default.Component);

exports.default = Logo;

});

require.register("bslf/theme/containers/header/components/messageBar/MessageBar.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageBar = function (_React$Component) {
    (0, _inherits3.default)(MessageBar, _React$Component);

    function MessageBar(props) {
        (0, _classCallCheck3.default)(this, MessageBar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MessageBar.__proto__ || Object.getPrototypeOf(MessageBar)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.state = {
            show: true
        };
        return _this;
    }

    (0, _createClass3.default)(MessageBar, [{
        key: 'onClick',
        value: function onClick(e) {
            e.stopPropagation();
            e.preventDefault();
            this.setState({ show: !this.state.show });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: 'render',
        value: function render() {
            var m = null;
            var style = {
                'minHeight': '35px'
            };
            if (!!this.props.message && this.state.show) {
                m = _react2.default.createElement(
                    'div',
                    { className: 'row-no-padding row-message-bar' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-10 col-xs-push-1 col-no-padding ' },
                        _react2.default.createElement('p', { className: 'message-bar-message', dangerouslySetInnerHTML: this.props.message })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-1 col-xs-push-1' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn message-bar-close-btn', onClick: this.onClick },
                            'x'
                        )
                    )
                );
            } else {
                style = null;
            }
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid container-fluid-no-padding' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-message-bar', style: style },
                    _react2.default.createElement(
                        _reactAddonsCssTransitionGroup2.default,
                        { transitionName: 'message-bar',
                            transitionAppear: true,
                            transitionAppearTimeout: 1500,
                            transitionEnter: false,
                            transitionLeave: true,
                            transitionLeaveTimeout: 300 },
                        m
                    )
                )
            );
        }
    }]);
    return MessageBar;
}(_react2.default.Component);

exports.default = MessageBar;

});

require.register("bslf/theme/containers/header/components/navigation/Navigation.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Logo = require('../logo/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _NavigationItemBasic = require('../navigationItemBasic/NavigationItemBasic');

var _NavigationItemBasic2 = _interopRequireDefault(_NavigationItemBasic);

var _NavigationItemPrograms = require('../navigationItemPrograms/NavigationItemPrograms');

var _NavigationItemPrograms2 = _interopRequireDefault(_NavigationItemPrograms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigation = function (_React$Component) {
    (0, _inherits3.default)(Navigation, _React$Component);

    function Navigation(props) {
        (0, _classCallCheck3.default)(this, Navigation);
        return (0, _possibleConstructorReturn3.default)(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));
    }

    (0, _createClass3.default)(Navigation, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { className: 'container-fluid container-fluid-no-padding' },
                _react2.default.createElement(
                    'div',
                    { className: 'row row-centered' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-md-12 col-centered col-no-padding' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container container-no-padding' },
                            _react2.default.createElement(
                                'div',
                                { className: 'wrapper-logo hidden-sm' },
                                _react2.default.createElement(_Logo2.default, null)
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wrapper-navigation' },
                                _react2.default.createElement(
                                    'nav',
                                    null,
                                    _react2.default.createElement(_NavigationItemBasic2.default, { pos: '0', title: 'About Us', uri: 'javascript:void(0)' }),
                                    _react2.default.createElement(_NavigationItemPrograms2.default, { title: 'Programs', uri: 'javascript:void(0)' }),
                                    _react2.default.createElement(_NavigationItemBasic2.default, { title: 'Videos', uri: 'javascript:void(0)' }),
                                    _react2.default.createElement(_NavigationItemBasic2.default, { title: 'Parent Resources', uri: 'javascript:void(0)' }),
                                    _react2.default.createElement(_NavigationItemBasic2.default, { title: 'Contact', uri: 'javascript:void(0)' }),
                                    _react2.default.createElement(_NavigationItemBasic2.default, { title: 'Sign In', uri: 'javascript:void(0)' })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return Navigation;
}(_react2.default.Component);

exports.default = Navigation;

});

require.register("bslf/theme/containers/header/components/navigationItemBasic/NavigationItemBasic.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavigationItemBasic = function (_React$Component) {
    (0, _inherits3.default)(NavigationItemBasic, _React$Component);

    function NavigationItemBasic(props) {
        (0, _classCallCheck3.default)(this, NavigationItemBasic);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NavigationItemBasic.__proto__ || Object.getPrototypeOf(NavigationItemBasic)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.classNameDefualt = "navigation-item";
        _this.className = _this.classNameDefualt;
        return _this;
    }

    (0, _createClass3.default)(NavigationItemBasic, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: 'onClick',
        value: function onClick(e) {
            e.stopPropagation();
            e.preventDefault();
            if (!!this.props.onClick) {
                this.props.onClick(e);
            }
        }
    }, {
        key: 'render',
        value: function render() {

            if (this.props.pos == 0) {
                this.className = this.classNameDefualt + " navigation-item-first";
            }

            return _react2.default.createElement(
                'a',
                { className: this.className, href: this.props.uri, onClick: this.onClick },
                this.props.title,
                _react2.default.createElement('i', { className: 'icon-arrow-down color-orange' })
            );
        }
    }]);
    return NavigationItemBasic;
}(_react2.default.Component);

exports.default = NavigationItemBasic;

});

require.register("bslf/theme/containers/header/components/navigationItemPrograms/NavigationItemPrograms.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavigationItemBasic = require('../navigationItemBasic/NavigationItemBasic');

var _NavigationItemBasic2 = _interopRequireDefault(_NavigationItemBasic);

var _ProgramsMenu = require('../programsMenu/ProgramsMenu');

var _ProgramsMenu2 = _interopRequireDefault(_ProgramsMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgramsNavigationItem = function (_React$Component) {
    (0, _inherits3.default)(ProgramsNavigationItem, _React$Component);

    function ProgramsNavigationItem(props) {
        (0, _classCallCheck3.default)(this, ProgramsNavigationItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ProgramsNavigationItem.__proto__ || Object.getPrototypeOf(ProgramsNavigationItem)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.handleMenuItemSelection = _this.handleMenuItemSelection.bind(_this);
        _this.state = {
            open: false,
            ignoreBecauseOfOutsideClick: false
        };
        return _this;
    }

    (0, _createClass3.default)(ProgramsNavigationItem, [{
        key: 'handleClickOutside',
        value: function handleClickOutside() {
            if (this.state.open) {
                this.setState({ open: false });
            }
        }
    }, {
        key: 'onClick',
        value: function onClick(e) {
            e.preventDefault();
            this.setState({ open: !this.state.open });
        }
    }, {
        key: 'handleMenuItemSelection',
        value: function handleMenuItemSelection() {
            this.setState({ open: !this.state.open });
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'span',
                { className: 'position-relative' },
                _react2.default.createElement(_NavigationItemBasic2.default, { title: this.props.title, uri: this.props.uri,
                    onClick: this.onClick }),
                _react2.default.createElement(_ProgramsMenu2.default, { open: this.state.open, onMenuItemSelected: this.handleMenuItemSelection })
            );
        }
    }]);
    return ProgramsNavigationItem;
}(_react2.default.Component);

exports.default = (0, _reactClickOutside2.default)(ProgramsNavigationItem);

});

require.register("bslf/theme/containers/header/components/programsMenu/ProgramsMenu.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _ProgramsMenuItem = require('../programsMenuItem/ProgramsMenuItem');

var _ProgramsMenuItem2 = _interopRequireDefault(_ProgramsMenuItem);

var _ProgramsMenuItemBasic = require('../programsMenuItemBasic/ProgramsMenuItemBasic');

var _ProgramsMenuItemBasic2 = _interopRequireDefault(_ProgramsMenuItemBasic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgramsMenu = function (_React$Component) {
    (0, _inherits3.default)(ProgramsMenu, _React$Component);

    function ProgramsMenu(props) {
        (0, _classCallCheck3.default)(this, ProgramsMenu);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ProgramsMenu.__proto__ || Object.getPrototypeOf(ProgramsMenu)).call(this, props));

        _this.state = {
            open: props.open
        };
        return _this;
    }

    (0, _createClass3.default)(ProgramsMenu, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ open: nextProps.open });
        }
    }, {
        key: 'render',
        value: function render() {
            var programsMenu = null;
            var programMenuDivide = null;

            if (this.state.open) {
                programMenuDivide = _react2.default.createElement('span', { className: 'program-navigation-item-divide' });

                programsMenu = _react2.default.createElement(
                    'div',
                    { className: 'programs-menu container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'program-menu-left-1-col' },
                        _react2.default.createElement(_ProgramsMenuItem2.default, { icon: '/themes/bslf/img/icons/lamb.jpg', title: 'Lovable Lambs',
                            uri: '/classes/lovable-lambs', details: '6w to 9m', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItem2.default, { icon: '/themes/bslf/img/icons/giraffe.jpg', title: 'Gentle Giraffes',
                            uri: '/classes/gentle-giraffes', details: '10m to 18m', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItem2.default, { icon: '/themes/bslf/img/icons/critter.jpg', title: 'Curious Critters',
                            uri: '/classes/curious-critters', details: '18m to 2yrs', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItem2.default, { icon: '/themes/bslf/img/icons/hippo.jpg', title: 'Helpful Hippos',
                            uri: '/classes/helpful-hippos', details: '2yrs to 2.5yrs', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItem2.default, { icon: '/themes/bslf/img/icons/chipmunk.jpg', title: 'Cheerful Chipmunks',
                            uri: '/classes/cheerful-chipmunks', details: '2.5yrs to 3yrs', onMenuItemSelected: this.props.onMenuItemSelected })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'program-menu-left-2-col' },
                        _react2.default.createElement(_ProgramsMenuItem2.default, { icon: '/themes/bslf/img/icons/turtle.jpg', title: 'Trustworthy Turtles',
                            uri: '/classes/trustworthy-turtles', details: '3yrs to 3.5yrs', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItem2.default, { icon: '/themes/bslf/img/icons/cub.jpg', title: 'Courageous Cubs',
                            uri: '/classes/courageous-cubs', details: '3.5yrs to 4yrs', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItem2.default, { icon: '/themes/bslf/img/icons/frog.jpg', title: 'Friendly Frogs',
                            uri: '/classes/friendly-frogs', details: '4yrs to 5yrs', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItem2.default, { icon: '/themes/bslf/img/icons/raccoon.jpg', title: 'Responsible Racoons',
                            uri: '/classes/responsible-raccoons', details: '5yrs to 6yrs', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItem2.default, { icon: '/themes/bslf/img/icons/cool.jpg', title: 'Cool Kids',
                            uri: '/classes/cool-kids', details: '6yrs to 12yrs', onMenuItemSelected: this.props.onMenuItemSelected })
                    ),
                    _react2.default.createElement('div', { className: 'program-menu-divide' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'program-menu-right-col' },
                        _react2.default.createElement(_ProgramsMenuItemBasic2.default, { title: 'Tuition', uri: 'javascript:void(0)', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItemBasic2.default, { title: 'Field Trips', uri: 'javascript:void(0)', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItemBasic2.default, { title: 'Sample Lesson Plan', uri: 'javascript:void(0)', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItemBasic2.default, { title: 'Monthly Themes', uri: 'javascript:void(0)', onMenuItemSelected: this.props.onMenuItemSelected }),
                        _react2.default.createElement(_ProgramsMenuItemBasic2.default, { title: 'Sample Daily Food Menu', uri: 'javascript:void(0)', onMenuItemSelected: this.props.onMenuItemSelected })
                    )
                );
            }

            return _react2.default.createElement(
                'div',
                { className: 'wrapper-program-menu' },
                _react2.default.createElement(
                    _reactAddonsCssTransitionGroup2.default,
                    { transitionName: 'programs-menu-divide-transition',
                        transitionEnterTimeout: 50,
                        transitionLeaveTimeout: 550 },
                    programMenuDivide
                ),
                _react2.default.createElement(
                    _reactAddonsCssTransitionGroup2.default,
                    { transitionName: 'programs-menu-transition',
                        transitionEnterTimeout: 550,
                        transitionLeaveTimeout: 500 },
                    programsMenu
                )
            );
        }
    }]);
    return ProgramsMenu;
}(_react2.default.Component);

exports.default = ProgramsMenu;

});

require.register("bslf/theme/containers/header/components/programsMenuItem/ProgramsMenuItem.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgramsMenuItem = function (_React$Component) {
    (0, _inherits3.default)(ProgramsMenuItem, _React$Component);

    function ProgramsMenuItem(props) {
        (0, _classCallCheck3.default)(this, ProgramsMenuItem);
        return (0, _possibleConstructorReturn3.default)(this, (ProgramsMenuItem.__proto__ || Object.getPrototypeOf(ProgramsMenuItem)).call(this, props));
    }

    (0, _createClass3.default)(ProgramsMenuItem, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                _reactRouter.Link,
                { to: this.props.uri, onClick: this.props.onMenuItemSelected },
                _react2.default.createElement(
                    'div',
                    { className: 'program-menu-item-wrapper hover-animate-zoom' },
                    _react2.default.createElement(
                        'div',
                        { className: 'program-menu-item-icon-wrapper' },
                        _react2.default.createElement('span', { className: 'vertical-center-helper' }),
                        _react2.default.createElement('img', { className: 'program-menu-item-icon', src: this.props.icon,
                            alt: 'Icon image for ' + this.props.title })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'program-menu-item-copy-wrapper' },
                        _react2.default.createElement(
                            'h2',
                            { className: 'program-menu-item-title' },
                            this.props.title
                        ),
                        _react2.default.createElement(
                            'h3',
                            { className: 'program-menu-item-details' },
                            this.props.details
                        )
                    )
                )
            );
        }
    }]);
    return ProgramsMenuItem;
}(_react2.default.Component);

exports.default = ProgramsMenuItem;

});

require.register("bslf/theme/containers/header/components/programsMenuItemBasic/ProgramsMenuItemBasic.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgramsMenuItemBasic = function (_React$Component) {
    (0, _inherits3.default)(ProgramsMenuItemBasic, _React$Component);

    function ProgramsMenuItemBasic(props) {
        (0, _classCallCheck3.default)(this, ProgramsMenuItemBasic);
        return (0, _possibleConstructorReturn3.default)(this, (ProgramsMenuItemBasic.__proto__ || Object.getPrototypeOf(ProgramsMenuItemBasic)).call(this, props));
    }

    (0, _createClass3.default)(ProgramsMenuItemBasic, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                _reactRouter.Link,
                { to: this.props.uri, onClick: this.props.onMenuItemSelected },
                _react2.default.createElement(
                    'h2',
                    { className: 'programs-menu-item-basic-title hover-animate-zoom' },
                    _react2.default.createElement(
                        'span',
                        { className: 'color-orange' },
                        ' ',
                        _react2.default.createElement('i', {
                            className: 'icon-arrow-right programs-menu-item-basic-title-icon-padding' })
                    ),
                    this.props.title
                )
            );
        }
    }]);
    return ProgramsMenuItemBasic;
}(_react2.default.Component);

exports.default = ProgramsMenuItemBasic;

});

require.register("bslf/theme/containers/header/header.container.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _MessageBar = require('./components/messageBar/MessageBar');

var _MessageBar2 = _interopRequireDefault(_MessageBar);

var _Navigation = require('./components/navigation/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function (_React$Component) {
    (0, _inherits3.default)(Header, _React$Component);

    function Header(props) {
        (0, _classCallCheck3.default)(this, Header);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(Header, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'wrapper-header' },
                _react2.default.createElement(_MessageBar2.default, {
                    message: { __html: "Parents Notification: December 13 is Christmas pictures&nbsp;&nbsp;&nbsp;&nbsp;  <a href=''>Details</a>" }
                }),
                _react2.default.createElement(_Navigation2.default, null)
            );
        }
    }]);
    return Header;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(Header);

});

require.register("bslf/theme/containers/homePage/components/newsEventItem/NewsEventItem.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewsEventItem = function (_React$Component) {
    (0, _inherits3.default)(NewsEventItem, _React$Component);

    function NewsEventItem(props) {
        (0, _classCallCheck3.default)(this, NewsEventItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NewsEventItem.__proto__ || Object.getPrototypeOf(NewsEventItem)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(NewsEventItem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                this.props,
                _react2.default.createElement(
                    'div',
                    { className: 'news-event-item-wrapper' },
                    this.props.children
                )
            );
        }
    }]);
    return NewsEventItem;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(NewsEventItem);

});

require.register("bslf/theme/containers/homePage/components/newsEventsCarousel/NewsEventsCarousel.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactSlick = require('react-slick');

var _reactSlick2 = _interopRequireDefault(_reactSlick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewsEventsCarousel = function (_React$Component) {
    (0, _inherits3.default)(NewsEventsCarousel, _React$Component);

    function NewsEventsCarousel(props) {
        (0, _classCallCheck3.default)(this, NewsEventsCarousel);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NewsEventsCarousel.__proto__ || Object.getPrototypeOf(NewsEventsCarousel)).call(this, props));

        _this.state = {
            settings: {
                dots: true,
                dotsClass: 'news-events-carousel-dots',
                speed: 500,
                slidesToShow: 2.3,
                slidesToScroll: 1,
                initialSlide: 0,
                focusOnSelect: true,
                infinite: false,
                arrows: false
            }
        };
        return _this;
    }

    (0, _createClass3.default)(NewsEventsCarousel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid container-fluid-no-padding' },
                _react2.default.createElement(
                    'div',
                    { className: 'news-events-carousel-wrapper' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(
                            'h1',
                            { className: 'news-events-carousel-title' },
                            'News and Events'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'news-events-carousel-slider-wrapper' },
                            _react2.default.createElement(
                                _reactSlick2.default,
                                this.state.settings,
                                this.props.children
                            )
                        ),
                        _react2.default.createElement('div', { className: 'news-events-carousel-slider-wrapper-gradient' })
                    )
                )
            );
        }
    }]);
    return NewsEventsCarousel;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(NewsEventsCarousel);

});

require.register("bslf/theme/containers/homePage/homePage.container.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HeroImage = require('../../components/heroImage/HeroImage');

var _HeroImage2 = _interopRequireDefault(_HeroImage);

var _ThreeBoxCallout = require('../../components/threeBoxCallout/ThreeBoxCallout');

var _ThreeBoxCallout2 = _interopRequireDefault(_ThreeBoxCallout);

var _ContactForm = require('../../components/contactForm/ContactForm');

var _ContactForm2 = _interopRequireDefault(_ContactForm);

var _NewsEventsCarousel = require('./components/newsEventsCarousel/NewsEventsCarousel');

var _NewsEventsCarousel2 = _interopRequireDefault(_NewsEventsCarousel);

var _NewsEventItem = require('./components/newsEventItem/NewsEventItem');

var _NewsEventItem2 = _interopRequireDefault(_NewsEventItem);

var _CalloutBox = require('../../components/calloutBox/CalloutBox');

var _CalloutBox2 = _interopRequireDefault(_CalloutBox);

var _page = require('../../config/actions/page');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomePage = function (_React$Component) {
    (0, _inherits3.default)(HomePage, _React$Component);

    function HomePage(props) {
        (0, _classCallCheck3.default)(this, HomePage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(HomePage, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.props.requestPage(this.props.path);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            var html = null;
            if (!!this.props.content) {
                var c = this.props.content;
                html = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _HeroImage2.default,
                        { height: c.topHero.backgroundImage.height,
                            backgroundImage: c.topHero.backgroundImage.src },
                        _react2.default.createElement(
                            'div',
                            { className: 'container' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'col-sm-11 col-lg-push-1' },
                                    _react2.default.createElement(
                                        'h1',
                                        { className: 'hero-title-home' },
                                        c.topHero.title
                                    ),
                                    _react2.default.createElement(
                                        'button',
                                        {
                                            className: 'btn btn-primary hero-title-home-btn' },
                                        c.topHero.button.text
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _ThreeBoxCallout2.default,
                        { className: 'three-box-callout-home' },
                        _react2.default.createElement(
                            _CalloutBox2.default,
                            { className: 'three-box-callout-box three-box-callout-box-left' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                c.threeBoxCallout.box1.title
                            ),
                            _react2.default.createElement('img', { src: c.threeBoxCallout.box1.image.src, alt: c.threeBoxCallout.box1.image.alt }),
                            _react2.default.createElement(
                                'p',
                                null,
                                c.threeBoxCallout.box1.text
                            )
                        ),
                        _react2.default.createElement(
                            _CalloutBox2.default,
                            { className: 'three-box-callout-box three-box-callout-box-center' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                c.threeBoxCallout.box2.title
                            ),
                            _react2.default.createElement('img', { src: c.threeBoxCallout.box2.image.src, alt: c.threeBoxCallout.box2.image.alt }),
                            _react2.default.createElement(
                                'p',
                                null,
                                c.threeBoxCallout.box2.text
                            )
                        ),
                        _react2.default.createElement(
                            _CalloutBox2.default,
                            { className: 'three-box-callout-box three-box-callout-box-right' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                c.threeBoxCallout.box3.title
                            ),
                            _react2.default.createElement(_ContactForm2.default, null)
                        )
                    ),
                    _react2.default.createElement(
                        _NewsEventsCarousel2.default,
                        null,
                        buildNewsAndEvents(c.newsAndEvents)
                    ),
                    _react2.default.createElement(
                        _HeroImage2.default,
                        { height: c.heroMissionStatement.backgroundImage.height,
                            backgroundImage: c.heroMissionStatement.backgroundImage.src },
                        _react2.default.createElement(
                            'div',
                            { className: 'container' },
                            _react2.default.createElement(
                                _CalloutBox2.default,
                                { className: 'callout-box-home-mission-statement' },
                                _react2.default.createElement(
                                    'h1',
                                    null,
                                    c.heroMissionStatement.title
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'text-home-mission-statement' },
                                        c.heroMissionStatement.body
                                    )
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary' },
                                    c.heroMissionStatement.button.text
                                )
                            )
                        )
                    )
                );
            }

            return html;
        }
    }]);
    return HomePage;
}(_react2.default.Component);

function buildNewsAndEvents(nae) {
    var newsAndEvents = [];
    for (var i = 0; i < nae.length; i++) {
        var body = _react2.default.createElement(
            'p',
            null,
            nae[i].body
        );
        if (nae[i].rawHtml) {
            body = _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: nae[i].body } });
        }

        newsAndEvents.push(_react2.default.createElement(
            _NewsEventItem2.default,
            { key: i },
            _react2.default.createElement(
                'h2',
                null,
                nae[i].title
            ),
            _react2.default.createElement(
                'h4',
                null,
                nae[i].date
            ),
            _react2.default.createElement('hr', null),
            body
        ));
    }
    return newsAndEvents;
}

function mapStateToProps(state) {
    var content = null;
    var path = "/";
    var page = state.page[path];
    if (!!page && !!page.content) {
        content = page.content;
    }
    return {
        content: content,
        path: path
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {
    requestPage: _page.requestPage
})(HomePage);

});

require.register("bslf/theme/containers/homePage/homePage.reducers.selectors.js", function(exports, require, module) {
// export const pageByUriSelector = state => state.pageByUri;
"use strict";

});

require.register("bslf/theme/containers/homePage/homePage.routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _homePage = require('./homePage.container');

var _homePage2 = _interopRequireDefault(_homePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(_reactRouter.IndexRoute, { component: _homePage2.default });

});

require.register("bslf/theme/initialize.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStore = getStore;
var theme = require('./config/init');

function getStore() {
    return theme.getStore();
}
// export main function for server side rendering
// export default app.renderToStringForServer(function(result) {
//     "use strict";
//     return result
// });

if (typeof window !== 'undefined') {
    // Start main application here
    theme.run();
}

});

;require.register("bslf/theme/services/api.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Post = undefined;

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.Get = Get;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default'
};

var Api = function () {
    function Api(url, options) {
        (0, _classCallCheck3.default)(this, Api);

        this.url = url;
        this.options = Object.assign(defaultOptions, options);
        this.fetch = _isomorphicFetch2.default;
    }

    (0, _createClass3.default)(Api, [{
        key: 'callApi',
        value: function callApi() {
            return this.fetch(this.url, this.options).then(function (res) {
                if (res.status == 200 || res.status == 204) {
                    return res.json();
                } else {
                    switch (res.status) {
                        default:
                            return Promise.reject(res);
                    }
                }
            }).then(function (res) {
                // success
                return { res: res };
            }, function (err) {
                // fail
                return { err: err };
            });
        }
    }]);
    return Api;
}();

exports.default = Api;

var Post = exports.Post = function (_Api) {
    (0, _inherits3.default)(Post, _Api);

    function Post(url, options) {
        (0, _classCallCheck3.default)(this, Post);

        options = Object.assign({ method: 'POST' }, options);
        return (0, _possibleConstructorReturn3.default)(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, url, options));
    }

    return Post;
}(Api);

function Get(uri) {
    var options = {
        method: 'GET'
    };
    return new Api(uri, options).callApi();
}

});

;require.register("bslf/theme/templates/default_tmpl.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _header = require('../containers/header/header.container');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../containers/footer/footer.container');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultTemplate = function (_React$Component) {
    (0, _inherits3.default)(DefaultTemplate, _React$Component);

    function DefaultTemplate(props) {
        (0, _classCallCheck3.default)(this, DefaultTemplate);
        return (0, _possibleConstructorReturn3.default)(this, (DefaultTemplate.__proto__ || Object.getPrototypeOf(DefaultTemplate)).call(this, props));
    }

    (0, _createClass3.default)(DefaultTemplate, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var loaderStyle = document.getElementById("loader-page-wrapper").style;
            var appStyle = document.getElementById("app").style;
            appStyle.overflowY = "hidden";
            // wait for entire dom to finish and then fade loading screen.
            window.onload = function () {
                setTimeout(function () {
                    loaderStyle.opacity = 0;

                    // after fade start we can fade in actual site
                    setTimeout(function () {
                        appStyle.overflowY = "";
                        setTimeout(function () {
                            appStyle.opacity = 1;
                        }, 250);
                    }, 500);
                    // once loading screen is completely gone we can remove it from dom view
                    setTimeout(function () {
                        loaderStyle.display = "none";
                    }, 750);
                }, 250);
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'hidden-xs hidden-sm' },
                    _react2.default.createElement(_header2.default, null),
                    _react2.default.createElement(
                        'div',
                        { className: 'container-fluid container-fluid-no-padding' },
                        this.props.children
                    ),
                    _react2.default.createElement(_footer2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'hidden-md hidden-lg' },
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Mobile Site Not Created.'
                    )
                )
            );
        }
    }]);
    return DefaultTemplate;
}(_react2.default.Component);

DefaultTemplate.propTypes = {
    children: _react.PropTypes.node
};

function mapStateToProps(state, ownProps) {
    return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(DefaultTemplate);

});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRoZW1lL2NvbXBvbmVudHMvY2FsbG91dEJveC9DYWxsb3V0Qm94LmpzIiwidGhlbWUvY29tcG9uZW50cy9jb250YWN0Rm9ybS9Db250YWN0Rm9ybS5qcyIsInRoZW1lL2NvbXBvbmVudHMvZGl2aWRlci9EaXZpZGVyLmpzIiwidGhlbWUvY29tcG9uZW50cy9oZXJvSW1hZ2UvSGVyb0ltYWdlLmpzIiwidGhlbWUvY29tcG9uZW50cy90aHJlZUJveENhbGxvdXQvVGhyZWVCb3hDYWxsb3V0LmpzIiwidGhlbWUvY29uZmlnL2FjdGlvbnMvcGFnZS5qcyIsInRoZW1lL2NvbmZpZy9pbml0LmpzIiwidGhlbWUvY29uZmlnL3JlZHVjZXJzLmpzIiwidGhlbWUvY29uZmlnL3JvdXRlci9yb3V0ZXMuanMiLCJ0aGVtZS9jb25maWcvc2FnYXMuanMiLCJ0aGVtZS9jb25maWcvc3RvcmUvY29uZmlndXJlU3RvcmUuanMiLCJ0aGVtZS9jb250YWluZXJzL2NsYXNzcm9vbVBhZ2UvY2xhc3Nyb29tUGFnZS5jb250YWluZXIuanMiLCJ0aGVtZS9jb250YWluZXJzL2NsYXNzcm9vbVBhZ2UvY2xhc3Nyb29tUGFnZS5yb3V0ZXMuanMiLCJ0aGVtZS9jb250YWluZXJzL2NsYXNzcm9vbVBhZ2UvY29tcG9uZW50cy9jbGFzc3Jvb21EZXRhaWxzL0NsYXNzcm9vbURldGFpbHMuanMiLCJ0aGVtZS9jb250YWluZXJzL2NsYXNzcm9vbVBhZ2UvY29tcG9uZW50cy9jbGFzc3Jvb21HYWxsZXJ5L0NsYXNzcm9vbUdhbGxlcnkuanMiLCJ0aGVtZS9jb250YWluZXJzL2RldlRvb2xzL0RldlRvb2xzLmpzIiwidGhlbWUvY29udGFpbmVycy9mb290ZXIvY29tcG9uZW50cy9jb3B5cmlnaHRCYXIvQ29weXJpZ2h0QmFyLmpzIiwidGhlbWUvY29udGFpbmVycy9mb290ZXIvY29tcG9uZW50cy9mb290ZXJDb250ZW50L0Zvb3RlckNvbnRlbnQuanMiLCJ0aGVtZS9jb250YWluZXJzL2Zvb3Rlci9mb290ZXIuY29udGFpbmVyLmpzIiwidGhlbWUvY29udGFpbmVycy9oZWFkZXIvY29tcG9uZW50cy9sb2dvL0xvZ28uanMiLCJ0aGVtZS9jb250YWluZXJzL2hlYWRlci9jb21wb25lbnRzL21lc3NhZ2VCYXIvTWVzc2FnZUJhci5qcyIsInRoZW1lL2NvbnRhaW5lcnMvaGVhZGVyL2NvbXBvbmVudHMvbmF2aWdhdGlvbi9OYXZpZ2F0aW9uLmpzIiwidGhlbWUvY29udGFpbmVycy9oZWFkZXIvY29tcG9uZW50cy9uYXZpZ2F0aW9uSXRlbUJhc2ljL05hdmlnYXRpb25JdGVtQmFzaWMuanMiLCJ0aGVtZS9jb250YWluZXJzL2hlYWRlci9jb21wb25lbnRzL25hdmlnYXRpb25JdGVtUHJvZ3JhbXMvTmF2aWdhdGlvbkl0ZW1Qcm9ncmFtcy5qcyIsInRoZW1lL2NvbnRhaW5lcnMvaGVhZGVyL2NvbXBvbmVudHMvcHJvZ3JhbXNNZW51L1Byb2dyYW1zTWVudS5qcyIsInRoZW1lL2NvbnRhaW5lcnMvaGVhZGVyL2NvbXBvbmVudHMvcHJvZ3JhbXNNZW51SXRlbS9Qcm9ncmFtc01lbnVJdGVtLmpzIiwidGhlbWUvY29udGFpbmVycy9oZWFkZXIvY29tcG9uZW50cy9wcm9ncmFtc01lbnVJdGVtQmFzaWMvUHJvZ3JhbXNNZW51SXRlbUJhc2ljLmpzIiwidGhlbWUvY29udGFpbmVycy9oZWFkZXIvaGVhZGVyLmNvbnRhaW5lci5qcyIsInRoZW1lL2NvbnRhaW5lcnMvaG9tZVBhZ2UvY29tcG9uZW50cy9uZXdzRXZlbnRJdGVtL05ld3NFdmVudEl0ZW0uanMiLCJ0aGVtZS9jb250YWluZXJzL2hvbWVQYWdlL2NvbXBvbmVudHMvbmV3c0V2ZW50c0Nhcm91c2VsL05ld3NFdmVudHNDYXJvdXNlbC5qcyIsInRoZW1lL2NvbnRhaW5lcnMvaG9tZVBhZ2UvaG9tZVBhZ2UuY29udGFpbmVyLmpzIiwidGhlbWUvY29udGFpbmVycy9ob21lUGFnZS9ob21lUGFnZS5yZWR1Y2Vycy5zZWxlY3RvcnMuanMiLCJ0aGVtZS9jb250YWluZXJzL2hvbWVQYWdlL2hvbWVQYWdlLnJvdXRlcy5qcyIsInRoZW1lL2luaXRpYWxpemUuanMiLCJ0aGVtZS9zZXJ2aWNlcy9hcGkuanMiLCJ0aGVtZS90ZW1wbGF0ZXMvZGVmYXVsdF90bXBsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQW5FQTtBQUFBO0FDQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQW5HQTtBQUFBO0FDQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBekVBO0FBQUE7QUNBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBakZBO0FBQUE7QUNBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBcEZBO0FBQUE7QUNBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF6QkE7QUFBQTtDQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpEQTtBQUFBO0NDQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF4REE7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdENBO0FBQUE7QUNBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBcElBO0FBQUE7Q0NBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5Q0E7QUFBQTtDQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFuU0E7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdkJBO0FBQUE7QUNBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFuRUE7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF2RkE7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWxDQTtBQUFBO0FDQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFqRUE7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTNPQTtBQUFBO0FDQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXhFQTtBQUFBO0FDQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXpEQTtBQUFBO0FDQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5R0E7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE3RkE7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5RUE7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBNUZBO0FBQUE7QUNBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF4SUE7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBN0VBO0FBQUE7QUNBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoRUE7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBMUVBO0FBQUE7QUNBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXZFQTtBQUFBO0FDQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFyR0E7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBM1BBO0FBQUE7QUNBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUNBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFuQkE7QUFBQTtBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFyQkE7QUFBQTtDQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlGQTtBQUFBO0NDQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEhBO0FBQUEiLCJmaWxlIjoiLi4vdGhlbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcycpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybicpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cycpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdFJlZHV4ID0gcmVxdWlyZSgncmVhY3QtcmVkdXgnKTtcblxudmFyIF9IZXJvSW1hZ2UgPSByZXF1aXJlKCcuLi9oZXJvSW1hZ2UvSGVyb0ltYWdlJyk7XG5cbnZhciBfSGVyb0ltYWdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0hlcm9JbWFnZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBDYWxsb3V0Qm94ID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShDYWxsb3V0Qm94LCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIENhbGxvdXRCb3gocHJvcHMpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ2FsbG91dEJveCk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQ2FsbG91dEJveC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENhbGxvdXRCb3gpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKENhbGxvdXRCb3gsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge31cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjYWxsb3V0LWJveCAnICsgdGhpcy5wcm9wcy5jbGFzc05hbWUgfSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBDYWxsb3V0Qm94O1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gICAgcmV0dXJuIHt9O1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSAoMCwgX3JlYWN0UmVkdXguY29ubmVjdCkobWFwU3RhdGVUb1Byb3BzLCB7fSkoQ2FsbG91dEJveCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcycpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybicpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cycpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdFJlZHV4ID0gcmVxdWlyZSgncmVhY3QtcmVkdXgnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEhlcm9JbWFnZSA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoSGVyb0ltYWdlLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIEhlcm9JbWFnZShwcm9wcykge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBIZXJvSW1hZ2UpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKEhlcm9JbWFnZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEhlcm9JbWFnZSkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHt9O1xuXG4gICAgICAgIF90aGlzLmhhbmRsZUlucHV0Q2hhbmdlID0gX3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2UuYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmhhbmRsZVN1Ym1pdCA9IF90aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEhlcm9JbWFnZSwgW3tcbiAgICAgICAga2V5OiAnaGFuZGxlSW5wdXRDaGFuZ2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlSW5wdXRDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JyA/IHRhcmdldC5jaGVja2VkIDogdGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgdmFyIG5hbWUgPSB0YXJnZXQubmFtZTtcblxuICAgICAgICAgICAgdmFyIHBhcnRpYWxTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgcGFydGlhbFN0YXRlW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHBhcnRpYWxTdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZVN1Ym1pdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5hbWU6IFwiICsgdGhpcy5zdGF0ZS5uYW1lICsgXCIsIEVtYWlsOiBcIiArIHRoaXMuc3RhdGUuZW1haWwpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHt9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY29udGFjdC1mb3JtLXdyYXBwZXIgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdmb3JtJyxcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdmb3JtJywgb25TdWJtaXQ6IHRoaXMuaGFuZGxlU3VibWl0LCBub1ZhbGlkYXRlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnbGFiZWwgbGFiZWwtZGVmYXVsdCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdZb3VyIE5hbWUnXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsgY2xhc3NOYW1lOiAnaW5wdXQgaW5wdXQtZGVmYXVsdCcsIG5hbWU6ICduYW1lJywgdHlwZTogJ3RleHQnLCByZXF1aXJlZDogdHJ1ZSwgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgfSksXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnbGFiZWwgbGFiZWwtZGVmYXVsdCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdFbWFpbCdcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyBjbGFzc05hbWU6ICdpbnB1dCBpbnB1dC1kZWZhdWx0JywgbmFtZTogJ2VtYWlsJywgdHlwZTogJ2VtYWlsJywgcmVxdWlyZWQ6IHRydWUsIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlIH0pLFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7IGNsYXNzTmFtZTogJ2lucHV0IGJ0biBidG4tcHJpbWFyeScsIHR5cGU6ICdzdWJtaXQnLCB2YWx1ZTogJ1NlbmQgcmVxdWVzdCcgfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBIZXJvSW1hZ2U7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgICByZXR1cm4ge307XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9ICgwLCBfcmVhY3RSZWR1eC5jb25uZWN0KShtYXBTdGF0ZVRvUHJvcHMsIHt9KShIZXJvSW1hZ2UpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbnZhciBfSGVyb0ltYWdlID0gcmVxdWlyZSgnLi4vaGVyb0ltYWdlL0hlcm9JbWFnZScpO1xuXG52YXIgX0hlcm9JbWFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9IZXJvSW1hZ2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRGl2aWRlciA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRGl2aWRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBEaXZpZGVyKHByb3BzKSB7XG4gICAgICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERpdmlkZXIpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERpdmlkZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEaXZpZGVyKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge307XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEaXZpZGVyLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHt9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnd3JhcHBlci1kaXZpZGVyJyB9LFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ2RpdmlkZXItbGluZS1icmVhayBkaXZpZGVyLWxpbmUtYnJlYWstbGVmdCcgfSksXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2RpdmlkZXItY2lyY2xlLXdyYXBwZXInIH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ2RpdmlkZXItY2lyY2xlLW92ZXJsYXknIH0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBjbGFzc05hbWU6ICdkaXZpZGVyLWxpbmUtYnJlYWsgZGl2aWRlci1saW5lLWJyZWFrLXJpZ2h0JyB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gRGl2aWRlcjtcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuICAgIHJldHVybiB7fTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9yZWFjdFJlZHV4LmNvbm5lY3QpKG1hcFN0YXRlVG9Qcm9wcywge30pKERpdmlkZXIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIF9yZWFjdERvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdERvbSk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBIZXJvSW1hZ2UgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKEhlcm9JbWFnZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBIZXJvSW1hZ2UocHJvcHMpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgSGVyb0ltYWdlKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChIZXJvSW1hZ2UuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihIZXJvSW1hZ2UpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB3cmFwcGVyU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoXCInICsgX3RoaXMucHJvcHMuYmFja2dyb3VuZEltYWdlICsgJ1wiKScsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6IF90aGlzLnByb3BzLmJhY2tncm91bmRTaXplLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogX3RoaXMucHJvcHMuYmFja2dyb3VuZFBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogX3RoaXMucHJvcHMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6IF90aGlzLnByb3BzLmJhY2tncm91bmRSZXBlYXQsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBfdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoSGVyb0ltYWdlLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHt9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkLW5vLXBhZGRpbmcnIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2hlcm8taW1hZ2Utd3JhcHBlciAnICsgdGhpcy5wcm9wcy5jbGFzc05hbWUsIHN0eWxlOiB0aGlzLnN0YXRlLndyYXBwZXJTdHlsZSB9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gSGVyb0ltYWdlO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gICAgcmV0dXJuIHt9O1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSAoMCwgX3JlYWN0UmVkdXguY29ubmVjdCkobWFwU3RhdGVUb1Byb3BzLCB7fSkoSGVyb0ltYWdlKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuJyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzJyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0UmVkdXggPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpO1xuXG52YXIgX0hlcm9JbWFnZSA9IHJlcXVpcmUoJy4uL2hlcm9JbWFnZS9IZXJvSW1hZ2UnKTtcblxudmFyIF9IZXJvSW1hZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfSGVyb0ltYWdlKTtcblxudmFyIF9DYWxsb3V0Qm94ID0gcmVxdWlyZSgnLi4vY2FsbG91dEJveC9DYWxsb3V0Qm94Jyk7XG5cbnZhciBfQ2FsbG91dEJveDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9DYWxsb3V0Qm94KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFRocmVlQm94Q2FsbG91dCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoVGhyZWVCb3hDYWxsb3V0LCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFRocmVlQm94Q2FsbG91dChwcm9wcykge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBUaHJlZUJveENhbGxvdXQpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFRocmVlQm94Q2FsbG91dC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFRocmVlQm94Q2FsbG91dCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoVGhyZWVCb3hDYWxsb3V0LCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHt9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMucHJvcHMuaGVpZ2h0O1xuICAgICAgICAgICAgaWYgKGhlaWdodCA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gXCIzMjlweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSB9LFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBfSGVyb0ltYWdlMi5kZWZhdWx0LFxuICAgICAgICAgICAgICAgICAgICB7IGhlaWdodDogaGVpZ2h0LCBiYWNrZ3JvdW5kSW1hZ2U6ICcvdGhlbWVzL2JzbGYvaW1nL2hvbWUvaGVyby1wYXR0ZXJuLWJnLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMkNBRkMxJywgYmFja2dyb3VuZFNpemU6ICdhdXRvIDMyOXB4JywgYmFja2dyb3VuZFJlcGVhdDogJ3JlcGVhdC14JyB9LFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICd0aHJlZS1ib3gtY2FsbG91dC1ib3gtd3JhcHBlciBjb250YWluZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBUaHJlZUJveENhbGxvdXQ7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgICByZXR1cm4ge307XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9ICgwLCBfcmVhY3RSZWR1eC5jb25uZWN0KShtYXBTdGF0ZVRvUHJvcHMsIHt9KShUaHJlZUJveENhbGxvdXQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlcXVlc3RQYWdlID0gcmVxdWVzdFBhZ2U7XG5leHBvcnRzLnJlY2VpdmVQYWdlID0gcmVjZWl2ZVBhZ2U7XG52YXIgUkVRVUVTVF9QQUdFID0gZXhwb3J0cy5SRVFVRVNUX1BBR0UgPSAnUkVRVUVTVF9QQUdFJztcbnZhciBSRUNFSVZFX1BBR0UgPSBleHBvcnRzLlJFQ0VJVkVfUEFHRSA9ICdSRUNFSVZFX1BBR0UnO1xuXG5mdW5jdGlvbiByZXF1ZXN0UGFnZSh1cmkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSRVFVRVNUX1BBR0UsXG4gICAgICAgIHVyaTogdXJpXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcmVjZWl2ZVBhZ2UodXJpLCBwYWdlRGF0YSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFJFQ0VJVkVfUEFHRSxcbiAgICAgICAgdXJpOiB1cmksXG4gICAgICAgIGNvbnRlbnQ6IHBhZ2VEYXRhLFxuICAgICAgICByZWNlaXZlZEF0OiBEYXRlLm5vdygpXG4gICAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBfcm91dGVzID0gcmVxdWlyZSgnLi9yb3V0ZXIvcm91dGVzJyk7XG5cbnZhciBfcm91dGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JvdXRlcyk7XG5cbnZhciBfcmVhY3RSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcblxudmFyIF9yZWFjdFJlZHV4ID0gcmVxdWlyZSgncmVhY3QtcmVkdXgnKTtcblxudmFyIF9yZWFjdFJvdXRlclJlZHV4ID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyLXJlZHV4Jyk7XG5cbnZhciBfY29uZmlndXJlU3RvcmUgPSByZXF1aXJlKCcuL3N0b3JlL2NvbmZpZ3VyZVN0b3JlJyk7XG5cbnZhciBfY29uZmlndXJlU3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlndXJlU3RvcmUpO1xuXG52YXIgX3NhZ2FzID0gcmVxdWlyZSgnLi9zYWdhcycpO1xuXG52YXIgX3NhZ2FzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NhZ2FzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuY29uc29sZS5sb2coXCJpbml0IHRoZW1lXCIpO1xuXG4vLyBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHdpbmRvdy5fX0lOSVRJQUxfU1RBVEVfXyk7XG4vLyBzdG9yZS5ydW5TYWdhKHJvb3RTYWdhLCBzdG9yZS5kaXNwYXRjaCk7XG5cbi8vIGNvbnN0IGhpc3RvcnkgPSBzeW5jSGlzdG9yeVdpdGhTdG9yZShicm93c2VySGlzdG9yeSwgc3RvcmUpO1xuXG4vL1xuLy8gLy8gcmVndWxhciByZW5kZXJcbi8vIGV4cG9ydCBmdW5jdGlvbiBydW4oKSB7XG4vLyAgICAgcmVuZGVyKFxuLy8gICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbi8vICAgICAgICAgICAgIDxSb3V0ZXIgaGlzdG9yeT17aGlzdG9yeX0gcm91dGVzPXtyb3V0ZXN9Lz5cbi8vICAgICAgICAgPC9Qcm92aWRlcj4sXG4vLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuLy8gICAgICk7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBnZXRTdG9yZSgpIHtcbi8vICAgICByZXR1cm4gc3RvcmU7XG4vLyB9XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHknKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eTIpO1xuXG52YXIgX2V4dGVuZHM0ID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMnKTtcblxudmFyIF9leHRlbmRzNSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4dGVuZHM0KTtcblxudmFyIF9wYWdlID0gcmVxdWlyZSgnLi9hY3Rpb25zL3BhZ2UnKTtcblxudmFyIF9yZWFjdFJvdXRlclJlZHV4ID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyLXJlZHV4Jyk7XG5cbnZhciBfcmVkdXggPSByZXF1aXJlKCdyZWR1eCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vLyBpbXBvcnQgaG9tZSBmcm9tICcuLi9jb250YWluZXJzL2hvbWUvaG9tZS5yZWR1Y2VycydcblxuZnVuY3Rpb24gcGFnZUJ5VXJpKCkge1xuICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50c1sxXTtcblxuICAgIHZhciB1cmkgPSBhY3Rpb24udXJpO1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBfcGFnZS5SRVFVRVNUX1BBR0U6XG4gICAgICAgICAgICByZXR1cm4gKDAsIF9leHRlbmRzNS5kZWZhdWx0KSh7fSwgc3RhdGUsICgwLCBfZGVmaW5lUHJvcGVydHkzLmRlZmF1bHQpKHt9LCB1cmksICgwLCBfZXh0ZW5kczUuZGVmYXVsdCkoe30sIHN0YXRlW3VyaV0sIHtcbiAgICAgICAgICAgICAgICB1cmk6IGFjdGlvbi51cmksXG4gICAgICAgICAgICAgICAgaXNGZXRjaGluZzogdHJ1ZVxuICAgICAgICAgICAgfSkpKTtcblxuICAgICAgICBjYXNlIF9wYWdlLlJFQ0VJVkVfUEFHRTpcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gYWN0aW9uLmNvbnRlbnQ7XG4gICAgICAgICAgICByZXR1cm4gKDAsIF9leHRlbmRzNS5kZWZhdWx0KSh7fSwgc3RhdGUsICgwLCBfZGVmaW5lUHJvcGVydHkzLmRlZmF1bHQpKHt9LCB1cmksICgwLCBfZXh0ZW5kczUuZGVmYXVsdCkoe30sIHN0YXRlW3VyaV0sIHtcbiAgICAgICAgICAgICAgICBpc0ZldGNoaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgICAgIHVyaTogYWN0aW9uLnVyaSxcbiAgICAgICAgICAgICAgICBsYXN0VXBkYXRlZDogYWN0aW9uLnJlY2VpdmVkQXRcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuXG52YXIgcm9vdFJlZHVjZXIgPSAoMCwgX3JlZHV4LmNvbWJpbmVSZWR1Y2Vycykoe1xuICAgIC8vIGhvbWU6IGhvbWUsXG4gICAgcGFnZTogcGFnZUJ5VXJpLFxuICAgIHJvdXRpbmc6IF9yZWFjdFJvdXRlclJlZHV4LnJvdXRlclJlZHVjZXJcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSByb290UmVkdWNlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcblxudmFyIF9kZWZhdWx0X3RtcGwgPSByZXF1aXJlKCcuLi8uLi90ZW1wbGF0ZXMvZGVmYXVsdF90bXBsJyk7XG5cbnZhciBfZGVmYXVsdF90bXBsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRfdG1wbCk7XG5cbnZhciBfaG9tZVBhZ2UgPSByZXF1aXJlKCcuLi8uLi9jb250YWluZXJzL2hvbWVQYWdlL2hvbWVQYWdlLnJvdXRlcycpO1xuXG52YXIgX2hvbWVQYWdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hvbWVQYWdlKTtcblxudmFyIF9jbGFzc3Jvb21QYWdlID0gcmVxdWlyZSgnLi4vLi4vY29udGFpbmVycy9jbGFzc3Jvb21QYWdlL2NsYXNzcm9vbVBhZ2Uucm91dGVzJyk7XG5cbnZhciBfY2xhc3Nyb29tUGFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc3Jvb21QYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgX3JlYWN0Um91dGVyLlJvdXRlLFxuICAgIHsgY29tcG9uZW50OiBfZGVmYXVsdF90bXBsMi5kZWZhdWx0IH0sXG4gICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIF9yZWFjdFJvdXRlci5Sb3V0ZSxcbiAgICAgICAgeyBwYXRoOiAnLycgfSxcbiAgICAgICAgX2hvbWVQYWdlMi5kZWZhdWx0LFxuICAgICAgICAnIC8qIGRlZmF1bHQgcm91dGUgKi8nXG4gICAgKSxcbiAgICBfY2xhc3Nyb29tUGFnZTIuZGVmYXVsdCxcbiAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3RSb3V0ZXIuUmVkaXJlY3QsIHsgZnJvbTogJyonLCB0bzogJy8nIH0pXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yJyk7XG5cbnZhciBfcmVnZW5lcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVnZW5lcmF0b3IpO1xuXG5leHBvcnRzLmZldGNoUGFnZUFwaSA9IGZldGNoUGFnZUFwaTtcbmV4cG9ydHMuZmV0Y2hQYWdlRGF0YSA9IGZldGNoUGFnZURhdGE7XG5leHBvcnRzLndhdGNoUmVxdWVzdFBhZ2UgPSB3YXRjaFJlcXVlc3RQYWdlO1xuZXhwb3J0cy5kZWZhdWx0ID0gcm9vdFNhZ2E7XG5cbnZhciBfZWZmZWN0cyA9IHJlcXVpcmUoJ3JlZHV4LXNhZ2EvZWZmZWN0cycpO1xuXG52YXIgX3BhZ2UgPSByZXF1aXJlKCcuL2FjdGlvbnMvcGFnZScpO1xuXG52YXIgYWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9wYWdlKTtcblxudmFyIF9hcGkgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy9hcGknKTtcblxudmFyIF9yZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgX21hcmtlZCA9IFtmZXRjaFBhZ2VBcGksIGZldGNoUGFnZURhdGEsIHdhdGNoUmVxdWVzdFBhZ2UsIHJvb3RTYWdhXS5tYXAoX3JlZ2VuZXJhdG9yMi5kZWZhdWx0Lm1hcmspO1xuXG4vLyBpbXBvcnQgaG9tZUNvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL2hvbWUvaG9tZS5zYWdhcydcblxuXG4vLyBmZXRjaCBwYWdlIGNvbnRlbnQgZGF0YSBiYXNlZCBvbiB1cmkgZnJvbSBhcGlcbmZ1bmN0aW9uIGZldGNoUGFnZUFwaSh1cmkpIHtcbiAgICB2YXIgY2xlYW5VcmksIF9yZWYsIHJlcywgZXJyO1xuXG4gICAgcmV0dXJuIF9yZWdlbmVyYXRvcjIuZGVmYXVsdC53cmFwKGZ1bmN0aW9uIGZldGNoUGFnZUFwaSQoX2NvbnRleHQpIHtcbiAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGNsZWFuVXJpID0gdXJpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cmkgPT0gXCIvXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFuVXJpID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgwLCBfZWZmZWN0cy5jYWxsKShfYXBpLkdldCwgJ2h0dHA6Ly9sb2NhbGhvc3Q6OTA5MC90aGVtZXMvYnNsZi9wYWdlcycgKyBjbGVhblVyaSArICcvZGF0YS5qc29uJyk7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfY29udGV4dC5zZW50O1xuICAgICAgICAgICAgICAgICAgICByZXMgPSBfcmVmLnJlcztcbiAgICAgICAgICAgICAgICAgICAgZXJyID0gX3JlZi5lcnI7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdCgncmV0dXJuJywgcmVzKTtcblxuICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgZ2V0dGluZyBwYWdlIGRhdGEuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfcmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3RvcnkucHVzaChcIi9cIik7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBfbWFya2VkWzBdLCB0aGlzKTtcbn1cblxuLy8gZmV0Y2ggcGFnZSBkYXRhIGJhc2VkIG9uIHVyaVxuZnVuY3Rpb24gZmV0Y2hQYWdlRGF0YShhY3Rpb24pIHtcbiAgICB2YXIgcGFnZURhdGE7XG4gICAgcmV0dXJuIF9yZWdlbmVyYXRvcjIuZGVmYXVsdC53cmFwKGZ1bmN0aW9uIGZldGNoUGFnZURhdGEkKF9jb250ZXh0Mikge1xuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoMCwgX2VmZmVjdHMuY2FsbCkoZmV0Y2hQYWdlQXBpLCBhY3Rpb24udXJpKTtcblxuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcGFnZURhdGEgPSBfY29udGV4dDIuc2VudDtcbiAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSA1O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDAsIF9lZmZlY3RzLnB1dCkoYWN0aW9ucy5yZWNlaXZlUGFnZShhY3Rpb24udXJpLCBwYWdlRGF0YSkpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgX21hcmtlZFsxXSwgdGhpcyk7XG59XG5cbi8vIHdhdGNoIGZvciBwYWdlIHJlcXVlc3RzXG5mdW5jdGlvbiB3YXRjaFJlcXVlc3RQYWdlKCkge1xuICAgIHJldHVybiBfcmVnZW5lcmF0b3IyLmRlZmF1bHQud3JhcChmdW5jdGlvbiB3YXRjaFJlcXVlc3RQYWdlJChfY29udGV4dDMpIHtcbiAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQzLm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDAsIF9lZmZlY3RzLnRha2VFdmVyeSkoYWN0aW9ucy5SRVFVRVNUX1BBR0UsIGZldGNoUGFnZURhdGEpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgX21hcmtlZFsyXSwgdGhpcyk7XG59XG5cbi8qKlxuICogcm9vdFNhZ2FcbiAqL1xuZnVuY3Rpb24gcm9vdFNhZ2EoKSB7XG4gICAgcmV0dXJuIF9yZWdlbmVyYXRvcjIuZGVmYXVsdC53cmFwKGZ1bmN0aW9uIHJvb3RTYWdhJChfY29udGV4dDQpIHtcbiAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQ0LnByZXYgPSBfY29udGV4dDQubmV4dCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWygwLCBfZWZmZWN0cy5mb3JrKSh3YXRjaFJlcXVlc3RQYWdlKV07XG5cbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBfbWFya2VkWzNdLCB0aGlzKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY29uZmlndXJlU3RvcmU7XG5cbnZhciBfcmVkdXggPSByZXF1aXJlKCdyZWR1eCcpO1xuXG52YXIgX3JlZHVjZXJzID0gcmVxdWlyZSgnLi4vcmVkdWNlcnMnKTtcblxudmFyIF9yZWR1Y2VyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWR1Y2Vycyk7XG5cbnZhciBfcmVkdXhMb2dnZXIgPSByZXF1aXJlKCdyZWR1eC1sb2dnZXInKTtcblxudmFyIF9yZWR1eFNhZ2EgPSByZXF1aXJlKCdyZWR1eC1zYWdhJyk7XG5cbnZhciBfcmVkdXhTYWdhMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlZHV4U2FnYSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGluaXRpYWxTdGF0ZSkge1xuXG4gICAgdmFyIHNhZ2FNaWRkbGV3YXJlID0gKDAsIF9yZWR1eFNhZ2EyLmRlZmF1bHQpKCk7XG4gICAgdmFyIGxvZ2dlciA9ICgwLCBfcmVkdXhMb2dnZXIuY3JlYXRlTG9nZ2VyKSh7XG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgdmFyIGNvbXBvc2VFbmhhbmNlcnMgPSB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IF9yZWR1eC5jb21wb3NlO1xuXG4gICAgdmFyIHN0b3JlID0gKDAsIF9yZWR1eC5jcmVhdGVTdG9yZSkoX3JlZHVjZXJzMi5kZWZhdWx0LCBpbml0aWFsU3RhdGUsIGNvbXBvc2VFbmhhbmNlcnMoKDAsIF9yZWR1eC5hcHBseU1pZGRsZXdhcmUpKHNhZ2FNaWRkbGV3YXJlLCBsb2dnZXIpKSk7XG5cbiAgICAvLyBkZXRlY3QgaWYgd2UncmUgbG9hZGluZyBmb3IgdGhlIGZpcnN0IHRpbWUgb3IgcmVsb2FkaW5nXG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vcmVkdWNlcnMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgc3RvcmUucmVwbGFjZVJlZHVjZXIocmVxdWlyZSgnLi4vcmVkdWNlcnMnKS5kZWZhdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RvcmUucnVuU2FnYSA9IHNhZ2FNaWRkbGV3YXJlLnJ1bjtcbiAgICBzdG9yZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmRpc3BhdGNoKF9yZWR1eFNhZ2EuRU5EKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0b3JlO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcGFnZSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9hY3Rpb25zL3BhZ2UnKTtcblxudmFyIF9yZWFjdFJlZHV4ID0gcmVxdWlyZSgncmVhY3QtcmVkdXgnKTtcblxudmFyIF9IZXJvSW1hZ2UgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2hlcm9JbWFnZS9IZXJvSW1hZ2UnKTtcblxudmFyIF9IZXJvSW1hZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfSGVyb0ltYWdlKTtcblxudmFyIF9DbGFzc3Jvb21EZXRhaWxzID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2NsYXNzcm9vbURldGFpbHMvQ2xhc3Nyb29tRGV0YWlscycpO1xuXG52YXIgX0NsYXNzcm9vbURldGFpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ2xhc3Nyb29tRGV0YWlscyk7XG5cbnZhciBfQ2xhc3Nyb29tR2FsbGVyeSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9jbGFzc3Jvb21HYWxsZXJ5L0NsYXNzcm9vbUdhbGxlcnknKTtcblxudmFyIF9DbGFzc3Jvb21HYWxsZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NsYXNzcm9vbUdhbGxlcnkpO1xuXG52YXIgX0NhbGxvdXRCb3ggPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NhbGxvdXRCb3gvQ2FsbG91dEJveCcpO1xuXG52YXIgX0NhbGxvdXRCb3gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ2FsbG91dEJveCk7XG5cbnZhciBfRGl2aWRlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZGl2aWRlci9EaXZpZGVyJyk7XG5cbnZhciBfRGl2aWRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EaXZpZGVyKTtcblxudmFyIF9Db250YWN0Rm9ybSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29udGFjdEZvcm0vQ29udGFjdEZvcm0nKTtcblxudmFyIF9Db250YWN0Rm9ybTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db250YWN0Rm9ybSk7XG5cbnZhciBfVGhyZWVCb3hDYWxsb3V0ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy90aHJlZUJveENhbGxvdXQvVGhyZWVCb3hDYWxsb3V0Jyk7XG5cbnZhciBfVGhyZWVCb3hDYWxsb3V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RocmVlQm94Q2FsbG91dCk7XG5cbnZhciBfcmVhY3RBZGRvbnNDc3NUcmFuc2l0aW9uR3JvdXAgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtY3NzLXRyYW5zaXRpb24tZ3JvdXAnKTtcblxudmFyIF9yZWFjdEFkZG9uc0Nzc1RyYW5zaXRpb25Hcm91cDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc0Nzc1RyYW5zaXRpb25Hcm91cCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBDbGFzc1Jvb21QYWdlID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShDbGFzc1Jvb21QYWdlLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIENsYXNzUm9vbVBhZ2UocHJvcHMpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ2xhc3NSb29tUGFnZSk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQ2xhc3NSb29tUGFnZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENsYXNzUm9vbVBhZ2UpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7fTtcblxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQ2xhc3NSb29tUGFnZSwgW3tcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbE1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMucmVxdWVzdFBhZ2UodGhpcy5wcm9wcy5wYXRoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5wYXRoICE9IHRoaXMucHJvcHMucGF0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucmVxdWVzdFBhZ2UobmV4dFByb3BzLnBhdGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5jb250ZW50ICE9IG5leHRQcm9wcy5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Q29udGVudDogbmV4dFByb3BzLmNvbnRlbnRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgICAgICAgICB2YXIgaHRtbCA9IGdldEh0bWxGcm9tRGF0YSh0aGlzLnByb3BzLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gQ2xhc3NSb29tUGFnZTtcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbmZ1bmN0aW9uIGdldEh0bWxGcm9tRGF0YShjKSB7XG4gICAgaWYgKCFjKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgbWFpbkNvbnRlbnRMaXN0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjLmNsYXNzcm9vbURldGFpbHMubWFpbkNvbnRlbnQubGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBtYWluQ29udGVudExpc3QucHVzaChfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdsaScsXG4gICAgICAgICAgICB7IGtleTogaSB9LFxuICAgICAgICAgICAgYy5jbGFzc3Jvb21EZXRhaWxzLm1haW5Db250ZW50Lmxpc3RbaV1cbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdmFyIGh0bWwgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgY2xhc3NOYW1lOiAnY29udGVudC1wYWdlLXRyYW5zaXRpb24nIH0sXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9IZXJvSW1hZ2UyLmRlZmF1bHQsIHsgY2xhc3NOYW1lOiAnaGVyby13cmFwcGVyLWNsYXNzZXMnLCBoZWlnaHQ6IGMudG9wSGVyby5iYWNrZ3JvdW5kSW1hZ2UuaGVpZ2h0LFxuICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBjLnRvcEhlcm8uYmFja2dyb3VuZEltYWdlLnNyYyB9KSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBfQ2xhc3Nyb29tRGV0YWlsczIuZGVmYXVsdCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NvbnRhaW5lciBjb250YWluZXItbm8tcGFkZGluZycgfSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY2xhc3Nyb29tLWRldGFpbHMtbGVmdC1jb2wnIH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NhbGxvdXQtYm94LXdyYXBwZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQ2FsbG91dEJveDIuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NhbGxvdXQtYm94LWNsYXNzcm9vbS1jdGEnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NhbGxvdXQtYm94LWNsYXNzcm9vbS1pY29uLXdyYXBwZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ2NhbGxvdXQtYm94LWNsYXNzcm9vbS1pY29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IFwiYmFja2dyb3VuZEltYWdlXCI6ICd1cmwoJyArIGMuY2xhc3Nyb29tRGV0YWlscy5jYWxsb3V0Qm94Lmljb24uc3JjICsgJyknIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLmNsYXNzcm9vbURldGFpbHMuY2FsbG91dEJveC50aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoMicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuY2xhc3Nyb29tRGV0YWlscy5jYWxsb3V0Qm94LnN1YlRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLmNsYXNzcm9vbURldGFpbHMuY2FsbG91dEJveC5jb250ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfRGl2aWRlcjIuZGVmYXVsdCwgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX0NvbnRhY3RGb3JtMi5kZWZhdWx0LCB7IGNsYXNzTmFtZTogJ2NvbnRhY3QtZm9ybS13cmFwcGVyLWNsYXNzcm9vbS1jdGEnIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjbGFzc3Jvb20tZGV0YWlscy1yaWdodC1jb2wnIH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3dyYXBwZXItY2xhc3Nyb29tLWRldGFpbHMnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5jbGFzc3Jvb21EZXRhaWxzLm1haW5Db250ZW50LnRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5jbGFzc3Jvb21EZXRhaWxzLm1haW5Db250ZW50LmNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNvbnRlbnRMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ2NsZWFyZml4JyB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY29udGFpbmVyIGNvbnRhaW5lci1uby1wYWRkaW5nJyB9LFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICd0ZWFjaGVyLWJpby1jbGFzc3Jvb20td3JhcHBlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnaDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGMudGhyZWVCb3hDYWxsb3V0LnRpdGxlXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgX1RocmVlQm94Q2FsbG91dDIuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAndGhyZWUtYm94LWNhbGxvdXQtY2xhc3Nyb29tJywgaGVpZ2h0OiAnMzI2cHgnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQ2FsbG91dEJveDIuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3RocmVlLWJveC1jYWxsb3V0LWJveCB0aHJlZS1ib3gtY2FsbG91dC1ib3gtY2xhc3Nyb29tIHRocmVlLWJveC1jYWxsb3V0LWJveC1sZWZ0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnRocmVlQm94Q2FsbG91dC5ib3gxLnRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaW1nJywgeyBzcmM6IGMudGhyZWVCb3hDYWxsb3V0LmJveDEuaW1hZ2Uuc3JjLCBhbHQ6IGMudGhyZWVCb3hDYWxsb3V0LmJveDEuaW1hZ2UuYWx0IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMudGhyZWVCb3hDYWxsb3V0LmJveDEudGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQ2FsbG91dEJveDIuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3RocmVlLWJveC1jYWxsb3V0LWJveCB0aHJlZS1ib3gtY2FsbG91dC1ib3gtY2xhc3Nyb29tIHRocmVlLWJveC1jYWxsb3V0LWJveC1jZW50ZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoMicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMudGhyZWVCb3hDYWxsb3V0LmJveDIudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdpbWcnLCB7IHNyYzogYy50aHJlZUJveENhbGxvdXQuYm94Mi5pbWFnZS5zcmMsIGFsdDogYy50aHJlZUJveENhbGxvdXQuYm94Mi5pbWFnZS5hbHQgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy50aHJlZUJveENhbGxvdXQuYm94Mi50ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9DYWxsb3V0Qm94Mi5kZWZhdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndGhyZWUtYm94LWNhbGxvdXQtYm94IHRocmVlLWJveC1jYWxsb3V0LWJveC1jbGFzc3Jvb20gdGhyZWUtYm94LWNhbGxvdXQtYm94LXJpZ2h0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnRocmVlQm94Q2FsbG91dC5ib3gzLnRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaW1nJywgeyBzcmM6IGMudGhyZWVCb3hDYWxsb3V0LmJveDMuaW1hZ2Uuc3JjLCBhbHQ6IGMudGhyZWVCb3hDYWxsb3V0LmJveDMuaW1hZ2UuYWx0IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMudGhyZWVCb3hDYWxsb3V0LmJveDMudGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBfQ2xhc3Nyb29tR2FsbGVyeTIuZGVmYXVsdCxcbiAgICAgICAgICAgIHsgaW1hZ2VzOiBjLmdhbGxlcnkuaW1hZ2VzIH0sXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NvbnRhaW5lciBjb250YWluZXItbm8tcGFkZGluZycgfSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2gxJyxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYy5nYWxsZXJ5LnRpdGxlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgKTtcblxuICAgIHJldHVybiBodG1sO1xufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKSB7XG4gICAgdmFyIGNvbnRlbnQgPSBudWxsO1xuICAgIHZhciBwYXRoID0gb3duUHJvcHMubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIHBhZ2UgPSBzdGF0ZS5wYWdlW3BhdGhdO1xuICAgIGlmICghIXBhZ2UgJiYgISFwYWdlLmNvbnRlbnQpIHtcbiAgICAgICAgY29udGVudCA9IHBhZ2UuY29udGVudDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgcGF0aDogcGF0aFxuICAgIH07XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9ICgwLCBfcmVhY3RSZWR1eC5jb25uZWN0KShtYXBTdGF0ZVRvUHJvcHMsIHtcbiAgICByZXF1ZXN0UGFnZTogX3BhZ2UucmVxdWVzdFBhZ2Vcbn0pKENsYXNzUm9vbVBhZ2UpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xuXG52YXIgX2NsYXNzcm9vbVBhZ2UgPSByZXF1aXJlKCcuL2NsYXNzcm9vbVBhZ2UuY29udGFpbmVyJyk7XG5cbnZhciBfY2xhc3Nyb29tUGFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc3Jvb21QYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgX3JlYWN0Um91dGVyLlJvdXRlLFxuICAgIHsgcGF0aDogJy9jbGFzc2VzJyB9LFxuICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFJvdXRlci5Sb3V0ZSwgeyBwYXRoOiAnOnJvb20nLCBjb21wb25lbnQ6IF9jbGFzc3Jvb21QYWdlMi5kZWZhdWx0IH0pXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIF9yZWFjdERvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdERvbSk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBDbGFzc3Jvb21EZXRhaWxzID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShDbGFzc3Jvb21EZXRhaWxzLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIENsYXNzcm9vbURldGFpbHMocHJvcHMpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ2xhc3Nyb29tRGV0YWlscyk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQ2xhc3Nyb29tRGV0YWlscy5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENsYXNzcm9vbURldGFpbHMpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKENsYXNzcm9vbURldGFpbHMsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge31cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjbGFzc3Jvb20tZGV0YWlscy13cmFwcGVyJyB9LFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIENsYXNzcm9vbURldGFpbHM7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgICByZXR1cm4ge307XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9ICgwLCBfcmVhY3RSZWR1eC5jb25uZWN0KShtYXBTdGF0ZVRvUHJvcHMsIHt9KShDbGFzc3Jvb21EZXRhaWxzKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuJyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzJyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0UmVkdXggPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpO1xuXG52YXIgX3JlYWN0SW1hZ2VHYWxsZXJ5ID0gcmVxdWlyZSgncmVhY3QtaW1hZ2UtZ2FsbGVyeScpO1xuXG52YXIgX3JlYWN0SW1hZ2VHYWxsZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0SW1hZ2VHYWxsZXJ5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIENsYXNzcm9vbUdhbGxlcnkgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKENsYXNzcm9vbUdhbGxlcnksIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gQ2xhc3Nyb29tR2FsbGVyeShwcm9wcykge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBDbGFzc3Jvb21HYWxsZXJ5KTtcblxuICAgICAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChDbGFzc3Jvb21HYWxsZXJ5Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2xhc3Nyb29tR2FsbGVyeSkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQ2xhc3Nyb29tR2FsbGVyeSwgW3tcbiAgICAgICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7fVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaW1hZ2VzW2ldLm9yaWdpbmFsQ2xhc3MgPSBcImNsYXNzcm9vbS1nYWxsZXJ5LXByaW1hcnktaW1hZ2VcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmltYWdlc1tpXS50aHVtYm5haWxDbGFzcyA9IFwiY2xhc3Nyb29tLWdhbGxlcnktdGh1bWItaW1hZ2VcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY2xhc3Nyb29tLWdhbGxlcnktd3JhcHBlcicgfSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuLFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjb250YWluZXIgY29udGFpbmVyLW5vLXBhZGRpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NsYXNzcm9vbS1pbWFnZS1nYWxsZXJ5LXdyYXBwZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3RJbWFnZUdhbGxlcnkyLmRlZmF1bHQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5wcm9wcy5pbWFnZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd05hdjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1BsYXlCdXR0b246IGZhbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBDbGFzc3Jvb21HYWxsZXJ5O1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gICAgcmV0dXJuIHt9O1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSAoMCwgX3JlYWN0UmVkdXguY29ubmVjdCkobWFwU3RhdGVUb1Byb3BzLCB7fSkoQ2xhc3Nyb29tR2FsbGVyeSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlZHV4RGV2dG9vbHMgPSByZXF1aXJlKCdyZWR1eC1kZXZ0b29scycpO1xuXG52YXIgX3JlZHV4RGV2dG9vbHNMb2dNb25pdG9yID0gcmVxdWlyZSgncmVkdXgtZGV2dG9vbHMtbG9nLW1vbml0b3InKTtcblxudmFyIF9yZWR1eERldnRvb2xzTG9nTW9uaXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWR1eERldnRvb2xzTG9nTW9uaXRvcik7XG5cbnZhciBfcmVkdXhEZXZ0b29sc0RvY2tNb25pdG9yID0gcmVxdWlyZSgncmVkdXgtZGV2dG9vbHMtZG9jay1tb25pdG9yJyk7XG5cbnZhciBfcmVkdXhEZXZ0b29sc0RvY2tNb25pdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlZHV4RGV2dG9vbHNEb2NrTW9uaXRvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIERPQ1M6IGh0dHBzOi8vZ2l0aHViLmNvbS9nYWVhcm9uL3JlZHV4LWRldnRvb2xzXG5cbi8vIGNyZWF0ZURldlRvb2xzIHRha2VzIGEgbW9uaXRvciBhbmQgcHJvZHVjZXMgYSBEZXZUb29scyBjb21wb25lbnRcbnZhciBEZXZUb29scyA9ICgwLCBfcmVkdXhEZXZ0b29scy5jcmVhdGVEZXZUb29scykoX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgX3JlZHV4RGV2dG9vbHNEb2NrTW9uaXRvcjIuZGVmYXVsdCxcbiAgICB7IHRvZ2dsZVZpc2liaWxpdHlLZXk6ICdjdHJsLWgnLFxuICAgICAgICBjaGFuZ2VQb3NpdGlvbktleTogJ2N0cmwtcScsXG4gICAgICAgIGRlZmF1bHRQb3NpdGlvbjogJ2xlZnQnIH0sXG4gICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlZHV4RGV2dG9vbHNMb2dNb25pdG9yMi5kZWZhdWx0LCB7IHRoZW1lOiAndG9tb3Jyb3cnIH0pXG4pKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRGV2VG9vbHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcycpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybicpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cycpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc0Nzc1RyYW5zaXRpb25Hcm91cCA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1jc3MtdHJhbnNpdGlvbi1ncm91cCcpO1xuXG52YXIgX3JlYWN0QWRkb25zQ3NzVHJhbnNpdGlvbkdyb3VwMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zQ3NzVHJhbnNpdGlvbkdyb3VwKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIENvcHlyaWdodCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoQ29weXJpZ2h0LCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIENvcHlyaWdodChwcm9wcykge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBDb3B5cmlnaHQpO1xuICAgICAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQ29weXJpZ2h0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29weXJpZ2h0KSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuICAgIH1cblxuICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKENvcHlyaWdodCwgW3tcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge31cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQgY29udGFpbmVyLWZsdWlkLW5vLXBhZGRpbmcnIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvb3Rlci1jb3B5cmlnaHQtYmFyLXdyYXBwZXInIH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdmb290ZXItY29weXJpZ2h0LXRleHQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29weXJpZ2h0IFxceEE5IDIwMTcgQmlnIEZlZXQgTGl0dGxlIFN0ZXBzIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZCAnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBDb3B5cmlnaHQ7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb3B5cmlnaHQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcycpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybicpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cycpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEZvb3RlckNvbnRlbnQgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKEZvb3RlckNvbnRlbnQsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gRm9vdGVyQ29udGVudChwcm9wcykge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBGb290ZXJDb250ZW50KTtcbiAgICAgICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKEZvb3RlckNvbnRlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihGb290ZXJDb250ZW50KSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuICAgIH1cblxuICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEZvb3RlckNvbnRlbnQsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHt9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY29udGFpbmVyLWZsdWlkIGNvbnRhaW5lci1mbHVpZC1uby1wYWRkaW5nJyB9LFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdmb290ZXItY29udGVudC13cmFwcGVyIGNvbnRhaW5lcicgfSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZm9vdGVyLWNvbCBmb290ZXItY29sLWxlZnQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Fib3V0IFVzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdocicsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2gzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvb3Rlci1oMy10b3AtbWFyZ2luLWhlbHBlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVmlkZW9zJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdocicsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2gzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvb3Rlci1oMy10b3AtbWFyZ2luLWhlbHBlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnUGFyZW50IFJlc291cmNlcydcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaHInLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoNScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnSG9tZSBSZXNvdXJjZXMnXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2g1JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvb3Rlci1oNS10b3AtbWFyZ2luLWhlbHBlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnU2lnbiBJbidcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvb3Rlci1zcy13cmFwcGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZm9vdGVyLXNzLWZhY2Vib29rJywgaHJlZjogJyMnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdpJywgeyBjbGFzc05hbWU6ICdpY29uLWZhY2Vib29rJyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdmb290ZXItc3MtdHdpdHRlcicsIGhyZWY6ICcjJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaScsIHsgY2xhc3NOYW1lOiAnaWNvbi10d2l0dGVyJyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZm9vdGVyLWNvbCBmb290ZXItY29sLWNlbnRlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoMycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnUHJvZ3JhbXMnXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2hyJywgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3JvdycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY29sLW1kLTYgY29sLW5vLXBhZGRpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2g1JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTG92YWJsZSBMYW1icyAoNncgdG8gOW0pJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoNScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvb3Rlci1oNS10b3AtbWFyZ2luLWhlbHBlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdHZW50bGUgR2lyYWZmZXMgKDEwbSB0byAxOG0pJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoNScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvb3Rlci1oNS10b3AtbWFyZ2luLWhlbHBlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDdXJpb3VzIENyaXR0ZXJzICgxOG0gdG8gMnlycyknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2g1JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZm9vdGVyLWg1LXRvcC1tYXJnaW4taGVscGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0hlbHBmdWwgSGlwcG9zICgyeXJzIHRvIDIuNXlycyknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2g1JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZm9vdGVyLWg1LXRvcC1tYXJnaW4taGVscGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NoZWVyZnVsIENoaXBtdW5rcyAoMi41eXJzIHRvIDN5cnMpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoNScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvb3Rlci1oNS10b3AtbWFyZ2luLWhlbHBlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdUcnVzdHdvcnRoeSBUdXJ0bGVzICgzeXJzIHRvIDMuNXlycyknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjb2wtbWQtNiBjb2wtbm8tcGFkZGluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb3VyYWdlb3VzIEN1YnMgKDMuNXlycyB0byA0eXJzKSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdmb290ZXItaDUtdG9wLW1hcmdpbi1oZWxwZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRnJpZW5kbHkgRnJvZ3MgKDR5cnMgdG8gNXlycyknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2g1JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZm9vdGVyLWg1LXRvcC1tYXJnaW4taGVscGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1Jlc3BvbnNpYmxlIFJhY2Nvb25zICg1eXJzIHRvIDZ5cnMpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoNScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvb3Rlci1oNS10b3AtbWFyZ2luLWhlbHBlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb29sIEtpZHMgKDZ5cnMgdG8gMTJ5cnMpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoNScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvb3Rlci1oNS10b3AtbWFyZ2luLWhlbHBlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcXHhBMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdmb290ZXItaDUtdG9wLW1hcmdpbi1oZWxwZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVHVpdGlvbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvb3Rlci1lbWFpbC1zaWdudXAtd3JhcHBlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvcm0nIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnbGFiZWwgbGFiZWwtZGVmYXVsdCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdTaWduIHVwIGZvciBvdXIgZW1haWwgbmV3c2xldHRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyBjbGFzc05hbWU6ICdpbnB1dCBpbnB1dC1kZWZhdWx0JywgdHlwZTogJ2VtYWlsJyB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyBjbGFzc05hbWU6ICdpbnB1dCBidG4gYnRuLXByaW1hcnkgZm9vdGVyLWVtYWlsLWlucHV0LWJ0bicsIHR5cGU6ICdzdWJtaXQnLCB2YWx1ZTogJ1NpZ24gVXAnIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdmb290ZXItY29sIGZvb3Rlci1jb2wtcmlnaHQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRhY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2hyJywgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1Bob25lOiAoNjE2KSA2ODItODMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZm9vdGVyLWg1LXRvcC1tYXJnaW4taGVscGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbWFpbDogaW5mb0BiaWdzdGVwc2xpdHRsZWZlZXQub3JnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoNScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdmb290ZXItaDUtdG9wLW1hcmdpbi1oZWxwZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FkZHJlc3M6IDcwMzAgRnVsdG9uIFN0LiBBZGEsIE1JIDQ5MzAxJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZm9vdGVyLW1hcC13cmFwcGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9lbWJlZD9wYj0hMW0xOCExbTEyITFtMyExZDI5MTkuOTQwNzQwMjU5NjIyNSEyZC04NS40OTcxMDkxODQxMDIxITNkNDIuOTU4NDUzMjA1MDkyNzkhMm0zITFmMCEyZjAhM2YwITNtMiExaTEwMjQhMmk3NjghNGYxMy4xITNtMyExbTIhMXMweDg4MTg1MWJjODUzYWY4N2IlM0EweGJkZjkyOWRiMWQ2MGQyNzEhMnNCaWcrU3RlcHMrTGl0dGxlK0ZlZXQhNWUwITNtMiExc2VuITJzdXMhNHYxNDkwNTUwMjQzNzc5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICczNTgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxODMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZUJvcmRlcjogJzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBib3JkZXI6IFwiMFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93RnVsbFNjcmVlbjogdHJ1ZSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gRm9vdGVyQ29udGVudDtcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZvb3RlckNvbnRlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcycpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybicpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cycpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdFJlZHV4ID0gcmVxdWlyZSgncmVhY3QtcmVkdXgnKTtcblxudmFyIF9Gb290ZXJDb250ZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2Zvb3RlckNvbnRlbnQvRm9vdGVyQ29udGVudCcpO1xuXG52YXIgX0Zvb3RlckNvbnRlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRm9vdGVyQ29udGVudCk7XG5cbnZhciBfQ29weXJpZ2h0QmFyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2NvcHlyaWdodEJhci9Db3B5cmlnaHRCYXInKTtcblxudmFyIF9Db3B5cmlnaHRCYXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29weXJpZ2h0QmFyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEZvb3RlciA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRm9vdGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIEZvb3Rlcihwcm9wcykge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBGb290ZXIpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKEZvb3Rlci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEZvb3RlcikpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRm9vdGVyLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHt9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnd3JhcHBlci1mb290ZXInIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX0Zvb3RlckNvbnRlbnQyLmRlZmF1bHQsIG51bGwpLFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Db3B5cmlnaHRCYXIyLmRlZmF1bHQsIG51bGwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBGb290ZXI7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgICByZXR1cm4ge307XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9ICgwLCBfcmVhY3RSZWR1eC5jb25uZWN0KShtYXBTdGF0ZVRvUHJvcHMsIHt9KShGb290ZXIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIExvZ28gPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKExvZ28sIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gTG9nbyhwcm9wcykge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBMb2dvKTtcbiAgICAgICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKExvZ28uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihMb2dvKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuICAgIH1cblxuICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKExvZ28sIFt7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2xvZ28nIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdFJvdXRlci5MaW5rLFxuICAgICAgICAgICAgICAgICAgICB7IHRvOiAnLycgfSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHsgc3JjOiAnL3RoZW1lcy9ic2xmL2ltZy9sb2dvLXNtLmpwZycsIHdpZHRoOiAnMTY1JywgYWx0OiAnbG9nbycgfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBMb2dvO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTG9nbztcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuJyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzJyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0QWRkb25zQ3NzVHJhbnNpdGlvbkdyb3VwID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNDc3NUcmFuc2l0aW9uR3JvdXAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNDc3NUcmFuc2l0aW9uR3JvdXApO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgTWVzc2FnZUJhciA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTWVzc2FnZUJhciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBNZXNzYWdlQmFyKHByb3BzKSB7XG4gICAgICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1lc3NhZ2VCYXIpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1lc3NhZ2VCYXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNZXNzYWdlQmFyKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLm9uQ2xpY2sgPSBfdGhpcy5vbkNsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKE1lc3NhZ2VCYXIsIFt7XG4gICAgICAgIGtleTogJ29uQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3c6ICF0aGlzLnN0YXRlLnNob3cgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHt9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIG0gPSBudWxsO1xuICAgICAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgICAgICdtaW5IZWlnaHQnOiAnMzVweCdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoISF0aGlzLnByb3BzLm1lc3NhZ2UgJiYgdGhpcy5zdGF0ZS5zaG93KSB7XG4gICAgICAgICAgICAgICAgbSA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdyb3ctbm8tcGFkZGluZyByb3ctbWVzc2FnZS1iYXInIH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NvbC14cy0xMCBjb2wteHMtcHVzaC0xIGNvbC1uby1wYWRkaW5nICcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdwJywgeyBjbGFzc05hbWU6ICdtZXNzYWdlLWJhci1tZXNzYWdlJywgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHRoaXMucHJvcHMubWVzc2FnZSB9KVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjb2wteHMtMSBjb2wteHMtcHVzaC0xJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdidG4gbWVzc2FnZS1iYXItY2xvc2UtYnRuJywgb25DbGljazogdGhpcy5vbkNsaWNrIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3gnXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQgY29udGFpbmVyLWZsdWlkLW5vLXBhZGRpbmcnIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NvbnRhaW5lci1tZXNzYWdlLWJhcicsIHN0eWxlOiBzdHlsZSB9LFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdEFkZG9uc0Nzc1RyYW5zaXRpb25Hcm91cDIuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdHJhbnNpdGlvbk5hbWU6ICdtZXNzYWdlLWJhcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbkFwcGVhcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uQXBwZWFyVGltZW91dDogMTUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRW50ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25MZWF2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTGVhdmVUaW1lb3V0OiAzMDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIE1lc3NhZ2VCYXI7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBNZXNzYWdlQmFyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfTG9nbyA9IHJlcXVpcmUoJy4uL2xvZ28vTG9nbycpO1xuXG52YXIgX0xvZ28yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTG9nbyk7XG5cbnZhciBfTmF2aWdhdGlvbkl0ZW1CYXNpYyA9IHJlcXVpcmUoJy4uL25hdmlnYXRpb25JdGVtQmFzaWMvTmF2aWdhdGlvbkl0ZW1CYXNpYycpO1xuXG52YXIgX05hdmlnYXRpb25JdGVtQmFzaWMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTmF2aWdhdGlvbkl0ZW1CYXNpYyk7XG5cbnZhciBfTmF2aWdhdGlvbkl0ZW1Qcm9ncmFtcyA9IHJlcXVpcmUoJy4uL25hdmlnYXRpb25JdGVtUHJvZ3JhbXMvTmF2aWdhdGlvbkl0ZW1Qcm9ncmFtcycpO1xuXG52YXIgX05hdmlnYXRpb25JdGVtUHJvZ3JhbXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTmF2aWdhdGlvbkl0ZW1Qcm9ncmFtcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBOYXZpZ2F0aW9uID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShOYXZpZ2F0aW9uLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIE5hdmlnYXRpb24ocHJvcHMpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTmF2aWdhdGlvbik7XG4gICAgICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChOYXZpZ2F0aW9uLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTmF2aWdhdGlvbikpLmNhbGwodGhpcywgcHJvcHMpKTtcbiAgICB9XG5cbiAgICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShOYXZpZ2F0aW9uLCBbe1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQgY29udGFpbmVyLWZsdWlkLW5vLXBhZGRpbmcnIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3JvdyByb3ctY2VudGVyZWQnIH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NvbC1tZC0xMiBjb2wtY2VudGVyZWQgY29sLW5vLXBhZGRpbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NvbnRhaW5lciBjb250YWluZXItbm8tcGFkZGluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnd3JhcHBlci1sb2dvIGhpZGRlbi1zbScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX0xvZ28yLmRlZmF1bHQsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnd3JhcHBlci1uYXZpZ2F0aW9uJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICduYXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9OYXZpZ2F0aW9uSXRlbUJhc2ljMi5kZWZhdWx0LCB7IHBvczogJzAnLCB0aXRsZTogJ0Fib3V0IFVzJywgdXJpOiAnamF2YXNjcmlwdDp2b2lkKDApJyB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9OYXZpZ2F0aW9uSXRlbVByb2dyYW1zMi5kZWZhdWx0LCB7IHRpdGxlOiAnUHJvZ3JhbXMnLCB1cmk6ICdqYXZhc2NyaXB0OnZvaWQoMCknIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX05hdmlnYXRpb25JdGVtQmFzaWMyLmRlZmF1bHQsIHsgdGl0bGU6ICdWaWRlb3MnLCB1cmk6ICdqYXZhc2NyaXB0OnZvaWQoMCknIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX05hdmlnYXRpb25JdGVtQmFzaWMyLmRlZmF1bHQsIHsgdGl0bGU6ICdQYXJlbnQgUmVzb3VyY2VzJywgdXJpOiAnamF2YXNjcmlwdDp2b2lkKDApJyB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9OYXZpZ2F0aW9uSXRlbUJhc2ljMi5kZWZhdWx0LCB7IHRpdGxlOiAnQ29udGFjdCcsIHVyaTogJ2phdmFzY3JpcHQ6dm9pZCgwKScgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfTmF2aWdhdGlvbkl0ZW1CYXNpYzIuZGVmYXVsdCwgeyB0aXRsZTogJ1NpZ24gSW4nLCB1cmk6ICdqYXZhc2NyaXB0OnZvaWQoMCknIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBOYXZpZ2F0aW9uO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTmF2aWdhdGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuJyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzJyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0QWRkb25zQ3NzVHJhbnNpdGlvbkdyb3VwID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNDc3NUcmFuc2l0aW9uR3JvdXAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNDc3NUcmFuc2l0aW9uR3JvdXApO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgTmF2aWdhdGlvbkl0ZW1CYXNpYyA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTmF2aWdhdGlvbkl0ZW1CYXNpYywgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBOYXZpZ2F0aW9uSXRlbUJhc2ljKHByb3BzKSB7XG4gICAgICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE5hdmlnYXRpb25JdGVtQmFzaWMpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE5hdmlnYXRpb25JdGVtQmFzaWMuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihOYXZpZ2F0aW9uSXRlbUJhc2ljKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLm9uQ2xpY2sgPSBfdGhpcy5vbkNsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5jbGFzc05hbWVEZWZ1YWx0ID0gXCJuYXZpZ2F0aW9uLWl0ZW1cIjtcbiAgICAgICAgX3RoaXMuY2xhc3NOYW1lID0gX3RoaXMuY2xhc3NOYW1lRGVmdWFsdDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKE5hdmlnYXRpb25JdGVtQmFzaWMsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHt9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdvbkNsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghIXRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljayhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMucG9zID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lRGVmdWFsdCArIFwiIG5hdmlnYXRpb24taXRlbS1maXJzdFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2EnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiB0aGlzLmNsYXNzTmFtZSwgaHJlZjogdGhpcy5wcm9wcy51cmksIG9uQ2xpY2s6IHRoaXMub25DbGljayB9LFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGl0bGUsXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2knLCB7IGNsYXNzTmFtZTogJ2ljb24tYXJyb3ctZG93biBjb2xvci1vcmFuZ2UnIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBOYXZpZ2F0aW9uSXRlbUJhc2ljO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTmF2aWdhdGlvbkl0ZW1CYXNpYztcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuJyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzJyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9yZWFjdENsaWNrT3V0c2lkZSA9IHJlcXVpcmUoJ3JlYWN0LWNsaWNrLW91dHNpZGUnKTtcblxudmFyIF9yZWFjdENsaWNrT3V0c2lkZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdENsaWNrT3V0c2lkZSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9OYXZpZ2F0aW9uSXRlbUJhc2ljID0gcmVxdWlyZSgnLi4vbmF2aWdhdGlvbkl0ZW1CYXNpYy9OYXZpZ2F0aW9uSXRlbUJhc2ljJyk7XG5cbnZhciBfTmF2aWdhdGlvbkl0ZW1CYXNpYzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OYXZpZ2F0aW9uSXRlbUJhc2ljKTtcblxudmFyIF9Qcm9ncmFtc01lbnUgPSByZXF1aXJlKCcuLi9wcm9ncmFtc01lbnUvUHJvZ3JhbXNNZW51Jyk7XG5cbnZhciBfUHJvZ3JhbXNNZW51MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Byb2dyYW1zTWVudSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBQcm9ncmFtc05hdmlnYXRpb25JdGVtID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShQcm9ncmFtc05hdmlnYXRpb25JdGVtLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFByb2dyYW1zTmF2aWdhdGlvbkl0ZW0ocHJvcHMpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgUHJvZ3JhbXNOYXZpZ2F0aW9uSXRlbSk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoUHJvZ3JhbXNOYXZpZ2F0aW9uSXRlbS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFByb2dyYW1zTmF2aWdhdGlvbkl0ZW0pKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMub25DbGljayA9IF90aGlzLm9uQ2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmhhbmRsZU1lbnVJdGVtU2VsZWN0aW9uID0gX3RoaXMuaGFuZGxlTWVudUl0ZW1TZWxlY3Rpb24uYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgICBpZ25vcmVCZWNhdXNlT2ZPdXRzaWRlQ2xpY2s6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShQcm9ncmFtc05hdmlnYXRpb25JdGVtLCBbe1xuICAgICAgICBrZXk6ICdoYW5kbGVDbGlja091dHNpZGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ2xpY2tPdXRzaWRlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25DbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuOiAhdGhpcy5zdGF0ZS5vcGVuIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVNZW51SXRlbVNlbGVjdGlvbicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNZW51SXRlbVNlbGVjdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuOiAhdGhpcy5zdGF0ZS5vcGVuIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncG9zaXRpb24tcmVsYXRpdmUnIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX05hdmlnYXRpb25JdGVtQmFzaWMyLmRlZmF1bHQsIHsgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIHVyaTogdGhpcy5wcm9wcy51cmksXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMub25DbGljayB9KSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfUHJvZ3JhbXNNZW51Mi5kZWZhdWx0LCB7IG9wZW46IHRoaXMuc3RhdGUub3Blbiwgb25NZW51SXRlbVNlbGVjdGVkOiB0aGlzLmhhbmRsZU1lbnVJdGVtU2VsZWN0aW9uIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBQcm9ncmFtc05hdmlnYXRpb25JdGVtO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9yZWFjdENsaWNrT3V0c2lkZTIuZGVmYXVsdCkoUHJvZ3JhbXNOYXZpZ2F0aW9uSXRlbSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcycpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybicpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cycpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc0Nzc1RyYW5zaXRpb25Hcm91cCA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1jc3MtdHJhbnNpdGlvbi1ncm91cCcpO1xuXG52YXIgX3JlYWN0QWRkb25zQ3NzVHJhbnNpdGlvbkdyb3VwMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zQ3NzVHJhbnNpdGlvbkdyb3VwKTtcblxudmFyIF9Qcm9ncmFtc01lbnVJdGVtID0gcmVxdWlyZSgnLi4vcHJvZ3JhbXNNZW51SXRlbS9Qcm9ncmFtc01lbnVJdGVtJyk7XG5cbnZhciBfUHJvZ3JhbXNNZW51SXRlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Qcm9ncmFtc01lbnVJdGVtKTtcblxudmFyIF9Qcm9ncmFtc01lbnVJdGVtQmFzaWMgPSByZXF1aXJlKCcuLi9wcm9ncmFtc01lbnVJdGVtQmFzaWMvUHJvZ3JhbXNNZW51SXRlbUJhc2ljJyk7XG5cbnZhciBfUHJvZ3JhbXNNZW51SXRlbUJhc2ljMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Byb2dyYW1zTWVudUl0ZW1CYXNpYyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBQcm9ncmFtc01lbnUgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFByb2dyYW1zTWVudSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBQcm9ncmFtc01lbnUocHJvcHMpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgUHJvZ3JhbXNNZW51KTtcblxuICAgICAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChQcm9ncmFtc01lbnUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihQcm9ncmFtc01lbnUpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBvcGVuOiBwcm9wcy5vcGVuXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShQcm9ncmFtc01lbnUsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuOiBuZXh0UHJvcHMub3BlbiB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBwcm9ncmFtc01lbnUgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHByb2dyYW1NZW51RGl2aWRlID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUub3Blbikge1xuICAgICAgICAgICAgICAgIHByb2dyYW1NZW51RGl2aWRlID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGNsYXNzTmFtZTogJ3Byb2dyYW0tbmF2aWdhdGlvbi1pdGVtLWRpdmlkZScgfSk7XG5cbiAgICAgICAgICAgICAgICBwcm9ncmFtc01lbnUgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncHJvZ3JhbXMtbWVudSBjb250YWluZXInIH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3Byb2dyYW0tbWVudS1sZWZ0LTEtY29sJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1Byb2dyYW1zTWVudUl0ZW0yLmRlZmF1bHQsIHsgaWNvbjogJy90aGVtZXMvYnNsZi9pbWcvaWNvbnMvbGFtYi5qcGcnLCB0aXRsZTogJ0xvdmFibGUgTGFtYnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogJy9jbGFzc2VzL2xvdmFibGUtbGFtYnMnLCBkZXRhaWxzOiAnNncgdG8gOW0nLCBvbk1lbnVJdGVtU2VsZWN0ZWQ6IHRoaXMucHJvcHMub25NZW51SXRlbVNlbGVjdGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1Byb2dyYW1zTWVudUl0ZW0yLmRlZmF1bHQsIHsgaWNvbjogJy90aGVtZXMvYnNsZi9pbWcvaWNvbnMvZ2lyYWZmZS5qcGcnLCB0aXRsZTogJ0dlbnRsZSBHaXJhZmZlcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiAnL2NsYXNzZXMvZ2VudGxlLWdpcmFmZmVzJywgZGV0YWlsczogJzEwbSB0byAxOG0nLCBvbk1lbnVJdGVtU2VsZWN0ZWQ6IHRoaXMucHJvcHMub25NZW51SXRlbVNlbGVjdGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1Byb2dyYW1zTWVudUl0ZW0yLmRlZmF1bHQsIHsgaWNvbjogJy90aGVtZXMvYnNsZi9pbWcvaWNvbnMvY3JpdHRlci5qcGcnLCB0aXRsZTogJ0N1cmlvdXMgQ3JpdHRlcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogJy9jbGFzc2VzL2N1cmlvdXMtY3JpdHRlcnMnLCBkZXRhaWxzOiAnMThtIHRvIDJ5cnMnLCBvbk1lbnVJdGVtU2VsZWN0ZWQ6IHRoaXMucHJvcHMub25NZW51SXRlbVNlbGVjdGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1Byb2dyYW1zTWVudUl0ZW0yLmRlZmF1bHQsIHsgaWNvbjogJy90aGVtZXMvYnNsZi9pbWcvaWNvbnMvaGlwcG8uanBnJywgdGl0bGU6ICdIZWxwZnVsIEhpcHBvcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiAnL2NsYXNzZXMvaGVscGZ1bC1oaXBwb3MnLCBkZXRhaWxzOiAnMnlycyB0byAyLjV5cnMnLCBvbk1lbnVJdGVtU2VsZWN0ZWQ6IHRoaXMucHJvcHMub25NZW51SXRlbVNlbGVjdGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1Byb2dyYW1zTWVudUl0ZW0yLmRlZmF1bHQsIHsgaWNvbjogJy90aGVtZXMvYnNsZi9pbWcvaWNvbnMvY2hpcG11bmsuanBnJywgdGl0bGU6ICdDaGVlcmZ1bCBDaGlwbXVua3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogJy9jbGFzc2VzL2NoZWVyZnVsLWNoaXBtdW5rcycsIGRldGFpbHM6ICcyLjV5cnMgdG8gM3lycycsIG9uTWVudUl0ZW1TZWxlY3RlZDogdGhpcy5wcm9wcy5vbk1lbnVJdGVtU2VsZWN0ZWQgfSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncHJvZ3JhbS1tZW51LWxlZnQtMi1jb2wnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfUHJvZ3JhbXNNZW51SXRlbTIuZGVmYXVsdCwgeyBpY29uOiAnL3RoZW1lcy9ic2xmL2ltZy9pY29ucy90dXJ0bGUuanBnJywgdGl0bGU6ICdUcnVzdHdvcnRoeSBUdXJ0bGVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmk6ICcvY2xhc3Nlcy90cnVzdHdvcnRoeS10dXJ0bGVzJywgZGV0YWlsczogJzN5cnMgdG8gMy41eXJzJywgb25NZW51SXRlbVNlbGVjdGVkOiB0aGlzLnByb3BzLm9uTWVudUl0ZW1TZWxlY3RlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Qcm9ncmFtc01lbnVJdGVtMi5kZWZhdWx0LCB7IGljb246ICcvdGhlbWVzL2JzbGYvaW1nL2ljb25zL2N1Yi5qcGcnLCB0aXRsZTogJ0NvdXJhZ2VvdXMgQ3VicycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiAnL2NsYXNzZXMvY291cmFnZW91cy1jdWJzJywgZGV0YWlsczogJzMuNXlycyB0byA0eXJzJywgb25NZW51SXRlbVNlbGVjdGVkOiB0aGlzLnByb3BzLm9uTWVudUl0ZW1TZWxlY3RlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Qcm9ncmFtc01lbnVJdGVtMi5kZWZhdWx0LCB7IGljb246ICcvdGhlbWVzL2JzbGYvaW1nL2ljb25zL2Zyb2cuanBnJywgdGl0bGU6ICdGcmllbmRseSBGcm9ncycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiAnL2NsYXNzZXMvZnJpZW5kbHktZnJvZ3MnLCBkZXRhaWxzOiAnNHlycyB0byA1eXJzJywgb25NZW51SXRlbVNlbGVjdGVkOiB0aGlzLnByb3BzLm9uTWVudUl0ZW1TZWxlY3RlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Qcm9ncmFtc01lbnVJdGVtMi5kZWZhdWx0LCB7IGljb246ICcvdGhlbWVzL2JzbGYvaW1nL2ljb25zL3JhY2Nvb24uanBnJywgdGl0bGU6ICdSZXNwb25zaWJsZSBSYWNvb25zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmk6ICcvY2xhc3Nlcy9yZXNwb25zaWJsZS1yYWNjb29ucycsIGRldGFpbHM6ICc1eXJzIHRvIDZ5cnMnLCBvbk1lbnVJdGVtU2VsZWN0ZWQ6IHRoaXMucHJvcHMub25NZW51SXRlbVNlbGVjdGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1Byb2dyYW1zTWVudUl0ZW0yLmRlZmF1bHQsIHsgaWNvbjogJy90aGVtZXMvYnNsZi9pbWcvaWNvbnMvY29vbC5qcGcnLCB0aXRsZTogJ0Nvb2wgS2lkcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiAnL2NsYXNzZXMvY29vbC1raWRzJywgZGV0YWlsczogJzZ5cnMgdG8gMTJ5cnMnLCBvbk1lbnVJdGVtU2VsZWN0ZWQ6IHRoaXMucHJvcHMub25NZW51SXRlbVNlbGVjdGVkIH0pXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ3Byb2dyYW0tbWVudS1kaXZpZGUnIH0pLFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdwcm9ncmFtLW1lbnUtcmlnaHQtY29sJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1Byb2dyYW1zTWVudUl0ZW1CYXNpYzIuZGVmYXVsdCwgeyB0aXRsZTogJ1R1aXRpb24nLCB1cmk6ICdqYXZhc2NyaXB0OnZvaWQoMCknLCBvbk1lbnVJdGVtU2VsZWN0ZWQ6IHRoaXMucHJvcHMub25NZW51SXRlbVNlbGVjdGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1Byb2dyYW1zTWVudUl0ZW1CYXNpYzIuZGVmYXVsdCwgeyB0aXRsZTogJ0ZpZWxkIFRyaXBzJywgdXJpOiAnamF2YXNjcmlwdDp2b2lkKDApJywgb25NZW51SXRlbVNlbGVjdGVkOiB0aGlzLnByb3BzLm9uTWVudUl0ZW1TZWxlY3RlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Qcm9ncmFtc01lbnVJdGVtQmFzaWMyLmRlZmF1bHQsIHsgdGl0bGU6ICdTYW1wbGUgTGVzc29uIFBsYW4nLCB1cmk6ICdqYXZhc2NyaXB0OnZvaWQoMCknLCBvbk1lbnVJdGVtU2VsZWN0ZWQ6IHRoaXMucHJvcHMub25NZW51SXRlbVNlbGVjdGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1Byb2dyYW1zTWVudUl0ZW1CYXNpYzIuZGVmYXVsdCwgeyB0aXRsZTogJ01vbnRobHkgVGhlbWVzJywgdXJpOiAnamF2YXNjcmlwdDp2b2lkKDApJywgb25NZW51SXRlbVNlbGVjdGVkOiB0aGlzLnByb3BzLm9uTWVudUl0ZW1TZWxlY3RlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Qcm9ncmFtc01lbnVJdGVtQmFzaWMyLmRlZmF1bHQsIHsgdGl0bGU6ICdTYW1wbGUgRGFpbHkgRm9vZCBNZW51JywgdXJpOiAnamF2YXNjcmlwdDp2b2lkKDApJywgb25NZW51SXRlbVNlbGVjdGVkOiB0aGlzLnByb3BzLm9uTWVudUl0ZW1TZWxlY3RlZCB9KVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnd3JhcHBlci1wcm9ncmFtLW1lbnUnIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdEFkZG9uc0Nzc1RyYW5zaXRpb25Hcm91cDIuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgeyB0cmFuc2l0aW9uTmFtZTogJ3Byb2dyYW1zLW1lbnUtZGl2aWRlLXRyYW5zaXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVudGVyVGltZW91dDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTGVhdmVUaW1lb3V0OiA1NTAgfSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbU1lbnVEaXZpZGVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3RBZGRvbnNDc3NUcmFuc2l0aW9uR3JvdXAyLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgIHsgdHJhbnNpdGlvbk5hbWU6ICdwcm9ncmFtcy1tZW51LXRyYW5zaXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVudGVyVGltZW91dDogNTUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbkxlYXZlVGltZW91dDogNTAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHByb2dyYW1zTWVudVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIFByb2dyYW1zTWVudTtcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFByb2dyYW1zTWVudTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuJyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzJyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0Um91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBQcm9ncmFtc01lbnVJdGVtID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShQcm9ncmFtc01lbnVJdGVtLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFByb2dyYW1zTWVudUl0ZW0ocHJvcHMpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgUHJvZ3JhbXNNZW51SXRlbSk7XG4gICAgICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChQcm9ncmFtc01lbnVJdGVtLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUHJvZ3JhbXNNZW51SXRlbSkpLmNhbGwodGhpcywgcHJvcHMpKTtcbiAgICB9XG5cbiAgICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShQcm9ncmFtc01lbnVJdGVtLCBbe1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgX3JlYWN0Um91dGVyLkxpbmssXG4gICAgICAgICAgICAgICAgeyB0bzogdGhpcy5wcm9wcy51cmksIG9uQ2xpY2s6IHRoaXMucHJvcHMub25NZW51SXRlbVNlbGVjdGVkIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3Byb2dyYW0tbWVudS1pdGVtLXdyYXBwZXIgaG92ZXItYW5pbWF0ZS16b29tJyB9LFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdwcm9ncmFtLW1lbnUtaXRlbS1pY29uLXdyYXBwZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgY2xhc3NOYW1lOiAndmVydGljYWwtY2VudGVyLWhlbHBlcicgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaW1nJywgeyBjbGFzc05hbWU6ICdwcm9ncmFtLW1lbnUtaXRlbS1pY29uJywgc3JjOiB0aGlzLnByb3BzLmljb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0OiAnSWNvbiBpbWFnZSBmb3IgJyArIHRoaXMucHJvcHMudGl0bGUgfSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncHJvZ3JhbS1tZW51LWl0ZW0tY29weS13cmFwcGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2gyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3Byb2dyYW0tbWVudS1pdGVtLXRpdGxlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncHJvZ3JhbS1tZW51LWl0ZW0tZGV0YWlscycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmRldGFpbHNcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIFByb2dyYW1zTWVudUl0ZW07XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBQcm9ncmFtc01lbnVJdGVtO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFByb2dyYW1zTWVudUl0ZW1CYXNpYyA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoUHJvZ3JhbXNNZW51SXRlbUJhc2ljLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFByb2dyYW1zTWVudUl0ZW1CYXNpYyhwcm9wcykge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBQcm9ncmFtc01lbnVJdGVtQmFzaWMpO1xuICAgICAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoUHJvZ3JhbXNNZW51SXRlbUJhc2ljLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUHJvZ3JhbXNNZW51SXRlbUJhc2ljKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuICAgIH1cblxuICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFByb2dyYW1zTWVudUl0ZW1CYXNpYywgW3tcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblxuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIF9yZWFjdFJvdXRlci5MaW5rLFxuICAgICAgICAgICAgICAgIHsgdG86IHRoaXMucHJvcHMudXJpLCBvbkNsaWNrOiB0aGlzLnByb3BzLm9uTWVudUl0ZW1TZWxlY3RlZCB9LFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnaDInLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3Byb2dyYW1zLW1lbnUtaXRlbS1iYXNpYy10aXRsZSBob3Zlci1hbmltYXRlLXpvb20nIH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjb2xvci1vcmFuZ2UnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdpY29uLWFycm93LXJpZ2h0IHByb2dyYW1zLW1lbnUtaXRlbS1iYXNpYy10aXRsZS1pY29uLXBhZGRpbmcnIH0pXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGl0bGVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBQcm9ncmFtc01lbnVJdGVtQmFzaWM7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBQcm9ncmFtc01lbnVJdGVtQmFzaWM7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcycpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybicpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cycpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdFJlZHV4ID0gcmVxdWlyZSgncmVhY3QtcmVkdXgnKTtcblxudmFyIF9NZXNzYWdlQmFyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL21lc3NhZ2VCYXIvTWVzc2FnZUJhcicpO1xuXG52YXIgX01lc3NhZ2VCYXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTWVzc2FnZUJhcik7XG5cbnZhciBfTmF2aWdhdGlvbiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9uYXZpZ2F0aW9uL05hdmlnYXRpb24nKTtcblxudmFyIF9OYXZpZ2F0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX05hdmlnYXRpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgSGVhZGVyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShIZWFkZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gSGVhZGVyKHByb3BzKSB7XG4gICAgICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEhlYWRlcik7XG5cbiAgICAgICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoSGVhZGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoSGVhZGVyKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge307XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShIZWFkZXIsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge31cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICd3cmFwcGVyLWhlYWRlcicgfSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfTWVzc2FnZUJhcjIuZGVmYXVsdCwge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IF9faHRtbDogXCJQYXJlbnRzIE5vdGlmaWNhdGlvbjogRGVjZW1iZXIgMTMgaXMgQ2hyaXN0bWFzIHBpY3R1cmVzJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7ICA8YSBocmVmPScnPkRldGFpbHM8L2E+XCIgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9OYXZpZ2F0aW9uMi5kZWZhdWx0LCBudWxsKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gSGVhZGVyO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gICAgcmV0dXJuIHt9O1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSAoMCwgX3JlYWN0UmVkdXguY29ubmVjdCkobWFwU3RhdGVUb1Byb3BzLCB7fSkoSGVhZGVyKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuJyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzJyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBfcmVhY3REb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3REb20pO1xuXG52YXIgX3JlYWN0UmVkdXggPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgTmV3c0V2ZW50SXRlbSA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTmV3c0V2ZW50SXRlbSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBOZXdzRXZlbnRJdGVtKHByb3BzKSB7XG4gICAgICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE5ld3NFdmVudEl0ZW0pO1xuXG4gICAgICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE5ld3NFdmVudEl0ZW0uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihOZXdzRXZlbnRJdGVtKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge307XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShOZXdzRXZlbnRJdGVtLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHt9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMsXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ25ld3MtZXZlbnQtaXRlbS13cmFwcGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gTmV3c0V2ZW50SXRlbTtcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuICAgIHJldHVybiB7fTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9yZWFjdFJlZHV4LmNvbm5lY3QpKG1hcFN0YXRlVG9Qcm9wcywge30pKE5ld3NFdmVudEl0ZW0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbnZhciBfcmVhY3RTbGljayA9IHJlcXVpcmUoJ3JlYWN0LXNsaWNrJyk7XG5cbnZhciBfcmVhY3RTbGljazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdFNsaWNrKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIE5ld3NFdmVudHNDYXJvdXNlbCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTmV3c0V2ZW50c0Nhcm91c2VsLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIE5ld3NFdmVudHNDYXJvdXNlbChwcm9wcykge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBOZXdzRXZlbnRzQ2Fyb3VzZWwpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE5ld3NFdmVudHNDYXJvdXNlbC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE5ld3NFdmVudHNDYXJvdXNlbCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkb3RzQ2xhc3M6ICduZXdzLWV2ZW50cy1jYXJvdXNlbC1kb3RzJyxcbiAgICAgICAgICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMi4zLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICAgICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShOZXdzRXZlbnRzQ2Fyb3VzZWwsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge31cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQgY29udGFpbmVyLWZsdWlkLW5vLXBhZGRpbmcnIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ25ld3MtZXZlbnRzLWNhcm91c2VsLXdyYXBwZXInIH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NvbnRhaW5lcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICduZXdzLWV2ZW50cy1jYXJvdXNlbC10aXRsZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTmV3cyBhbmQgRXZlbnRzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnbmV3cy1ldmVudHMtY2Fyb3VzZWwtc2xpZGVyLXdyYXBwZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdFNsaWNrMi5kZWZhdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ25ld3MtZXZlbnRzLWNhcm91c2VsLXNsaWRlci13cmFwcGVyLWdyYWRpZW50JyB9KVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gTmV3c0V2ZW50c0Nhcm91c2VsO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gICAgcmV0dXJuIHt9O1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSAoMCwgX3JlYWN0UmVkdXguY29ubmVjdCkobWFwU3RhdGVUb1Byb3BzLCB7fSkoTmV3c0V2ZW50c0Nhcm91c2VsKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuJyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzJyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX0hlcm9JbWFnZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaGVyb0ltYWdlL0hlcm9JbWFnZScpO1xuXG52YXIgX0hlcm9JbWFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9IZXJvSW1hZ2UpO1xuXG52YXIgX1RocmVlQm94Q2FsbG91dCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvdGhyZWVCb3hDYWxsb3V0L1RocmVlQm94Q2FsbG91dCcpO1xuXG52YXIgX1RocmVlQm94Q2FsbG91dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9UaHJlZUJveENhbGxvdXQpO1xuXG52YXIgX0NvbnRhY3RGb3JtID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb250YWN0Rm9ybS9Db250YWN0Rm9ybScpO1xuXG52YXIgX0NvbnRhY3RGb3JtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbnRhY3RGb3JtKTtcblxudmFyIF9OZXdzRXZlbnRzQ2Fyb3VzZWwgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbmV3c0V2ZW50c0Nhcm91c2VsL05ld3NFdmVudHNDYXJvdXNlbCcpO1xuXG52YXIgX05ld3NFdmVudHNDYXJvdXNlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OZXdzRXZlbnRzQ2Fyb3VzZWwpO1xuXG52YXIgX05ld3NFdmVudEl0ZW0gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbmV3c0V2ZW50SXRlbS9OZXdzRXZlbnRJdGVtJyk7XG5cbnZhciBfTmV3c0V2ZW50SXRlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OZXdzRXZlbnRJdGVtKTtcblxudmFyIF9DYWxsb3V0Qm94ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jYWxsb3V0Qm94L0NhbGxvdXRCb3gnKTtcblxudmFyIF9DYWxsb3V0Qm94MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NhbGxvdXRCb3gpO1xuXG52YXIgX3BhZ2UgPSByZXF1aXJlKCcuLi8uLi9jb25maWcvYWN0aW9ucy9wYWdlJyk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBIb21lUGFnZSA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoSG9tZVBhZ2UsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gSG9tZVBhZ2UocHJvcHMpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgSG9tZVBhZ2UpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKEhvbWVQYWdlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoSG9tZVBhZ2UpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEhvbWVQYWdlLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnRXaWxsTW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5yZXF1ZXN0UGFnZSh0aGlzLnByb3BzLnBhdGgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHt9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIGh0bWwgPSBudWxsO1xuICAgICAgICAgICAgaWYgKCEhdGhpcy5wcm9wcy5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSB0aGlzLnByb3BzLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaHRtbCA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBfSGVyb0ltYWdlMi5kZWZhdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBoZWlnaHQ6IGMudG9wSGVyby5iYWNrZ3JvdW5kSW1hZ2UuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYy50b3BIZXJvLmJhY2tncm91bmRJbWFnZS5zcmMgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY29udGFpbmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdyb3cnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NvbC1zbS0xMSBjb2wtbGctcHVzaC0xJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2gxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2hlcm8tdGl0bGUtaG9tZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnRvcEhlcm8udGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0biBidG4tcHJpbWFyeSBoZXJvLXRpdGxlLWhvbWUtYnRuJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMudG9wSGVyby5idXR0b24udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgIF9UaHJlZUJveENhbGxvdXQyLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3RocmVlLWJveC1jYWxsb3V0LWhvbWUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQ2FsbG91dEJveDIuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3RocmVlLWJveC1jYWxsb3V0LWJveCB0aHJlZS1ib3gtY2FsbG91dC1ib3gtbGVmdCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2gyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy50aHJlZUJveENhbGxvdXQuYm94MS50aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHsgc3JjOiBjLnRocmVlQm94Q2FsbG91dC5ib3gxLmltYWdlLnNyYywgYWx0OiBjLnRocmVlQm94Q2FsbG91dC5ib3gxLmltYWdlLmFsdCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnRocmVlQm94Q2FsbG91dC5ib3gxLnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX0NhbGxvdXRCb3gyLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICd0aHJlZS1ib3gtY2FsbG91dC1ib3ggdGhyZWUtYm94LWNhbGxvdXQtYm94LWNlbnRlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2gyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy50aHJlZUJveENhbGxvdXQuYm94Mi50aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHsgc3JjOiBjLnRocmVlQm94Q2FsbG91dC5ib3gyLmltYWdlLnNyYywgYWx0OiBjLnRocmVlQm94Q2FsbG91dC5ib3gyLmltYWdlLmFsdCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnRocmVlQm94Q2FsbG91dC5ib3gyLnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX0NhbGxvdXRCb3gyLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICd0aHJlZS1ib3gtY2FsbG91dC1ib3ggdGhyZWUtYm94LWNhbGxvdXQtYm94LXJpZ2h0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnRocmVlQm94Q2FsbG91dC5ib3gzLnRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfQ29udGFjdEZvcm0yLmRlZmF1bHQsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgX05ld3NFdmVudHNDYXJvdXNlbDIuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZE5ld3NBbmRFdmVudHMoYy5uZXdzQW5kRXZlbnRzKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgIF9IZXJvSW1hZ2UyLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGhlaWdodDogYy5oZXJvTWlzc2lvblN0YXRlbWVudC5iYWNrZ3JvdW5kSW1hZ2UuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYy5oZXJvTWlzc2lvblN0YXRlbWVudC5iYWNrZ3JvdW5kSW1hZ2Uuc3JjIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NvbnRhaW5lcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX0NhbGxvdXRCb3gyLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY2FsbG91dC1ib3gtaG9tZS1taXNzaW9uLXN0YXRlbWVudCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuaGVyb01pc3Npb25TdGF0ZW1lbnQudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAndGV4dC1ob21lLW1pc3Npb24tc3RhdGVtZW50JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuaGVyb01pc3Npb25TdGF0ZW1lbnQuYm9keVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdidG4gYnRuLXByaW1hcnknIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLmhlcm9NaXNzaW9uU3RhdGVtZW50LmJ1dHRvbi50ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gSG9tZVBhZ2U7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5mdW5jdGlvbiBidWlsZE5ld3NBbmRFdmVudHMobmFlKSB7XG4gICAgdmFyIG5ld3NBbmRFdmVudHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYm9keSA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ3AnLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIG5hZVtpXS5ib2R5XG4gICAgICAgICk7XG4gICAgICAgIGlmIChuYWVbaV0ucmF3SHRtbCkge1xuICAgICAgICAgICAgYm9keSA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdwJywgeyBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6IG5hZVtpXS5ib2R5IH0gfSk7XG4gICAgICAgIH1cblxuICAgICAgICBuZXdzQW5kRXZlbnRzLnB1c2goX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBfTmV3c0V2ZW50SXRlbTIuZGVmYXVsdCxcbiAgICAgICAgICAgIHsga2V5OiBpIH0sXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnaDInLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgbmFlW2ldLnRpdGxlXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2g0JyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIG5hZVtpXS5kYXRlXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2hyJywgbnVsbCksXG4gICAgICAgICAgICBib2R5XG4gICAgICAgICkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3c0FuZEV2ZW50cztcbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gICAgdmFyIGNvbnRlbnQgPSBudWxsO1xuICAgIHZhciBwYXRoID0gXCIvXCI7XG4gICAgdmFyIHBhZ2UgPSBzdGF0ZS5wYWdlW3BhdGhdO1xuICAgIGlmICghIXBhZ2UgJiYgISFwYWdlLmNvbnRlbnQpIHtcbiAgICAgICAgY29udGVudCA9IHBhZ2UuY29udGVudDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgcGF0aDogcGF0aFxuICAgIH07XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9ICgwLCBfcmVhY3RSZWR1eC5jb25uZWN0KShtYXBTdGF0ZVRvUHJvcHMsIHtcbiAgICByZXF1ZXN0UGFnZTogX3BhZ2UucmVxdWVzdFBhZ2Vcbn0pKEhvbWVQYWdlKTtcbiIsIi8vIGV4cG9ydCBjb25zdCBwYWdlQnlVcmlTZWxlY3RvciA9IHN0YXRlID0+IHN0YXRlLnBhZ2VCeVVyaTtcblwidXNlIHN0cmljdFwiO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xuXG52YXIgX2hvbWVQYWdlID0gcmVxdWlyZSgnLi9ob21lUGFnZS5jb250YWluZXInKTtcblxudmFyIF9ob21lUGFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ob21lUGFnZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFJvdXRlci5JbmRleFJvdXRlLCB7IGNvbXBvbmVudDogX2hvbWVQYWdlMi5kZWZhdWx0IH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmdldFN0b3JlID0gZ2V0U3RvcmU7XG52YXIgdGhlbWUgPSByZXF1aXJlKCcuL2NvbmZpZy9pbml0Jyk7XG5cbmZ1bmN0aW9uIGdldFN0b3JlKCkge1xuICAgIHJldHVybiB0aGVtZS5nZXRTdG9yZSgpO1xufVxuLy8gZXhwb3J0IG1haW4gZnVuY3Rpb24gZm9yIHNlcnZlciBzaWRlIHJlbmRlcmluZ1xuLy8gZXhwb3J0IGRlZmF1bHQgYXBwLnJlbmRlclRvU3RyaW5nRm9yU2VydmVyKGZ1bmN0aW9uKHJlc3VsdCkge1xuLy8gICAgIFwidXNlIHN0cmljdFwiO1xuLy8gICAgIHJldHVybiByZXN1bHRcbi8vIH0pO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBTdGFydCBtYWluIGFwcGxpY2F0aW9uIGhlcmVcbiAgICB0aGVtZS5ydW4oKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Qb3N0ID0gdW5kZWZpbmVkO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxuZXhwb3J0cy5HZXQgPSBHZXQ7XG5cbnZhciBfaXNvbW9ycGhpY0ZldGNoID0gcmVxdWlyZSgnaXNvbW9ycGhpYy1mZXRjaCcpO1xuXG52YXIgX2lzb21vcnBoaWNGZXRjaDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc29tb3JwaGljRmV0Y2gpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfSxcbiAgICBtb2RlOiAnY29ycycsXG4gICAgY2FjaGU6ICdkZWZhdWx0J1xufTtcblxudmFyIEFwaSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcGkodXJsLCBvcHRpb25zKSB7XG4gICAgICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEFwaSk7XG5cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmZldGNoID0gX2lzb21vcnBoaWNGZXRjaDIuZGVmYXVsdDtcbiAgICB9XG5cbiAgICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShBcGksIFt7XG4gICAgICAgIGtleTogJ2NhbGxBcGknLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2FsbEFwaSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZldGNoKHRoaXMudXJsLCB0aGlzLm9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09IDIwMCB8fCByZXMuc3RhdHVzID09IDIwNCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlcy5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAvLyBzdWNjZXNzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmVzOiByZXMgfTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyBmYWlsXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyOiBlcnIgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBBcGk7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEFwaTtcblxudmFyIFBvc3QgPSBleHBvcnRzLlBvc3QgPSBmdW5jdGlvbiAoX0FwaSkge1xuICAgICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFBvc3QsIF9BcGkpO1xuXG4gICAgZnVuY3Rpb24gUG9zdCh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgUG9zdCk7XG5cbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyBtZXRob2Q6ICdQT1NUJyB9LCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFBvc3QuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihQb3N0KSkuY2FsbCh0aGlzLCB1cmwsIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUG9zdDtcbn0oQXBpKTtcblxuZnVuY3Rpb24gR2V0KHVyaSkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IEFwaSh1cmksIG9wdGlvbnMpLmNhbGxBcGkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuJyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzJyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0UmVkdXggPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpO1xuXG52YXIgX2hlYWRlciA9IHJlcXVpcmUoJy4uL2NvbnRhaW5lcnMvaGVhZGVyL2hlYWRlci5jb250YWluZXInKTtcblxudmFyIF9oZWFkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGVhZGVyKTtcblxudmFyIF9mb290ZXIgPSByZXF1aXJlKCcuLi9jb250YWluZXJzL2Zvb3Rlci9mb290ZXIuY29udGFpbmVyJyk7XG5cbnZhciBfZm9vdGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zvb3Rlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBEZWZhdWx0VGVtcGxhdGUgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERlZmF1bHRUZW1wbGF0ZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBEZWZhdWx0VGVtcGxhdGUocHJvcHMpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRGVmYXVsdFRlbXBsYXRlKTtcbiAgICAgICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERlZmF1bHRUZW1wbGF0ZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERlZmF1bHRUZW1wbGF0ZSkpLmNhbGwodGhpcywgcHJvcHMpKTtcbiAgICB9XG5cbiAgICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEZWZhdWx0VGVtcGxhdGUsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAgICAgdmFyIGxvYWRlclN0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2FkZXItcGFnZS13cmFwcGVyXCIpLnN0eWxlO1xuICAgICAgICAgICAgdmFyIGFwcFN0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikuc3R5bGU7XG4gICAgICAgICAgICBhcHBTdHlsZS5vdmVyZmxvd1kgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgLy8gd2FpdCBmb3IgZW50aXJlIGRvbSB0byBmaW5pc2ggYW5kIHRoZW4gZmFkZSBsb2FkaW5nIHNjcmVlbi5cbiAgICAgICAgICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRlclN0eWxlLm9wYWNpdHkgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFmdGVyIGZhZGUgc3RhcnQgd2UgY2FuIGZhZGUgaW4gYWN0dWFsIHNpdGVcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBTdHlsZS5vdmVyZmxvd1kgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwU3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyNTApO1xuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgICAgICAvLyBvbmNlIGxvYWRpbmcgc2NyZWVuIGlzIGNvbXBsZXRlbHkgZ29uZSB3ZSBjYW4gcmVtb3ZlIGl0IGZyb20gZG9tIHZpZXdcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkZXJTdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgIH0sIDc1MCk7XG4gICAgICAgICAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnaGlkZGVuLXhzIGhpZGRlbi1zbScgfSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX2hlYWRlcjIuZGVmYXVsdCwgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCBjb250YWluZXItZmx1aWQtbm8tcGFkZGluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX2Zvb3RlcjIuZGVmYXVsdCwgbnVsbClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdoaWRkZW4tbWQgaGlkZGVuLWxnJyB9LFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdoMScsXG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ01vYmlsZSBTaXRlIE5vdCBDcmVhdGVkLidcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIERlZmF1bHRUZW1wbGF0ZTtcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbkRlZmF1bHRUZW1wbGF0ZS5wcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMubm9kZVxufTtcblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcykge1xuICAgIHJldHVybiB7fTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9yZWFjdFJlZHV4LmNvbm5lY3QpKG1hcFN0YXRlVG9Qcm9wcywge30pKERlZmF1bHRUZW1wbGF0ZSk7XG4iXX0=