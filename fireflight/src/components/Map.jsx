import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const Map = ({ width, height, lat, long }) => {
  // hook for viewport data, should eventually be taken from user location
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 350,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  // hook for current selected fire to display popup on the map
  const [selectedFire, setSelectedFire] = useState(null);

  // mapbox API token
  const token =
    process.env.REACT_APP_MAPBOX_TOKEN ||
    "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

  // dummy data.
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

  // useEffect hook to cause the ESC key to close a popup by setting selectedFire state to null
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

  useEffect(() => {
    const sampleAddress = "223 E. Concord Street, Orlando, FL 32801";

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${sampleAddress}.json?access_token=${token}&types=address&limit=1`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        console.log(data.features[0].geometry.coordinates);
        // result is [-81.374366, 28.551327] array, [longitude, latitude] format
        // https://docs.mapbox.com/api/search/#geocoding
      })
      .catch(err => {
        console.log(err);
      });
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
            // return marker for each fire datapoint
            <Marker latitude={fire.latitude} longitude={fire.longitude}>
              <button
                style={{ width: "20px", height: "15px" }}
                onClick={e => {
                  e.preventDefault();
                  setSelectedFire(fire);
                }}
              />
              FIRE
            </Marker>
          );
        })}
        {/* sets selectedFire state to clicked on location */}
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
