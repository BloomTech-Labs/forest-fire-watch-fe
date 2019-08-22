import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import WebMercatorViewport, { normalizeViewportProps } from 'viewport-mercator-project';
import { TransitionInterpolator } from './transition';
import { clamp } from './math-utils';
import assert from './assert';
export const MAPBOX_LIMITS = {
  minZoom: 0,
  maxZoom: 24,
  minPitch: 0,
  maxPitch: 60
};
const DEFAULT_STATE = {
  pitch: 0,
  bearing: 0,
  altitude: 1.5
};
export default class MapState {
  constructor(_ref) {
    let width = _ref.width,
        height = _ref.height,
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        zoom = _ref.zoom,
        _ref$bearing = _ref.bearing,
        bearing = _ref$bearing === void 0 ? DEFAULT_STATE.bearing : _ref$bearing,
        _ref$pitch = _ref.pitch,
        pitch = _ref$pitch === void 0 ? DEFAULT_STATE.pitch : _ref$pitch,
        _ref$altitude = _ref.altitude,
        altitude = _ref$altitude === void 0 ? DEFAULT_STATE.altitude : _ref$altitude,
        _ref$maxZoom = _ref.maxZoom,
        maxZoom = _ref$maxZoom === void 0 ? MAPBOX_LIMITS.maxZoom : _ref$maxZoom,
        _ref$minZoom = _ref.minZoom,
        minZoom = _ref$minZoom === void 0 ? MAPBOX_LIMITS.minZoom : _ref$minZoom,
        _ref$maxPitch = _ref.maxPitch,
        maxPitch = _ref$maxPitch === void 0 ? MAPBOX_LIMITS.maxPitch : _ref$maxPitch,
        _ref$minPitch = _ref.minPitch,
        minPitch = _ref$minPitch === void 0 ? MAPBOX_LIMITS.minPitch : _ref$minPitch,
        transitionDuration = _ref.transitionDuration,
        transitionEasing = _ref.transitionEasing,
        transitionInterpolator = _ref.transitionInterpolator,
        transitionInterruption = _ref.transitionInterruption,
        startPanLngLat = _ref.startPanLngLat,
        startZoomLngLat = _ref.startZoomLngLat,
        startBearing = _ref.startBearing,
        startPitch = _ref.startPitch,
        startZoom = _ref.startZoom;

    _defineProperty(this, "_viewportProps", void 0);

    _defineProperty(this, "_interactiveState", void 0);

    assert(Number.isFinite(width), '`width` must be supplied');
    assert(Number.isFinite(height), '`height` must be supplied');
    assert(Number.isFinite(longitude), '`longitude` must be supplied');
    assert(Number.isFinite(latitude), '`latitude` must be supplied');
    assert(Number.isFinite(zoom), '`zoom` must be supplied');
    this._viewportProps = this._applyConstraints({
      width,
      height,
      latitude,
      longitude,
      zoom,
      bearing,
      pitch,
      altitude,
      maxZoom,
      minZoom,
      maxPitch,
      minPitch,
      transitionDuration,
      transitionEasing,
      transitionInterpolator,
      transitionInterruption
    });
    this._interactiveState = {
      startPanLngLat,
      startZoomLngLat,
      startBearing,
      startPitch,
      startZoom
    };
  }

  getViewportProps() {
    return this._viewportProps;
  }

  getInteractiveState() {
    return this._interactiveState;
  }

  panStart(_ref2) {
    let pos = _ref2.pos;
    return this._getUpdatedMapState({
      startPanLngLat: this._unproject(pos)
    });
  }

  pan(_ref3) {
    let pos = _ref3.pos,
        startPos = _ref3.startPos;

    const startPanLngLat = this._interactiveState.startPanLngLat || this._unproject(startPos);

    if (!startPanLngLat) {
      return this;
    }

    const _this$_calculateNewLn = this._calculateNewLngLat({
      startPanLngLat,
      pos
    }),
          _this$_calculateNewLn2 = _slicedToArray(_this$_calculateNewLn, 2),
          longitude = _this$_calculateNewLn2[0],
          latitude = _this$_calculateNewLn2[1];

    return this._getUpdatedMapState({
      longitude,
      latitude
    });
  }

  panEnd() {
    return this._getUpdatedMapState({
      startPanLngLat: null
    });
  }

  rotateStart(_ref4) {
    let pos = _ref4.pos;
    return this._getUpdatedMapState({
      startBearing: this._viewportProps.bearing,
      startPitch: this._viewportProps.pitch
    });
  }

