import React from "react";
import styled from "styled-components";

const Modal = ({
  close,
  show,
  children,
  setLogin,
  setRegister,
  showRegisterStatus,
  showLoginStatus
}) => {
  const toggleForms = () => {
    console.log("working");
    console.log(showRegisterStatus, showLoginStatus);
    if (showRegisterStatus) {
      setRegister(false);
      setLogin(true);
    } else if (showLoginStatus) {
      setRegister(true);
      setLogin(false);
    }
  };

  return (
    <ModalWrapper
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0"
      }}
    >
      <ModalHeader>
        <CloseModal onClick={close}>×</CloseModal>
      </ModalHeader>
      <div className="modal-body">{children}</div>
      <ModalFooter>
        <BtnCancel onClick={toggleForms}>Toggle Forms</BtnCancel>
      </ModalFooter>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  background-color: #f2f2f2;
  border-radius: 25px;
  padding: 20px;
  border: none;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
  margin: 100px auto 0;
  transition: all 0.8s;
  width: 80%;
  position: absolute;
  left: 0;
  right: 0;
`;

const ModalHeader = styled.div`
  height: 40px;
  line-height: 40px;
  padding: 5px 20px;
  text-align: right;
`;

const CloseModal = styled.span`
  cursor: pointer;
`;

const ModalHeaderTitle = styled.h3`
  color: white;
  float: left;
  margin: 0;
  padding: 0;
`;

const ModalFooter = styled.div`
  height: 35px;
  padding: 15px;
`;

const BtnCancel = styled.button`
  background: coral;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  outline: none;
  padding: 10px;
  background-color: #b71c1c;
  float: left;
`;
