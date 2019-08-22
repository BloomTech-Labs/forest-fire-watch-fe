import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from 'react';
import PropTypes from 'prop-types';
import BaseControl from '../components/base-control';
const propTypes = Object.assign({}, BaseControl.propTypes, {
  redraw: PropTypes.func.isRequired,
  style: PropTypes.object
});
const defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};
export default class HTMLOverlay extends BaseControl {
  _render() {
    const _this$_context = this._context,
          viewport = _this$_context.viewport,
          isDragging = _this$_context.isDragging;
    const style = Object.assign({
      position: 'absolute',
      left: 0,
      top: 0,
      width: viewport.width,
      height: viewport.height
    }, this.props.style);
    return createElement('div', {
      ref: this._containerRef,
      style
    }, this.props.redraw({
      width: viewport.width,
      height: viewport.height,
      isDragging,
      project: viewport.project.bind(viewport),
      unproject: viewport.unproject.bind(viewport)
    }));
  }

}

_defineProperty(HTMLOverlay, "propTypes", propTypes);

_defineProperty(HTMLOverlay, "defaultProps", defaultProps);
//# sourceMappingURL=html-overlay.js.map