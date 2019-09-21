import React from "react";
import styled from "styled-components";

const MapLegend = () => {
  return (
    <LegendContainer>
      <h4 style={{ textAlign: "center", textDecoration: "underline" }}>
        Map Legend
      </h4>
    </LegendContainer>
  );
};

export default MapLegend;

const LegendContainer = styled.div`
  width: 300px;
  height: 200px;
  position: absolute;
  right: 0;
  margin: 75px 25px;
  background: rgb(0, 0, 0, 0.65);
  border-radius: 5px;
  z-index: 10;
  color: white;
`;
