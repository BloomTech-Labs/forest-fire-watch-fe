import React from "react";
import styled from "styled-components";

const Modal = ({ show, children }) => {
  return (
    <ModalWrapper
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0"
      }}
    >
      <ModalBody>{children}</ModalBody>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  background-color: #f2f2f2;
  border-radius: 25px;
  border: none;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
  margin: 100px auto 0;
  transition: all 0.8s;
  width: 80%;
  max-width: 900px;
  min-height: 500px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
`;

const ModalBody = styled.div`
  min-height: 500px;
`;
