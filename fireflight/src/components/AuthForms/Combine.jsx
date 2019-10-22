import React from "react";

import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Modal from "../Modal";
import Password from "./Password.jsx";

const Combine = ({
  show,
  close,
  showLogin,
  showRegister,
  passwordFormStatus,
  setLoginStatus,
  setRegisterStatus,
  setShowAuthForms,
  setPasswordFormStatus
}) => {
  const toggleForms = () => {
    if (showRegister) {
      setRegisterStatus(false);
      setLoginStatus(true);
    } else if (showLogin) {
      setRegisterStatus(true);
      setLoginStatus(false);
    }
  }
  const toggleForgotPassword = () => {
    if (showLogin) {
      setLoginStatus(false);
      setPasswordFormStatus(true);
    } else if (passwordFormStatus) {
      setLoginStatus(true);
      setPasswordFormStatus(false);
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
          setLoginStatus={setLoginStatus}
          setRegisterStatus={setRegisterStatus}
        />
      )}
      {showRegister && (
        <Register
          toggle={toggleForms}
          setShowAuthForms={setShowAuthForms}
          showRegister={showRegister}
          showLogin={showLogin}
          passwordFormStatus={passwordFormStatus}
          setPasswordFormStatus={setPasswordFormStatus}
          setLoginStatus={setLoginStatus}
          setRegisterStatus={setRegisterStatus}
        />
      )}
      {passwordFormStatus && (
        <Password 
          toggleForgotPassword={toggleForgotPassword} 
          setShowAuthForms={setShowAuthForms} 
          setPasswordFormStatus={setPasswordFormStatus} 
          setLoginStatus={setLoginStatus}
          setRegisterStatus={setRegisterStatus}
        />
      )}
    </Modal>
  );
};

export default Combine;