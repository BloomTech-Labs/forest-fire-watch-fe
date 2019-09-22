import React from "react";
import styled from "styled-components";

import fireIcon from "../images/fireIcon.png";
import exclamationMark from "../images/exclaim.png";
import locationIcon from "../images/locationIcon.png";
import locationIconGreen from "../images/locationIconGreen.png";

const MapLegend = () => {
  return (
    <LegendContainer>
      <h4
        style={{
          textAlign: "center",
          textDecoration: "underline",
          margin: 10
        }}
      >
        Map Legend
      </h4>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <LegendItem>
          <LegendText>Temp. Location Marker:</LegendText>
          <img
            src={locationIcon}
            height="25"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 10px)" }}
            alt=""
          />
        </LegendItem>
        <LegendItem>
          <LegendText>Saved Location Marker:</LegendText>
          <img
            src={locationIconGreen}
            height="25"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 10px)" }}
            alt=""
          />
        </LegendItem>
        <LegendItem>
          <LegendText>Wildfire Marker:</LegendText>
          <img
            src={fireIcon}
            height="20"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 10px)" }}
            alt=""
          />
        </LegendItem>
        <LegendItem>
          <LegendText>Fire Within Radius:</LegendText>
          <img
            src={exclamationMark}
            height="20"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 10px)" }}
            alt=""
          />
        </LegendItem>
        <Info>
          Location markers can be clicked. There are actions available on the
          Temp. Location Marker that will allow you to save that location to
          your profile. Once saved, you can choose to receive alerts for that
          location and adjust the alert radius.
        </Info>
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

const LegendText = styled.h5`
  margin: 15px;
`;

const Info = styled.p`
  width: 90%;
  margin: 10px auto;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 300;
`;
