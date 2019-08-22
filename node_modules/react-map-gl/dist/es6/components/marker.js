import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from 'react';
import PropTypes from 'prop-types';
import DraggableControl from './draggable-control';
const propTypes = Object.assign({}, DraggableControl.propTypes, {
  className: PropTypes.string,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired
});
const defaultProps = Object.assign({}, DraggableControl.defaultProps, {
  className: ''
});
export default class Marker extends DraggableControl {
  _getPosition() {
    const _this$props = this.props,
          longitude = _this$props.longitude,
          latitude = _this$props.latitude,
          offsetLeft = _this$props.offsetLeft,
          offsetTop = _this$props.offsetTop;
    const _this$state = this.state,
          dragPos = _this$state.dragPos,
          dragOffset = _this$state.dragOffset;

    if (dragPos && dragOffset) {
      return this._getDraggedPosition(dragPos, dragOffset);
    }

    let _this$_context$viewpo = this._context.viewport.project([longitude, latitude]),
        _this$_context$viewpo2 = _slicedToArray(_this$_context$viewpo, 2),
        x = _this$_context$viewpo2[0],
        y = _this$_context$viewpo2[1];

    x += offsetLeft;
    y += offsetTop;
    return [x, y];
  }

  _render() {
    const _this$props2 = this.props,
          className = _this$props2.className,
          draggable = _this$props2.draggable;
    const dragPos = this.state.dragPos;

    const _this$_getPosition = this._getPosition(),
          _this$_getPosition2 = _slicedToArray(_this$_getPosition, 2),
          x = _this$_getPosition2[0],
          y = _this$_getPosition2[1];

    const containerStyle = {
      position: 'absolute',
      left: x,
      top: y,
      cursor: draggable ? dragPos ? 'grabbing' : 'grab' : 'auto'
    };
    return createElement('div', {
      className: "mapboxgl-marker ".concat(className),
      ref: this._containerRef,
      style: containerStyle,
      children: this.props.children
    });
  }

}

_defineProperty(Marker, "propTypes", propTypes);

_defineProperty(Marker, "defaultProps", defaultProps);
//# sourceMappingURL=marker.js.map