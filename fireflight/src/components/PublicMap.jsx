import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { Popup } from "react-map-gl";
import styled from "styled-components";

import { FireDataContext } from "../context/FireDataContext";

// mapbox API token
const token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

const PublicMap = ({ setShowAuth, setShowLogin, setShowRegister }) => {
  const {
    fireDataState,
    setPublicViewport,
    getCoordinates,
    setTriggerRegistrationButton,
    setSelectedMarker,
    deleteLocationMarker,
    saveLocationMarker
  } = useContext(FireDataContext);
  const {
    publicMapViewport,
    triggerRegistrationButton,
    allFireMarkers,
    publicCoordinatesMarker,
    localFireMarkers,
    selectedMarker,
    userLocationMarkers,
    userLocalFireMarkers
  } = fireDataState;

  const [address, setAddress] = useState("");

  const [radius, setRadius] = useState("");

  // console.log(selectedMarker);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedMarker();
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const handleSubmit = () => {
    if (address) {
      getCoordinates(address, radius);
      setTriggerRegistrationButton();
    }
  };

  const tempLocationPopup = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button
        style={{ marginBottom: 6 }}
        onClick={e => {
          saveLocationMarker();
          deleteLocationMarker();
        }}
      >
        Save this location
      </button>
      <button style={{ marginTop: 6 }} onClick={e => deleteLocationMarker()}>
        Delete this pin
      </button>
    </div>
  );

  const savedLocationPopup = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CheckBoxWrapper>
        <CheckBox id="checkbox" type="checkbox" />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
      <button style={{ marginTop: 6 }}>Delete this pin</button>
    </div>
  );

  const fireLocationPopup = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      THIS IS A FIRE
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      <Container>
        <div className="map-form-container">
          <i className="fas fa-compass fa-lg" />
          <input
            className="address-input"
            type="text"
            name="Address"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <input
            className="radius-input"
            type="number"
            name="Radius"
            placeholder="Radius (miles)"
            value={radius}
            onChange={e => setRadius(e.target.value)}
          />
          <button className="form-btn" onClick={handleSubmit}>Find Active Fires</button>
        </div>
        {/* End Form Container */}
        {triggerRegistrationButton ? (
          <TriggeredButton
            onClick={() => {
              setShowAuth(true);
              setShowRegister(true);
              setShowLogin(false);
            }}
          >
            Create an account for a more personalized experience
          </TriggeredButton>
        ) : null}
      </Container>

      <ReactMapGL
        {...publicMapViewport}
        mapboxApiAccessToken={token}
        onViewportChange={publicMapViewport => {
          setPublicViewport(publicMapViewport);
        }}
      >
        {allFireMarkers}
        {userLocalFireMarkers}
        {localFireMarkers}

        {userLocationMarkers}
        {publicCoordinatesMarker}
        {selectedMarker.length > 0 ? (
          <Popup
            closeOnClick={false}
            anchor="top"
            latitude={selectedMarker[0]}
            longitude={selectedMarker[1]}
            onClose={() => {
              setSelectedMarker();
            }}
          >
            {selectedMarker[4] === "savedLocation" && savedLocationPopup}
            {selectedMarker[4] === "tempLocation" && tempLocationPopup}
            {selectedMarker[4] === "fireLocation" && fireLocationPopup}
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default PublicMap;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 3;
`;

const TriggeredButton = styled.button`
  font-size: 1em;
  max-width: 250px;
  margin: 25px auto;
  border-radius: 5px;
  box-shadow: 5px 5px 15px black;
  background-color: #f67280;
  padding: 5px 0px;
  cursor: pointer;
  &:hover {
    box-shadow: none;
  }
`;

const CheckBoxWrapper = styled.div`
  position: relative;
  margin: auto 0px auto auto;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;
