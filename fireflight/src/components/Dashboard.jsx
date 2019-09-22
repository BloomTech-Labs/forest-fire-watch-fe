import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserDataProvider, UserDataContext } from "../context/UserDataContext";

import { NavLink } from "react-router-dom";

import { FireDataContext } from "../context/FireDataContext";

// import PrivateMap from "./PrivateMap";

import { subscribeUser } from "../subscriptions.js";

const Dashboard = () => {
  const {
    userDataState,
    getUserData,
    updateTextAlerts,
    updatePushAlerts,
    addPhoneNumber
  } = useContext(UserDataContext);
  const { fireDataState, getUserLocations } = useContext(FireDataContext);
  const { userLocations } = fireDataState;
  const { username, phone, receiveSMS, receivePush } = userDataState;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showEditPhone, setEditPhone] = useState(false);

  useEffect(() => {
    getUserData();
    getUserLocations();
  }, []);

  const subscribe = e => {};

  const handleAddPhoneNumber = () => {
    if (phoneNumber.length > 9) {
      setEditPhone(false);
      addPhoneNumber(phoneNumber);
    }
  };

  const phoneInput = (
    <DataDiv>
      <input
        className="form-input-phone"
        type="text"
        name="phone"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        placeholder="ex. 123 456 7890"
      />
      <button className="phone-btn" onClick={() => handleAddPhoneNumber()}>
        {showEditPhone ? "Submit" : "Add Phone Number"}
      </button>
    </DataDiv>
  );

  return (
    <div className="dashboard-wrapper">
      <div className="content-wrapper">
        <PersonalInfo>
          <h3>Welcome {username}!</h3>

          {phone === null || showEditPhone ? (
            phoneInput
          ) : (
            <DataDiv>
              <h4>
                <i className="fas fa-phone-alt" />
              </h4>
              <h4>{phone}</h4>
              <i
                onClick={() => setEditPhone(true)}
                style={{ margin: "auto 0px", cursor: "pointer" }}
                className="fas fa-pencil-alt"
              ></i>
            </DataDiv>
          )}

          <DataDiv>
            <h4>Receive Text Alerts:</h4>
            <CheckBoxWrapper>
              <CheckBox
                id="checkbox1"
                type="checkbox"
                onChange={() => {
                  updateTextAlerts(!receiveSMS);
                }}
                checked={receiveSMS}
              />
              <CheckBoxLabel htmlFor="checkbox1" />
            </CheckBoxWrapper>
          </DataDiv>

          <DataDiv>
            <h4>Receive Push Notifications:</h4>
            <CheckBoxWrapper>
              <CheckBox
                id="checkbox2"
                type="checkbox"
                onChange={e => {
                  updatePushAlerts(!receivePush);
                }}
                checked={receivePush}
              />
              <CheckBoxLabel htmlFor="checkbox2" />
            </CheckBoxWrapper>
          </DataDiv>
          {process.env.NODE_ENV==='development' && <button onClick={e=>{subscribeUser()}}>Check</button>}
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
                  <td>{loc.notifications ? "ON" : "OFF"}</td>
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
  justify-content: space-between;
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

const Button = styled.button`
  background-color: green;
`;
