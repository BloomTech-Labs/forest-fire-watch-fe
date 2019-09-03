import React, { useState, useEffect, useContext } from "react";

import { AlertContext } from "../context/AlertContext";
import styled from "styled-components";

const Alerts = () => {
  const { alertState, getCoords } = useContext(AlertContext);
  const { fireData } = alertState;

  console.log(fireData);

  useEffect(() => {
    getCoords();
  }, []);

  let myAlerts;

  if (fireData.length > 0) {
    myAlerts = (
      <AlertContainer>
        <AlertHeading>
          There are active fires near the following locations...
        </AlertHeading>
        {fireData.map(loc => (
          <LocAddress key={loc.address}>{loc.address}</LocAddress>
        ))}
        <h5>Please check that map for further details</h5>
      </AlertContainer>
    );
  } else {
    myAlerts = (
      <AlertContainer>
        <AlertHeading>There are no active wildfires in your area</AlertHeading>
      </AlertContainer>
    );
  }

  return <div>{myAlerts}</div>;
};

export default Alerts;

const AlertContainer = styled.div`
  text-align: center;
`;

const AlertHeading = styled.h3``;

const LocAddress = styled.h4`
  text-decoration: underline;
`;
