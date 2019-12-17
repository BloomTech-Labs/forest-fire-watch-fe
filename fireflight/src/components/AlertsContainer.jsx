import React, { useEffect, useContext } from "react";

import { FireDataContext } from "../context/FireDataContext";

import Modal from "./Modal";
import Alerts from "./Alerts";

import styled from "styled-components";

const AlertsContainer = () => {
  const {
    fireDataState,
    setShowAlert,
    setAlertViewed,
    getAlertData
  } = useContext(FireDataContext);
  const { alertData, alertViewed, showAlert } = fireDataState;

  const token = localStorage.getItem("token");

  const closeHandler = () => {
    setShowAlert(false);
    setAlertViewed(true);
  };

  useEffect(() => {
    getAlertData();
  }, [showAlert]);

  // console.log(fireData);

  useEffect(() => {
    console.log(alertData);
    if (alertViewed === false && alertData.length > 0) {
      setShowAlert(true);
    }
  }, [alertData]);

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
