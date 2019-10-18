import React from "react";

import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Modal from "../Modal/Modal";
import Password from "./Password.jsx";

const Combine = ({
  show,
  close,
  showLogin,
  showRegister,
  showPassword,
  setLoginStatus,
  setRegisterStatus,
  setShowAuthForms,
  passwordFormStatus,
  setPasswordFormStatus
}) => {
  const toggleForms = () => {
    if (showRegister) {
      setRegisterStatus(false);
      setLoginStatus(true);
      setPasswordFormStatus(false);
    } else if (showLogin) {
      setRegisterStatus(true);
      setLoginStatus(false);
      setPasswordFormStatus(false);
    } else if (showPassword) {
      setPasswordFormStatus(false);
      setLoginStatus(true);
      setRegisterStatus(true);
    }
  };
  return (
    <Modal show={show} close={close}>
      {showLogin && (
        <Login 
          toggle={toggleForms} 
          setShowAuthForms={setShowAuthForms} 
          passwordFormStatus={passwordFormStatus}
          setPasswordFormStatus={setPasswordFormStatus} 
        />
      )}
      {showRegister && (
        <Register 
          toggle={toggleForms} 
          setShowAuthForms={setShowAuthForms} 
          showRegister={showRegister} 
          showLogin={showLogin} 
          showPassword={showPassword}
          setPasswordFormStatus={setPasswordFormStatus}
          setLoginStatus={setLoginStatus}
          setRegisterStatus={setRegisterStatus}
        />
      )}
      {showPassword && (
        <Password toggle={toggleForms} setShowAuthForms={setShowAuthForms} />
      )}
    </Modal>
  )
};

export default Combine;
