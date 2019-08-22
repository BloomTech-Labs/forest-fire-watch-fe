import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const Map = props => {
  const [viewport, setViewport] = useState({
    width: 600,
    height: 600,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  const token =
    process.env.REACT_APP_MAPBOX_TOKEN ||
    "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={token}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        <div>
          marker data here, example below
          {/* {fireData.map(fire => { */}
          <Marker latitude={37.757} longitude={-122.437}>
            <div>FIRE</div>
          </Marker>
          <Marker latitude={37.68} longitude={-122}>
            <div>FIRE</div>
          </Marker>
          ;{/* })} */}
        </div>
      </ReactMapGL>
    </div>
  );
};

export default Map;
