import React from "react";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Heading>Dashboard</Heading>
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
