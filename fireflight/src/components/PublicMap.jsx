import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import styled from "styled-components";

import { PublicMapContext } from "../context/PublicMapContext";

import fireIcon from "../images/fireIcon.png";
import locationIcon from "../images/locationIcon.png";

// mapbox API token
const token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

const PublicMap = () => {
  const { publicMapState, setViewport, setAddress, getData } = useContext(
    PublicMapContext
  );
  const { viewport, address, coordinates, fireData } = publicMapState;

  const handleSubmit = () => {
    getData();
  };

  let userMarker;

  if (coordinates.latitude && coordinates.longitude) {
    userMarker = (
      <Marker latitude={coordinates.latitude} longitude={coordinates.longitude}>
        <img src={locationIcon} height="35" width="20" style={{ zIndex: -1 }} />
      </Marker>
    );
  }

  let activeFires = [];

  if (fireData.length > 0) {
    activeFires = fireData.map(fire => {
      return (
        // return marker for each fire datapoint
        <Marker
          latitude={fire.latitude}
          longitude={fire.longitude}
          key={`${fire.distance}_${fire.latitude}`}
        >
          <img src={fireIcon} height="35" width="35" style={{ zIndex: 3 }} />
        </Marker>
      );
    });
  }

  return (
    <div style={{ position: "relative" }}>
      <FormContainer>
        <FormInput
          type="text"
          name="Search Address"
          placeholder="Search Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <FormButton onClick={handleSubmit}>SUBMIT</FormButton>
      </FormContainer>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={token}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {userMarker}
        {activeFires}
      </ReactMapGL>
    </div>
  );
};

export default PublicMap;

const FormContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  z-index: 10;
  left: 0;
  right: 0;
  margin: auto;
`;

const FormInput = styled.input`
  width: 300px;
  margin: 25px;
  padding: 15px;
  font-size: 0.75em;
  background-color: white;
  border-radius: 5px;
  border: solid 1px black;
  @media (max-width: 900px) {
    width: 75%;
  }
`;

const FormButton = styled.button``;
