import React from "react";
import styled from "styled-components";

import Map from "./Map";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Heading>Dashboard</Heading>
      <ContentDiv>
        <DivHeading>View Todays Alerts</DivHeading>
      </ContentDiv>
      <ContentDiv>
        <DivHeading>Active Fires</DivHeading>
        <Map lat={37.7577} long={-122.4376} />
      </ContentDiv>
      <ContentDiv>
        <DivHeading>My Profile</DivHeading>
      </ContentDiv>
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  width: 100%;
  background-image: linear-gradient(to bottom, #6c5b7b, #355c7d);
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Heading = styled.h1`
  color: #f2f3f4;
  padding-top: 25px;
`;

const DivHeading = styled.h2`
  padding: 10px 0px;
  margin: 0;
`;

const ContentDiv = styled.div`
  width: 75%;
  max-width: 500px;
  height: auto;
  margin: auto;
  background-color: #f2f3f4;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 2px 5px 15px black;
`;
