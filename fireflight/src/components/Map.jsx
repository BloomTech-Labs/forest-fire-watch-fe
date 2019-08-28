import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { MapContext } from "../context/MapContext";

import fireIcon from "../images/fireIcon.png";
import locationIcon from "../images/locationIcon.png";
import axiosWithAuth from "../utils/axiosWithAuth";

import axios from "axios";

const Map = () => {
  const { state, setViewport, setAddress, setCoordinates } = useContext(
    MapContext
  );
  const [userCoords, setUserCoords] = useState();

  console.log(state);

  // hook for current selected fire to display popup on the map
  const [selectedFire, setSelectedFire] = useState(null);
  const [fireData, setFireData] = useState([
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
  ]);

  // mapbox API token
  const token =
    process.env.REACT_APP_MAPBOX_TOKEN ||
    "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

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
    setAddress();
  }, []);

  useEffect(() => {
    if (state.userAddress !== "") {
      setCoordinates();
      setUserCoords({ ...state.userCoordinates });
    }
  }, [state.userAddress]);

  let userMarker;

  if (state.userCoordinates.latitude && state.userCoordinates.longitude) {
    userMarker = (
      <Marker
        latitude={state.userCoordinates.latitude}
        longitude={state.userCoordinates.longitude}
      >
        <img src={locationIcon} height="35" width="20" style={{ zIndex: -1 }} />
      </Marker>
    );
  }

  return (
    <div>
      <ReactMapGL
        {...state.viewport}
        mapboxApiAccessToken={token}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        Marker Issue to be fixed
        {userMarker};
        {fireData.map(fire => {
          return (
            // return marker for each fire datapoint
            <Marker latitude={fire.latitude} longitude={fire.longitude}>
              {/* <button
                style={{ width: "20px", height: "15px" }}
                onClick={e => {
                  e.preventDefault();
                  setSelectedFire(fire);
                }}
              />
              FIRE */}
              <img
                src={fireIcon}
                height="35"
                width="35"
                style={{ zIndex: 3 }}
              />
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
