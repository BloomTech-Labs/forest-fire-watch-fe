import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { PureComponent, createElement, createRef } from 'react';
import PropTypes from 'prop-types';
import { normalizeStyle } from '../utils/style-utils';
import WebMercatorViewport from 'viewport-mercator-project';
import AutoSizer from 'react-virtualized-auto-sizer';
import Mapbox from '../mapbox/mapbox';
import mapboxgl from '../utils/mapboxgl';
import { checkVisibilityConstraints } from '../utils/map-constraints';
import { MAPBOX_LIMITS } from '../utils/map-state';
import MapContext from './map-context';
const TOKEN_DOC_URL = 'https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens';
const NO_TOKEN_WARNING = 'A valid API access token is required to use Mapbox data';

function noop() {}

const UNAUTHORIZED_ERROR_CODE = 401;
const CONTAINER_STYLE = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
};
const propTypes = Object.assign({}, Mapbox.propTypes, {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onResize: PropTypes.func,
  preventStyleDiffing: PropTypes.bool,
  disableTokenWarning: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  visibilityConstraints: PropTypes.object
});
const defaultProps = Object.assign({}, Mapbox.defaultProps, {
  preventStyleDiffing: false,
  disableTokenWarning: false,
  visible: true,
  onResize: noop,
  className: '',
  style: null,
  visibilityConstraints: MAPBOX_LIMITS
});
export default class StaticMap extends PureComponent {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;

    _defineProperty(this, "state", {
      accessTokenInvalid: false
    });

    _defineProperty(this, "_mapbox", null);

    _defineProperty(this, "_map", null);

    _defineProperty(this, "_mapboxMapRef", createRef());

    _defineProperty(this, "_mapContainerRef", createRef());

    _defineProperty(this, "_queryParams", {});

    _defineProperty(this, "_width", 0);

    _defineProperty(this, "_height", 0);

    _defineProperty(this, "getMap", () => {
      return this._map;
    });

    _defineProperty(this, "queryRenderedFeatures", function (geometry) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this._map.queryRenderedFeatures(geometry, options);
    });

    _defineProperty(this, "_mapboxMapError", evt => {
      const statusCode = evt.error && evt.error.status || evt.status;

      if (statusCode === UNAUTHORIZED_ERROR_CODE && !this.state.accessTokenInvalid) {
        console.error(NO_TOKEN_WARNING);
        this.setState({
          accessTokenInvalid: true
        });
      }

      this.props.onError(evt);
    });
  }

  static supported() {
    return mapboxgl && mapboxgl.supported();
  }

  componentDidMount() {
    if (!StaticMap.supported()) {
      return;
    }

    const mapStyle = this.props.mapStyle;
    this._mapbox = new Mapbox(Object.assign({}, this.props, {
      mapboxgl,
      width: this._width,
      height: this._height,
      container: this._mapboxMapRef.current,
      onError: this._mapboxMapError,
      mapStyle: normalizeStyle(mapStyle)
    }));
    this._map = this._mapbox.getMap();
  }

  componentDidUpdate(prevProps) {
    if (this._mapbox) {
      this._updateMapStyle(prevProps, this.props);

      this._updateMapProps(this.props);
    }
  }

  componentWillUnmount() {
    if (this._mapbox) {
      this._mapbox.finalize();

      this._mapbox = null;
      this._map = null;
    }
  }

  _updateMapSize(width, height) {
    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;

      this._updateMapProps(this.props);
    }
  }

  _updateMapStyle(oldProps, newProps) {
    const mapStyle = newProps.mapStyle;
    const oldMapStyle = oldProps.mapStyle;

    if (mapStyle !== oldMapStyle) {
      this._map.setStyle(normalizeStyle(mapStyle), {
        diff: !this.props.preventStyleDiffing
      });
    }
  }

  _updateMapProps(props) {
    if (!this._mapbox) {
      return;
    }

    this._mapbox.setProps(Object.assign({}, props, {
      width: this._width,
      height: this._height
    }));
  }

  _renderNoTokenWarning() {
    if (this.state.accessTokenInvalid && !this.props.disableTokenWarning) {
      const style = {
        position: 'absolute',
        left: 0,
        top: 0
      };
      return createElement('div', {
        key: 'warning',
        id: 'no-token-warning',
        style
      }, [createElement('h3', {
        key: 'header'
      }, NO_TOKEN_WARNING), createElement('div', {
        key: 'text'
      }, 'For information on setting up your basemap, read'), createElement('a', {
        key: 'link',
        href: TOKEN_DOC_URL
      }, 'Note on Map Tokens')]);
    }

    return null;
  }

  _renderOverlays(dimensions) {
    const _dimensions$width = dimensions.width,
          width = _dimensions$width === void 0 ? Number(this.props.width) : _dimensions$width,
          _dimensions$height = dimensions.height,
          height = _dimensions$height === void 0 ? Number(this.props.height) : _dimensions$height;

    this._updateMapSize(width, height);

    return createElement(MapContext.Consumer, null, interactiveContext => {
      const context = Object.assign({}, interactiveContext, {
        viewport: new WebMercatorViewport(Object.assign({}, this.props, this.props.viewState, {
          width,
          height
        })),
        map: this._map,
        mapContainer: interactiveContext.mapContainer || this._mapContainerRef.current
      });
      return createElement(MapContext.Provider, {
        value: context
      }, createElement('div', {
        key: 'map-overlays',
        className: 'overlays',
        style: CONTAINER_STYLE,
        children: this.props.children
      }));
    });
  }

  render() {
    const _this$props = this.props,
          className = _this$props.className,
          width = _this$props.width,
          height = _this$props.height,
          style = _this$props.style,
          visibilityConstraints = _this$props.visibilityConstraints;
    const mapContainerStyle = Object.assign({
      position: 'relative'
    }, style, {
      width,
      height
    });
    const visible = this.props.visible && checkVisibilityConstraints(this.props.viewState || this.props, visibilityConstraints);
    const mapStyle = Object.assign({}, CONTAINER_STYLE, {
      visibility: visible ? 'inherit' : 'hidden'
    });
    return createElement('div', {
      key: 'map-container',
      style: mapContainerStyle,
      ref: this._mapContainerRef,
      children: [createElement('div', {
        key: 'map-mapbox',
        ref: this._mapboxMapRef,
        style: mapStyle,
        className
      }), createElement(AutoSizer, {
        key: 'autosizer',
        disableWidth: Number.isFinite(width),
        disableHeight: Number.isFinite(height),
        onResize: this.props.onResize
      }, this._renderOverlays.bind(this)), this._renderNoTokenWarning()]
    });
  }

}

_defineProperty(StaticMap, "propTypes", propTypes);

_defineProperty(StaticMap, "defaultProps", defaultProps);
//# sourceMappingURL=static-map.js.map