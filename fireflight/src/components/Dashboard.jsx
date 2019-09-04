import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { AlertContext } from "../context/AlertContext";

import PrivateMap from "./PrivateMap";

const Dashboard = () => {
  const { setShowAlert } = useContext(AlertContext);
  return (
    <DashboardWrapper>
      <Heading>Dashboard</Heading>
      <ContentContainer>
        <AlertsDiv>
          <DivHeading onClick={setShowAlert}>View Todays Alerts</DivHeading>
        </AlertsDiv>
        <MapDiv>
          <DivHeading>Active Fires</DivHeading>
          <PrivateMap />
        </MapDiv>

        <AddressesDiv>
          <NavLink
            to="/address"
            style={{ color: "black", textDecoration: "none" }}
          >
            <DivHeading>Input Addresses</DivHeading>
          </NavLink>
        </AddressesDiv>
      </ContentContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Heading = styled.h1`
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
  cursor: pointer;
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

const AddressesDiv = styled.div`
  width: 90%;
  max-width: 500px;
  height: 50px;
  margin: 15px auto;
  background-color: #f2f3f4;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 2px 5px 15px black;
  cursor: pointer;
  @media (min-width: 900px) {
    order: 3;
  }
`;
