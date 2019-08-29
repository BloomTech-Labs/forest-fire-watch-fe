import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import styled from "styled-components";

import fireIcon from "../images/fireIcon.png";
import locationIcon from "../images/locationIcon.png";

// mapbox API token
const token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

const PublicMap = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 8
  });

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
