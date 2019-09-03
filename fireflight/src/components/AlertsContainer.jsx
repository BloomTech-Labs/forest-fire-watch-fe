import React, { useEffect, useContext, useState } from "react";

import { AlertContext } from "../context/AlertContext";

import Modal from "./Modal/Modal";
import Alerts from "./Alerts";

import styled from "styled-components";

const AlertsContainer = () => {
  const { alertState, setShowAlert, setAlertViewed } = useContext(AlertContext);
  const { fireData, alertViewed, showAlert } = alertState;

  const token = localStorage.getItem("token");

  const closeHandler = () => {
    setShowAlert(false);
    setAlertViewed(true);
  };

  console.log(fireData);

  useEffect(() => {
    if (alertViewed === false && fireData.length > 0) {
      setShowAlert(true);
    }
  }, [fireData]);

  if (token) {
    return (
      <div>
        {showAlert ? <BackDrop onClick={() => closeHandler()} /> : null}
        <Modal show={showAlert}>
          <Alerts />
        </Modal>
      </div>
    );
  } else {
    return null;
  }
};

export default AlertsContainer;

const BackDrop = styled.div`
  background-color: rgba(48, 49, 48, 0.42);
  height: 100%;
  position: fixed;
  transition: all 1.3s;
  width: 100%;
  z-index: 5;
`;
