import React from "react";

import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Modal from "../Modal/Modal";

const Combine = ({
  show,
  close,
  showLogin,
  showRegister,
  setLoginStatus,
  setRegisterStatus,
  setShowAuthForms
}) => {
  const toggleForms = () => {
    if (showRegister) {
      setRegisterStatus(false);
      setLoginStatus(true);
    } else if (showLogin) {
      setRegisterStatus(true);
      setLoginStatus(false);
    }
  };
  return (
    <Modal show={show} close={close}>
      {showLogin && (
        <Login toggle={toggleForms} setShowAuthForms={setShowAuthForms} />
      )}
      {showRegister && (
        <Register toggle={toggleForms} setShowAuthForms={setShowAuthForms} />
      )}
    </Modal>
  );
};

export default Combine;
