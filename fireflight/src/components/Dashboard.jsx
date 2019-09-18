import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { UserDataProvider, UserDataContext } from "../context/UserDataContext";

import { NavLink } from "react-router-dom";

import { FireDataContext } from "../context/FireDataContext";

// import PrivateMap from "./PrivateMap";

import { subscribeUser as getSub } from "../subscriptions";

const Dashboard = () => {
  const {
    userDataState,
    getUserData,
    updateTextAlerts,
    updatePushAlerts
  } = useContext(UserDataContext);
  const { fireDataState, getUserLocations } = useContext(FireDataContext);
  const { userLocations } = fireDataState;
  const { username, phone, receiveSMS, receivePush } = userDataState;

  useEffect(() => {
    getUserData();
    getUserLocations();
  }, []);

  console.log(fireDataState);

  return (
    <div className="dashboard-wrapper">
      <div className="content-wrapper">
        <PersonalInfo>
          <h3>Welcome {username}!</h3>
          <DataDiv>
            <h4>
              <i className="fas fa-phone-alt" />
            </h4>
            <h4>{phone === null ? "Not Provided" : phone}</h4>
          </DataDiv>
          <DataDiv>
            <h4>Receive Text Alerts:</h4>
            <CheckBoxWrapper>
              <CheckBox
                id="checkbox1"
                type="checkbox"
                onChange={e => {
                  updateTextAlerts(e.target.checked);
                }}
                checked={receiveSMS}
              />
              <CheckBoxLabel htmlFor="checkbox1" />
            </CheckBoxWrapper>
          </DataDiv>
          {/* <DataDiv>
            <h4>Receive Push Notifications:</h4>
            <CheckBoxWrapper>
              <CheckBox
                id="checkbox2"
                type="checkbox"
                onChange={e => {
                  updatePushAlerts(e.target.checked);
                }}
                checked={receivePush}
              />
              <CheckBoxLabel htmlFor="checkbox2" />
            </CheckBoxWrapper>
          </DataDiv> */}
        </PersonalInfo>
        <LocationsInfo>
          <h3>Saved Locations</h3>
          <LocationsTable>
            <tbody>
              <TableRow>
                <TH>Address</TH>
                <TH>Radius (miles)</TH>
                <TH>Alerts</TH>
                <TH></TH>
              </TableRow>

              {userLocations.map((loc, index) => (
                <TableRow key={index + loc.radius}>
                  <td style={{ textTransform: "capitalize" }}>{loc.address}</td>
                  <td>{loc.radius}</td>
                  <td>{loc.notifications === 0 ? "OFF" : "ON"}</td>
                </TableRow>
              ))}
            </tbody>
          </LocationsTable>
        </LocationsInfo>
      </div>
      {/* End Content Wrapper */}
    </div>
    // End Dashboard Wrapper
  );
};

export default Dashboard;

const PersonalInfo = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 10px auto;
  background: rgba(42, 47, 48);
  color: #f2f3f4;
  border-radius: 8px;
  padding: 10px;
`;

const LocationsInfo = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 10px auto;
  background: rgba(42, 47, 48);
  color: #f2f3f4;
  border-radius: 8px;
  padding: 10px;
`;

const LocationsTable = styled.table`
  width: 100%;
  margin-top: 15px;
  border-spacing: 15px;
`;

const TableRow = styled.tr``;

const TH = styled.th`
  text-decoration: underline;
`;

const DataDiv = styled.div`
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: space-around;
`;

const CheckBoxWrapper = styled.div`
  position: relative;
  margin: auto 0px auto auto;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;
