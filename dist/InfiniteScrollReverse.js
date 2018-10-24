"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfiniteScrollReverse = function (_Component) {
  _inherits(InfiniteScrollReverse, _Component);

  function InfiniteScrollReverse() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InfiniteScrollReverse);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InfiniteScrollReverse.__proto__ || Object.getPrototypeOf(InfiniteScrollReverse)).call.apply(_ref, [this].concat(args))), _this), _this.infinteRef = _react2.default.createRef(), _this.state = {
      currentPage: 1,
      scrollPosition: 0
    }, _this.loadMore = function () {
      // Handle scroll direction
      if (_this.infinteRef.current.scrollTop > _this.state.scrollPosition) {
        // Scroll bottom
      } else {
        // Check loadmore scroll area
        if (_this.infinteRef.current.scrollTop <= _this.props.loadArea && !_this.props.isLoading) {
          // Check for available data
          if (_this.props.hasMore) {
            // Run data fetching
            var nextPage = _this.state.currentPage + 1;
            _this.setState({ currentPage: nextPage });
            _this.props.loadMore(nextPage);
          }
        }
      }
      // Save event scroll position
      _this.setState({ scrollPosition: _this.infinteRef.current.scrollTop });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InfiniteScrollReverse, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Obtain data for first load
      // TODO obtain more data to get scroll more area
      this.props.loadMore(this.state.currentPage);
      this.infinteRef.current.addEventListener("scroll", this.loadMore);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.infinteRef.current.removeEventListener("scroll", this.loadMore);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Check childrens update
      if (prevProps.children.length !== this.props.children.length) {
        // Get available top scroll
        var availableScroll = this.infinteRef.current.scrollHeight - this.infinteRef.current.clientHeight;
        // Get motion for first page
        if (this.state.currentPage === 1) {
          // Move data to bottom for getting loadmore area
          if (availableScroll >= 0) {
            this.infinteRef.current.scrollTop = availableScroll;
          }
        } else {
          // Add scroll area for other pages
          if (this.props.hasMore) {
            this.infinteRef.current.scrollTop = this.infinteRef.current.clientHeight;
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: this.props.className, ref: this.infinteRef },
        this.props.children
      );
    }
  }]);

  return InfiniteScrollReverse;
}(_react.Component);

InfiniteScrollReverse.propTypes = {
  className: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.array,
  hasMore: _propTypes2.default.bool.isRequired,
  isLoading: _propTypes2.default.bool.isRequired,
  loadMore: _propTypes2.default.func.isRequired,
  loadArea: _propTypes2.default.number
};

InfiniteScrollReverse.defaultProps = {
  className: "InfiniteScrollReverse",
  children: [],
  loadArea: 10
};

exports.default = InfiniteScrollReverse;
module.exports = exports['default'];
