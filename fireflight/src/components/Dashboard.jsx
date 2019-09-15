import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { UserDataProvider, UserDataContext } from "../context/UserDataContext";

import { NavLink } from "react-router-dom";

import { FireDataContext } from "../context/FireDataContext";

// import PrivateMap from "./PrivateMap";

const Dashboard = () => {
  const { userDataState, getUserData } = useContext(UserDataContext);

  useEffect(() => {
    getUserData();
  }, []);

  console.log(userDataState);
  return (
    <DashboardWrapper>
      <ContentContainer>
        <PersonalInfo>
          <DivHeading>Personal Info</DivHeading>
          <p></p>
        </PersonalInfo>
        <AddressesDiv>
          <NavLink
            to="/address"
            style={{ color: "#f2f3f4", textDecoration: "none" }}
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
  margin-top: 5%;
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

const DivHeading = styled.h3`
  padding: 10px 0px;
  margin: 0;
`;

const PersonalInfo = styled.div`
  width: 90%;
  max-width: 500px;
  height: 50px;
  margin: 10px auto;
  background: rgba(42, 47, 48);
  color: #f2f3f4;
  border-radius: 8px;
  padding: 10px;

  cursor: pointer;
  @media (min-width: 900px) {
    order: 2;
    margin: auto;
  }
`;

const AddressesDiv = styled.div`
  width: 90%;
  max-width: 500px;
  height: 50px;
  margin: 15px auto;
  background: rgba(55, 61, 63, 0.65);
  box-shadow: 1px 2px 10px black;
  color: #f2f3f4;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  @media (min-width: 900px) {
    order: 3;
    margin: auto;
  }
`;
