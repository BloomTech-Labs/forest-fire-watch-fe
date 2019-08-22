import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const Map = props => {
  const [viewport, setViewport] = useState({
    width: 600,
    height: 600,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  const [selectedFire, setSelectedFire] = useState(null);

  const token =
    process.env.REACT_APP_MAPBOX_TOKEN ||
    "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

  const dummyFireData = [
    {
      location: "location1",
      latitude: 37.757,
      longitude: -122.437
    },
    {
      location: "location2",
      latitude: 37.68,
      longitude: -122
    }
  ];

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedFire(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={token}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        marker data here, example below
        {dummyFireData.map(fire => {
          return (
            <Marker latitude={fire.latitude} longitude={fire.longitude}>
              <button
                style={{ width: "20px", height: "15px" }}
                onClick={e => {
                  e.preventDefault();
                  setSelectedFire(fire);
                }}
              />
              FIRE{" "}
            </Marker>
          );
        })}
        {/*
          <Marker latitude={37.68} longitude={-122}>
            <button>FIRE</button>
          </Marker> */}
        {selectedFire ? (
          <Popup
            latitude={selectedFire.latitude}
            longitude={selectedFire.longitude}
            onClose={() => {
              setSelectedFire(null);
            }}
          >
            <div>{selectedFire.location}</div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default Map;
