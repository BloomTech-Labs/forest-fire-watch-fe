import React from "react";
import styled from "styled-components";

import Map from "./Map";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Heading>Dashboard</Heading>
      <MapDiv>
        <DivHeading>Active Fires</DivHeading>
        <Map lat={37.7577} long={-122.4376} />
      </MapDiv>
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  width: 100%;
  background-image: linear-gradient(to bottom, #6c5b7b, #355c7d);
  height: 100vh;
  text-align: center;
`;

const Heading = styled.h1`
  color: #f2f3f4;
  padding-top: 25px;
`;

const DivHeading = styled.h2`
  padding: 10px 0px;
`;

const MapDiv = styled.div`
  width: 75%;
  height: 300px;
  margin: auto;
  background-color: #f2f3f4;
  border-radius: 25px;
`;
