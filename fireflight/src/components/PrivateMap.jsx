import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import styled from "styled-components";

import { FireDataContext } from "../context/FireDataContext";
import AddressContext from "../context/addressContextProvider";

import fireIcon from "../images/fireIcon.png";
import locationIcon from "../images/locationIcon.png";

const PrivateMap = () => {
  const { fireDataState, setPrivateViewport, getPrivateMapData } = useContext(
    FireDataContext
  );
  const { state } = useContext(AddressContext);

  const { privateMapViewport, privateMapData, userCoordinates } = fireDataState;
  const [userMarker, setUserMarker] = useState();
  const [firesDisplay, setFiresDisplay] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  // hook for current selected fire to display popup on the map
  const [selectedFire, setSelectedFire] = useState(null);
  const [selectOptions, setSelectOptions] = useState();

  // mapbox API token
  const token =
    process.env.REACT_APP_MAPBOX_TOKEN ||
    "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

  // useEffect hook to cause the ESC key to close a popup by setting selectedFire state to null
  useEffect(() => {
    console.log(state);
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
    if (userCoordinates.length > 0) {
      setSelectedLocation(userCoordinates[0].id);
      createSelectLocations();
    }
  }, [userCoordinates]);

  useEffect(() => {
    if (selectedLocation) {
      getPrivateMapData(selectedLocation);
    }
  }, [selectedLocation]);

  useEffect(() => {
    createUserMarker();
  }, [privateMapData.latitude]);

  useEffect(() => {
    createFiresDisplay();
  }, [privateMapData.Alert]);

  const createUserMarker = () => {
    if (privateMapData.latitude && privateMapData.longitude) {
      setUserMarker(
        <Marker
          latitude={privateMapData.latitude}
          longitude={privateMapData.longitude}
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
    if (privateMapData.Alert) {
      let fires = await privateMapData.Fires.map(fire => {
        return (
          // return marker for each fire datapoint
          <Marker
            latitude={fire[0][1]}
            longitude={fire[0][0]}
            key={fire[0][0] + fire[0][1]}
          >
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

  const createSelectLocations = () => {
    let selectOptionsContainer = state.addresses.map(coord => (
      <SelectOption value={coord.id} key={coord.address + coord.id}>
        {coord.address_label ? coord.address_label : coord.address.slice(0, 15)}
      </SelectOption>
    ));
    setSelectOptions(selectOptionsContainer);
  };

  return (
    <div style={{ position: "relative" }}>
      <Container>
        <LocationSelect onChange={e => setSelectedLocation(e.target.value)}>
          {selectOptions}
        </LocationSelect>
      </Container>

      <ReactMapGL
        {...privateMapViewport}
        mapboxApiAccessToken={token}
        onViewportChange={privateMapViewport => {
          setPrivateViewport(privateMapViewport);
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
    </div>
  );
};

export default PrivateMap;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 3;
`;

const LocationSelect = styled.select`
  width: 125px;
  margin: 10px 10px 10px auto;
  border: 1px solid grey;
  height: 25px;
`;

const SelectOption = styled.option``;
