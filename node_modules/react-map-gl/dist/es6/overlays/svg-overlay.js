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
export default class SVGOverlay extends BaseControl {
  _render() {
    const _this$_context = this._context,
          viewport = _this$_context.viewport,
          isDragging = _this$_context.isDragging;
    const style = Object.assign({
      position: 'absolute',
      left: 0,
      top: 0
    }, this.props.style);
    return createElement('svg', {
      width: viewport.width,
      height: viewport.height,
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

_defineProperty(SVGOverlay, "propTypes", propTypes);

_defineProperty(SVGOverlay, "defaultProps", defaultProps);
//# sourceMappingURL=svg-overlay.js.map