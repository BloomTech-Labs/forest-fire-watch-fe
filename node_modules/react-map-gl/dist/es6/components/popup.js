import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement, createRef } from 'react';
import PropTypes from 'prop-types';
import BaseControl from './base-control';
import { getDynamicPosition, ANCHOR_POSITION } from '../utils/dynamic-position';
const propTypes = Object.assign({}, BaseControl.propTypes, {
  className: PropTypes.string,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  altitude: PropTypes.number,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number,
  tipSize: PropTypes.number,
  closeButton: PropTypes.bool,
  closeOnClick: PropTypes.bool,
  anchor: PropTypes.oneOf(Object.keys(ANCHOR_POSITION)),
  dynamicPosition: PropTypes.bool,
  sortByDepth: PropTypes.bool,
  onClose: PropTypes.func
});
const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  className: '',
  altitude: 0,
  offsetLeft: 0,
  offsetTop: 0,
  tipSize: 10,
  anchor: 'bottom',
  dynamicPosition: true,
  sortByDepth: false,
  closeButton: true,
  closeOnClick: true,
  onClose: () => {}
});
export default class Popup extends BaseControl {
  constructor() {
    super(...arguments);

    _defineProperty(this, "_closeOnClick", false);

    _defineProperty(this, "_contentRef", createRef());

    _defineProperty(this, "_onClick", evt => {
      if (this.props.captureClick) {
        evt.stopPropagation();
      }

      if (this.props.closeOnClick || evt.target.className === 'mapboxgl-popup-close-button') {
        this.props.onClose();
        const eventManager = this._context.eventManager;

        if (eventManager) {
          eventManager.once('click', e => e.stopPropagation(), evt.target);
        }
      }
    });
  }

  componentDidMount() {
    super.componentDidMount();
    this.forceUpdate();
  }

  _getPosition(x, y) {
    const viewport = this._context.viewport;
    const _this$props = this.props,
          anchor = _this$props.anchor,
          dynamicPosition = _this$props.dynamicPosition,
          tipSize = _this$props.tipSize;
    const content = this._contentRef.current;

    if (content) {
      return dynamicPosition ? getDynamicPosition({
        x,
        y,
        anchor,
        padding: tipSize,
        width: viewport.width,
        height: viewport.height,
        selfWidth: content.clientWidth,
        selfHeight: content.clientHeight
      }) : anchor;
    }

    return anchor;
  }

  _getContainerStyle(x, y, z, positionType) {
    const viewport = this._context.viewport;
    const _this$props2 = this.props,
          offsetLeft = _this$props2.offsetLeft,
          offsetTop = _this$props2.offsetTop,
          sortByDepth = _this$props2.sortByDepth;
    const anchorPosition = ANCHOR_POSITION[positionType];
    const left = x + offsetLeft;
    const top = y + offsetTop;
    const style = {
      position: 'absolute',
      transform: "\n        translate(".concat(-anchorPosition.x * 100, "%, ").concat(-anchorPosition.y * 100, "%)\n        translate(").concat(left, "px, ").concat(top, "px)\n      "),
      display: undefined,
      zIndex: undefined
    };

    if (!sortByDepth) {
      return style;
    }

    if (z > 1 || z < -1 || x < 0 || x > viewport.width || y < 0 || y > viewport.height) {
      style.display = 'none';
    } else {
      style.zIndex = Math.floor((1 - z) / 2 * 100000);
    }

    return style;
  }

  _renderTip(positionType) {
    const tipSize = this.props.tipSize;
    return createElement('div', {
      key: 'tip',
      className: 'mapboxgl-popup-tip',
      style: {
        borderWidth: tipSize
      }
    });
  }

  _renderContent() {
    const _this$props3 = this.props,
          closeButton = _this$props3.closeButton,
          children = _this$props3.children;
    const onClick = this._context.eventManager ? null : this._onClick;
    return createElement('div', {
      key: 'content',
      ref: this._contentRef,
      className: 'mapboxgl-popup-content',
      onClick
    }, [closeButton && createElement('button', {
      key: 'close-button',
      className: 'mapboxgl-popup-close-button',
      type: 'button'
    }, '×'), children]);
  }

  _render() {
    const _this$props4 = this.props,
          className = _this$props4.className,
          longitude = _this$props4.longitude,
          latitude = _this$props4.latitude,
          altitude = _this$props4.altitude;

    const _this$_context$viewpo = this._context.viewport.project([longitude, latitude, altitude]),
          _this$_context$viewpo2 = _slicedToArray(_this$_context$viewpo, 3),
          x = _this$_context$viewpo2[0],
          y = _this$_context$viewpo2[1],
          z = _this$_context$viewpo2[2];

    const positionType = this._getPosition(x, y);

    const containerStyle = this._getContainerStyle(x, y, z, positionType);

    return createElement('div', {
      className: "mapboxgl-popup mapboxgl-popup-anchor-".concat(positionType, " ").concat(className),
      style: containerStyle,
      ref: this._containerRef
    }, [this._renderTip(positionType), this._renderContent()]);
  }

}

_defineProperty(Popup, "propTypes", propTypes);

_defineProperty(Popup, "defaultProps", defaultProps);
//# sourceMappingURL=popup.js.map