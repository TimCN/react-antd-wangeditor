'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _wangeditor = require('wangeditor');

var _wangeditor2 = _interopRequireDefault(_wangeditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_Component) {
  _inherits(Editor, _Component);

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

    _this.onEditorChange = function (html) {

      html = html || _this.__editor__.$txt.html();
      _this.setState({
        content: html
      }, function () {
        _this.props.onChange && _this.props.onChange(html);
      });
    };

    _this.html = function () {
      return _this.__editor__.$txt.html();
    };

    _this.clear = function () {
      _this.__editor__.$txt.html('');
    };

    _this.disable = function () {
      _this.__editor__.$textElem.attr('contenteditable', false);
    };

    _this.enable = function () {
      _this.__editor__.$textElem.attr('contenteditable', true);
    };

    _this.state = {
      content: props.value || ''
    };
    return _this;
  }

  // static propTypes = {
  //   onChange: T.func,
  //   value: T.string,
  //   style: T.object,     // height & width
  // }

  _createClass(Editor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.value && nextProps.value) {
        this.__editor__.$txt.html(nextProps.value);
        this.onEditorChange(nextProps.value);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.__editor__ = new _wangeditor2.default(this.editorElem);

      // only for 2.x|1.x
      this.__editor__.onchange = this.onEditorChange;
      var _props = this.props,
          config = _props.config,
          value = _props.value;

      if (config) {
        Object.keys(config).forEach(function (key) {
          _this2.__editor__.config[key] = config[key];
        });
      }
      this.__editor__.create();

      // init
      if (value) {
        this.__editor__.$txt.html(value);
        this.onEditorChange(value);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.__editor__ = null;
      delete this.__editor__;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var style = this.props.style;


      return _react2.default.createElement('div', { className: 'react-antd-wangeditor', ref: function ref(el) {
          return _this3.editorElem = el;
        }, style: style });
    }

    // api

  }]);

  return Editor;
}(_react.Component);

Editor.defaultProps = {
  style: {
    height: 200,
    width: 700
  }
};
exports.default = Editor;
module.exports = exports['default'];