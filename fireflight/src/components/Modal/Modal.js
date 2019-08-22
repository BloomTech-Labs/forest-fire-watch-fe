import React from "react";
import styled from "styled-components";

const modal = props => {
  return (
    <div>
      <ModalWrapper
        style={{
          transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        <ModalHeader>
          <ModalHeaderTitle>{props.headerTitle}</ModalHeaderTitle>
          <span className="close-modal-btn" onClick={props.close}>
            ×
          </span>
        </ModalHeader>
        <div className="modal-body">{props.form}</div>
        <ModalFooter>
          <BtnCancel onClick={props.close}>CLOSE</BtnCancel>
        </ModalFooter>
      </ModalWrapper>
    </div>
  );
};

export default modal;

const ModalWrapper = styled.div`
  background: white;
  border: 1px solid #d0cccc;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
  margin: 100px auto 0;
  transition: all 0.8s;
  width: 60%;
`;

const ModalHeader = styled.div`
  background: #263238;
  height: 40px;
  line-height: 40px;
  padding: 5px 20px;
  text-align: right;
`;

const ModalHeaderTitle = styled.h3`
  color: white;
  float: left;
  margin: 0;
  padding: 0;
`;

const ModalFooter = styled.div`
  background: #263238;
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

const BtnContinue = styled.button`
  background: coral;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  outline: none;
  padding: 10px;
  background-color: #1b5e20;
  float: right;
`;
