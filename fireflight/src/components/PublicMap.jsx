import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import styled from "styled-components";
import { tablet, desktop } from "../styles/vars";

import { FireDataContext } from "../context/FireDataContext";

import Modal from "./Modal/Modal";
import fireIcon from "../images/fireIcon.png";
import locationIcon from "../images/locationIcon.png";

// mapbox API token
const token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

const PublicMap = ({ setShowAuth, setShowLogin, setShowRegister }) => {
  const {
    fireDataState,
    setPublicViewport,
    getCoordinates,
    getPublicMapData,
    setTriggerRegistrationButton
  } = useContext(FireDataContext);
  const {
    publicMapViewport,
    publicMapData,
    publicCoordinates,
    triggerRegistrationButton
  } = fireDataState;
  const [address, setAddress] = useState("");
  const [firesDisplay, setFiresDisplay] = useState();
  const [userMarker, setUserMarker] = useState();

  const handleSubmit = () => {
    if (address) {
      getCoordinates({
        address: address,
        address_label: null
      });
      setTriggerRegistrationButton();
    }
  };

  useEffect(() => {
    if (Object.keys(publicCoordinates).length > 0) {
      getPublicMapData();
    }
  }, [publicCoordinates]);

  useEffect(() => {
    createFiresDisplay();
  }, [publicMapData]);

  useEffect(() => {
    createUserMarker();
  }, [publicCoordinates.latitude]);

  const createUserMarker = () => {
    if (publicCoordinates.latitude && publicCoordinates.longitude) {
      setUserMarker(
        <Marker
          latitude={publicCoordinates.latitude}
          longitude={publicCoordinates.longitude}
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
    if (publicMapData.Alert) {
      let fires = await publicMapData.Fires.map(fire => {
        return (
          // return marker for each fire datapoint
          <Marker
            latitude={fire[0][1]}
            longitude={fire[0][0]}
            key={fire[0][0] + fire[0][1] + fire[1]}
          >
            <img
              src={fireIcon}
              height="35"
              width="35"
              style={{ zIndex: 3, transform: "translate(-17.5px, -35px)" }}
              // onClick={e => {
              //   setSelectedFire(fire[0]);
              // }}
            />
          </Marker>
        );
      });
      setFiresDisplay(fires);
    }
  };

  let infoText;

  infoText = <InfoText>All searches are based on a 500 mile radius</InfoText>;

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
          <FormButton onClick={handleSubmit}>Find Active Fires</FormButton>
        </FormContainer>
        {infoText}
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
        {userMarker}
        {firesDisplay}
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
  margin: 25px 25px 5px;
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
  height: 38px;
  width: 150px;
  margin: 25px 0px 5px;
  border-radius: 5px;
  background-color: #355c7d;
  color: #f2f3f4;
  font-size: 1em;
  border: solid 1px black;
  @media (max-width: 576px) {
    height: 35px;
    width: 125px;
    font-size: 0.8em;
  }
`;

const InfoText = styled.div`
  text-align: center;
  text-decoration: underline;
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
