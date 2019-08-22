import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import PropTypes from 'prop-types';
import BaseControl from './base-control';
const propTypes = Object.assign({}, BaseControl.propTypes, {
  draggable: PropTypes.bool,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number
});
const defaultProps = Object.assign({}, BaseControl.defaultProps, {
  draggable: false,
  offsetLeft: 0,
  offsetTop: 0
});
export default class DraggableControl extends BaseControl {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      dragPos: null,
      dragOffset: null
    });

    _defineProperty(this, "_dragEvents", null);

    _defineProperty(this, "_onDragStart", event => {
      const _this$props = this.props,
            draggable = _this$props.draggable,
            captureDrag = _this$props.captureDrag;

      if (draggable || captureDrag) {
        event.stopPropagation();
      }

      if (!draggable) {
        return;
      }

      const dragPos = this._getDragEventPosition(event);

      const dragOffset = this._getDragEventOffset(event);

      this.setState({
        dragPos,
        dragOffset
      });

      this._setupDragEvents();

      const onDragStart = this.props.onDragStart;

      if (onDragStart && dragOffset) {
        const callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = this._getDragLngLat(dragPos, dragOffset);
        onDragStart(callbackEvent);
      }
    });

    _defineProperty(this, "_onDrag", event => {
      event.stopPropagation();

      const dragPos = this._getDragEventPosition(event);

      this.setState({
        dragPos
      });
      const onDrag = this.props.onDrag;
      const dragOffset = this.state.dragOffset;

      if (onDrag && dragOffset) {
        const callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = this._getDragLngLat(dragPos, dragOffset);
        onDrag(callbackEvent);
      }
    });

    _defineProperty(this, "_onDragEnd", event => {
      const _this$state = this.state,
            dragPos = _this$state.dragPos,
            dragOffset = _this$state.dragOffset;
      event.stopPropagation();
      this.setState({
        dragPos: null,
        dragOffset: null
      });

      this._removeDragEvents();

      const onDragEnd = this.props.onDragEnd;

      if (onDragEnd && dragPos && dragOffset) {
        const callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = this._getDragLngLat(dragPos, dragOffset);
        onDragEnd(callbackEvent);
      }
    });

    _defineProperty(this, "_onDragCancel", event => {
      event.stopPropagation();
      this.setState({
        dragPos: null,
        dragOffset: null
      });

      this._removeDragEvents();
    });
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this._removeDragEvents();
  }

  _setupDragEvents() {
    const eventManager = this._context.eventManager;

    if (!eventManager) {
      return;
    }

    this._dragEvents = {
      panmove: this._onDrag,
      panend: this._onDragEnd,
      pancancel: this._onDragCancel
    };
    eventManager.on(this._dragEvents);
  }

  _removeDragEvents() {
    const eventManager = this._context.eventManager;

    if (!eventManager || !this._dragEvents) {
      return;
    }

    eventManager.off(this._dragEvents);
    this._dragEvents = null;
  }

  _getDragEventPosition(event) {
    const _event$offsetCenter = event.offsetCenter,
          x = _event$offsetCenter.x,
          y = _event$offsetCenter.y;
    return [x, y];
  }

  _getDragEventOffset(event) {
    const _event$center = event.center,
          x = _event$center.x,
          y = _event$center.y;
    const container = this._containerRef.current;

    if (container) {
      const rect = container.getBoundingClientRect();
      return [rect.left - x, rect.top - y];
    }

    return null;
  }

  _getDraggedPosition(dragPos, dragOffset) {
    return [dragPos[0] + dragOffset[0], dragPos[1] + dragOffset[1]];
  }

  _getDragLngLat(dragPos, dragOffset) {
    const _this$props2 = this.props,
          offsetLeft = _this$props2.offsetLeft,
          offsetTop = _this$props2.offsetTop;

    const _this$_getDraggedPosi = this._getDraggedPosition(dragPos, dragOffset),
          _this$_getDraggedPosi2 = _slicedToArray(_this$_getDraggedPosi, 2),
          x = _this$_getDraggedPosi2[0],
          y = _this$_getDraggedPosi2[1];

    return this._context.viewport.unproject([x - offsetLeft, y - offsetTop]);
  }

}

_defineProperty(DraggableControl, "propTypes", propTypes);

_defineProperty(DraggableControl, "defaultProps", defaultProps);
//# sourceMappingURL=draggable-control.js.map