import React, { useContext } from "react";

import { FireDataContext } from "../context/FireDataContext";
import styled from "styled-components";

import alertIcon from "../images/alert.png";

const Alerts = () => {
  const { fireDataState } = useContext(FireDataContext);
  const { alertData } = fireDataState;

  let myAlerts;

  if (alertData.length > 0) {
    myAlerts = (
      <AlertContainer>
        <img src={alertIcon} width="100px" />
        <AlertHeading>
         There are active fires near the following locations... 
        </AlertHeading>
        {alertData.map(loc => (
          <LocAddress key={loc}>{loc}</LocAddress>
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
  background-color: #f2f3f4;
  border-radius: 8px;
`;

const AlertHeading = styled.h3`
  color: #e61a1a;
`;

const LocAddress = styled.h4`
  text-decoration: underline;
`;
