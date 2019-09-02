import React from "react";

import Modal from "./Modal/Modal";
import Alerts from "./Alerts";

import styled from "styled-components";

const AlertsContainer = ({ show, close }) => {
  return (
    <div>
      {show ? <BackDrop onClick={close} /> : null}
      <Modal show={show}>
        <Alerts />
      </Modal>
    </div>
  );
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
