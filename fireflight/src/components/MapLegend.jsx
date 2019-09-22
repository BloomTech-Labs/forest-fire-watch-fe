import React from "react";
import styled from "styled-components";

import fireIcon from "../images/fireIcon.png";
import exclamationMark from "../images/exclaim.png";
import locationIcon from "../images/locationIcon.png";
import locationIconGreen from "../images/locationIconGreen.png";

const MapLegend = () => {
  return (
    <LegendContainer>
      <h4 style={{ textAlign: "center", textDecoration: "underline" }}>
        Map Legend
      </h4>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <LegendItem>
          <h5>Temp. Location Marker:</h5>
          <img
            src={locationIcon}
            height="35"
            width="20"
            style={{ zIndex: 5, transform: "translate(0px, 10px)" }}
            alt=""
          />
        </LegendItem>
        <LegendItem>
          <h5>Saved Location Marker:</h5>
          <img
            src={locationIconGreen}
            height="35"
            width="20"
            style={{ zIndex: 5, transform: "translate(0px, 10px)" }}
            alt=""
          />
        </LegendItem>
        <LegendItem>
          <h5>Wildfire Marker:</h5>
          <img
            src={fireIcon}
            height="35"
            width="35"
            style={{ zIndex: 5, transform: "translate(0px, 10px)" }}
            alt=""
          />
        </LegendItem>
      </div>
    </LegendContainer>
  );
};

export default MapLegend;

const LegendContainer = styled.div`
  width: 300px;
  height: auto;
  position: absolute;
  right: 0;
  margin: 75px 25px;
  background: rgb(0, 0, 0, 0.65);
  border-radius: 5px;
  z-index: 10;
  color: white;
`;

const LegendItem = styled.span`
  width: 75%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