  rotate(_ref5) {
    let _ref5$deltaScaleX = _ref5.deltaScaleX,
        deltaScaleX = _ref5$deltaScaleX === void 0 ? 0 : _ref5$deltaScaleX,
        _ref5$deltaScaleY = _ref5.deltaScaleY,
        deltaScaleY = _ref5$deltaScaleY === void 0 ? 0 : _ref5$deltaScaleY;
    const _this$_interactiveSta = this._interactiveState,
          startBearing = _this$_interactiveSta.startBearing,
          startPitch = _this$_interactiveSta.startPitch;

    if (!Number.isFinite(startBearing) || !Number.isFinite(startPitch)) {
      return this;
    }

    const _this$_calculateNewPi = this._calculateNewPitchAndBearing({
      deltaScaleX,
      deltaScaleY,
      startBearing: startBearing || 0,
      startPitch: startPitch || 0
    }),
          pitch = _this$_calculateNewPi.pitch,
          bearing = _this$_calculateNewPi.bearing;

    return this._getUpdatedMapState({
      bearing,
      pitch
    });
  }

  rotateEnd() {
    return this._getUpdatedMapState({
      startBearing: null,
      startPitch: null
    });
  }

  zoomStart(_ref6) {
    let pos = _ref6.pos;
    return this._getUpdatedMapState({
      startZoomLngLat: this._unproject(pos),
      startZoom: this._viewportProps.zoom
    });
  }

  zoom(_ref7) {
    let pos = _ref7.pos,
        startPos = _ref7.startPos,
        scale = _ref7.scale;
    assert(scale > 0, '`scale` must be a positive number');
    let _this$_interactiveSta2 = this._interactiveState,
        startZoom = _this$_interactiveSta2.startZoom,
        startZoomLngLat = _this$_interactiveSta2.startZoomLngLat;

    if (!Number.isFinite(startZoom)) {
      startZoom = this._viewportProps.zoom;
      startZoomLngLat = this._unproject(startPos) || this._unproject(pos);
    }

    assert(startZoomLngLat, '`startZoomLngLat` prop is required ' + 'for zoom behavior to calculate where to position the map.');

    const zoom = this._calculateNewZoom({
      scale,
      startZoom: startZoom || 0
    });

    const zoomedViewport = new WebMercatorViewport(Object.assign({}, this._viewportProps, {
      zoom
    }));

    const _zoomedViewport$getMa = zoomedViewport.getMapCenterByLngLatPosition({
      lngLat: startZoomLngLat,
      pos
    }),
          _zoomedViewport$getMa2 = _slicedToArray(_zoomedViewport$getMa, 2),
          longitude = _zoomedViewport$getMa2[0],
          latitude = _zoomedViewport$getMa2[1];

    return this._getUpdatedMapState({
      zoom,
      longitude,
      latitude
    });
  }

  zoomEnd() {
    return this._getUpdatedMapState({
      startZoomLngLat: null,
      startZoom: null
    });
  }

  _getUpdatedMapState(newProps) {
    return new MapState(Object.assign({}, this._viewportProps, this._interactiveState, newProps));
  }

  _applyConstraints(props) {
    const maxZoom = props.maxZoom,
          minZoom = props.minZoom,
          zoom = props.zoom;
    props.zoom = clamp(zoom, minZoom, maxZoom);
    const maxPitch = props.maxPitch,
          minPitch = props.minPitch,
          pitch = props.pitch;
    props.pitch = clamp(pitch, minPitch, maxPitch);
    Object.assign(props, normalizeViewportProps(props));
    return props;
  }

  _unproject(pos) {
    const viewport = new WebMercatorViewport(this._viewportProps);
    return pos && viewport.unproject(pos);
  }

  _calculateNewLngLat(_ref8) {
    let startPanLngLat = _ref8.startPanLngLat,
        pos = _ref8.pos;
    const viewport = new WebMercatorViewport(this._viewportProps);
    return viewport.getMapCenterByLngLatPosition({
      lngLat: startPanLngLat,
      pos
    });
  }

  _calculateNewZoom(_ref9) {
    let scale = _ref9.scale,
        startZoom = _ref9.startZoom;
    const _this$_viewportProps = this._viewportProps,
          maxZoom = _this$_viewportProps.maxZoom,
          minZoom = _this$_viewportProps.minZoom;
    const zoom = startZoom + Math.log2(scale);
    return clamp(zoom, minZoom, maxZoom);
  }

  _calculateNewPitchAndBearing(_ref10) {
    let deltaScaleX = _ref10.deltaScaleX,
        deltaScaleY = _ref10.deltaScaleY,
        startBearing = _ref10.startBearing,
        startPitch = _ref10.startPitch;
    deltaScaleY = clamp(deltaScaleY, -1, 1);
    const _this$_viewportProps2 = this._viewportProps,
          minPitch = _this$_viewportProps2.minPitch,
          maxPitch = _this$_viewportProps2.maxPitch;
    const bearing = startBearing + 180 * deltaScaleX;
    let pitch = startPitch;

    if (deltaScaleY > 0) {
      pitch = startPitch + deltaScaleY * (maxPitch - startPitch);
    } else if (deltaScaleY < 0) {
      pitch = startPitch - deltaScaleY * (minPitch - startPitch);
    }

    return {
      pitch,
      bearing
    };
  }

}
//# sourceMappingURL=map-state.js.map