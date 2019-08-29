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
  const { publicMapState, setViewport, setAddress } = useContext(
    PublicMapContext
  );
  const { viewport, address } = publicMapState;

  console.log(address);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={token}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        <FormContainer>
          <FormInput
            type="text"
            name="Search_Address"
            placeholder="Search Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </FormContainer>
      </ReactMapGL>
    </div>
  );
};

export default PublicMap;

const FormContainer = styled.form`
  display: flex;
`;

const FormInput = styled.input`
  width: 300px;
  margin: 25px auto;
  padding: 15px;
  font-size: 0.75em;
  background-color: white;
  border-radius: 5px;
  border: solid 1px black;
  @media (max-width: 900px) {
    width: 75%;
  }
`;
