import React from "react";
import styled from "styled-components";

import Map from "./Map";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Heading>Dashboard</Heading>
      <ContentContainer>
        <AlertsDiv>
          <DivHeading>View Todays Alerts</DivHeading>
        </AlertsDiv>
        <MapDiv>
          <DivHeading>Active Fires</DivHeading>
          <Map />
        </MapDiv>
        <ProfileDiv>
          <DivHeading>My Profile</DivHeading>
        </ProfileDiv>
      </ContentContainer>
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
  padding: 15px 0px;
  margin: 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const DivHeading = styled.h2`
  padding: 10px 0px;
  margin: 0;
`;

const AlertsDiv = styled.div`
  width: 90%;
  max-width: 500px;
  height: 50px;
  margin: 10px auto;
  background-color: #f2f3f4;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 2px 5px 15px black;
  @media (min-width: 900px) {
    order: 2;
    margin: auto;
  }
`;

const MapDiv = styled.div`
  width: 90%;
  max-width: 500px;
  height: auto;
  margin: 15px auto;
  background-color: #f2f3f4;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 2px 5px 15px black;
  @media (min-width: 900px) {
    grid-column: 1;
    grid-row: 1 / 3;
    max-width: 1000px;
  }
`;

const ProfileDiv = styled.div`
  width: 90%;
  max-width: 500px;
  height: 50px;
  margin: 15px auto;
  background-color: #f2f3f4;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 2px 5px 15px black;
  @media (min-width: 900px) {
    order: 3;
  }
`;
