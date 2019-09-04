import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import styled from "styled-components";

import { MapContext } from "../context/MapContext";

import fireIcon from "../images/fireIcon.png";
import locationIcon from "../images/locationIcon.png";
import axiosWithAuth from "../utils/axiosWithAuth";

import axios from "axios";

const PrivateMap = () => {
  const {
    state,
    setViewport,
    setAddress,
    setCoordinates,
    setFires,
    fireData
  } = useContext(MapContext);
  const [userCoords, setUserCoords] = useState();
  const [userMarker, setUserMarker] = useState();
  const [firesDisplay, setFiresDisplay] = useState();

  // hook for current selected fire to display popup on the map
  const [selectedFire, setSelectedFire] = useState(null);

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

  // let userMarker;
  // let firesDisplay;

  const createUserMarker = () => {
    if (state.userCoordinates.latitude && state.userCoordinates.longitude) {
      setUserMarker(
        <Marker
          latitude={state.userCoordinates.latitude}
          longitude={state.userCoordinates.longitude}
        >
          <img
            src={locationIcon}
            height="35"
            width="20"
            style={{ zIndex: -1, transform: "translate(-10px, -35px)" }}
          />
        </Marker>
      );
    }
  };

  const createFiresDisplay = async () => {
    if (state.fireData.length > 0) {
      console.log("fireData: ", state.fireData);
      console.log("fireData2: ", state.fireData[0]);
      let fires = await state.fireData.map(fire => {
        return (
          // return marker for each fire datapoint
          <Marker latitude={fire[0][1]} longitude={fire[0][0]}>
            <img
              src={fireIcon}
              height="35"
              width="35"
              style={{ zIndex: 3, transform: "translate(-17.5px, -35px)" }}
              onClick={e => {
                setSelectedFire(fire[0]);
              }}
            />
          </Marker>
        );
      });
      setFiresDisplay(fires);
    }
  };

  useEffect(() => {
    createUserMarker();
  }, [state.userCoordinates]);

  useEffect(() => {
    createFiresDisplay();
  }, [state.fireData]);

  useEffect(() => {
    if (state.userCoordinates.latitude && state.userCoordinates.longitude) {
      const location = {
        user_coords: [
          state.userCoordinates.longitude,
          state.userCoordinates.latitude
        ],
        distance: state.userRadius
      };
      console.log("radius", state.userRadius);
      console.log("location", location);
      console.log("fireData setting", state.fireData);
      setFires(location);
    }
    console.log("fireData", state.fireData);
  }, [state.userCoordinates]);

  // if (state.userCoordinates.latitude && state.userCoordinates.longitude) {
  //   userMarker = (
  //     <Marker
  //       latitude={state.userCoordinates.latitude}
  //       longitude={state.userCoordinates.longitude}
  //     >
  //       <img
  //         src={locationIcon}
  //         height="35"
  //         width="20"
  //         style={{ zIndex: -1, transform: "translate(-10px, -35px)" }}
  //       />
  //     </Marker>
  //   );
  // }

  // if (state.fireData.length > 0) {
  //   console.log("fireData: ", state.fireData);
  //   console.log("fireData2: ", state.fireData[0]);
  //   firesDisplay = state.fireData.map(fire => {
  //     return (
  //       // return marker for each fire datapoint
  //       <Marker latitude={fire[0][1]} longitude={fire[0][0]}>
  //         <img
  //           src={fireIcon}
  //           height="35"
  //           width="35"
  //           style={{ zIndex: 3, transform: "translate(-17.5px, -35px)" }}
  //           onClick={e => {
  //             setSelectedFire(fire[0]);
  //           }}
  //         />
  //       </Marker>
  //     );
  //   });
  // }

  return (
    <ReactMapGL
      {...state.viewport}
      mapboxApiAccessToken={token}
      onViewportChange={viewport => {
        setViewport(viewport);
      }}
    >
      {userMarker}
      {firesDisplay}

      {/* sets selectedFire state to clicked on location */}
      {selectedFire ? (
        <Popup
          latitude={selectedFire[1]}
          longitude={selectedFire[0]}
          onClose={() => {
            setSelectedFire(null);
          }}
        >
          <div>
            Lat: {selectedFire[1]}, Long: {selectedFire[0]}
          </div>
        </Popup>
      ) : null}
    </ReactMapGL>

  );
};

export default PrivateMap;
