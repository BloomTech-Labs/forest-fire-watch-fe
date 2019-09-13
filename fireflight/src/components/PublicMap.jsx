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
      {/* <button style={{ marginBottom: 6 }}>Toggle Notifications</button> */}
      <Switch>
        <Checkbox type="checkbox" />

        <Slider></Slider>
      </Switch>
      <button style={{ marginTop: 6 }}>Delete this pin</button>
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      <Container>
        <FormContainer>
          <FormInput
            type="text"
            name="Address"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <FormRadiusInput
            type="text"
            name="Radius"
            placeholder="Radius (miles)"
            value={radius}
            onChange={e => setRadius(e.target.value)}
          />
          <FormButton onClick={handleSubmit}>Find Active Fires</FormButton>
        </FormContainer>
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
            {selectedMarker[4] === "savedLocation"
              ? savedLocationPopup
              : tempLocationPopup}
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

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 576px) {
    justify-content: center;
    width: 90%;
    margin: auto;
  }
`;

const FormInput = styled.input`
  width: 250px;
  margin: 25px 7.5px 5px;
  padding: 10px;
  font-size: 1em;
  background-color: white;
  border-radius: 5px;
  border: solid 1px black;
  @media (max-width: 576px) {
    width: 200px;
    padding: 8px;
  }
`;

const FormRadiusInput = styled.input`
  width: 150px;
  margin: 25px 17.5px 5px 10px;
  padding: 10px;
  font-size: 1em;
  background-color: white;
  border-radius: 5px;
  border: solid 1px black;
  @media (max-width: 576px) {
    width: 200px;
    padding: 8px;
  }
`;

const FormButton = styled.button`
  height: 39.5px;
  width: 150px;
  margin: 25px 0px 5px;
  border-radius: 5px;
  background-color: #355c7d;
  color: #f2f3f4;
  font-size: 1em;
  border: solid 1px black;
  cursor: pointer;
  @media (max-width: 576px) {
    position: absolute;
    top: 40px;
    width: 200px;
  }
`;

const InfoText = styled.div`
  font-size: 0.9em;
  text-align: center;
  @media (max-width: 576px) {
    font-size: 0.7em;
    position: absolute;
    top: 110px;
    left: 50px;
    text-decoration: none;
  }
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

const PopupText = styled.p`
  color: #355c7d;
  padding: 0px;
  margin: 0px;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Checkbox = styled.input`
  /* opacity: 0; */
  width: 0;
  height: 0;
  &:checked {
    background-color: #2196f3;
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  &:focus {
    box-shadow: 0 0 1px #2196f3;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  /* -webkit-transition: 0.4s; */
  /* transition: 0.4s; */
  background-color: #2196f3;
  box-shadow: 0 0 1px #2196f3;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    /* -webkit-transition: 0.4s;
    transition: 0.4s;
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px); */
    transform: translateX(26px);
    border-radius: 50%;
  }
`;
