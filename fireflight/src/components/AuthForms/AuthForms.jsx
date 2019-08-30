import React from "react";
import AuthFormsModal from "./Combine.jsx";
import styled from "styled-components";

const AuthForms = ({
  showAuthForms,
  setShowAuthForms,
  loginFormStatus,
  registerFormStatus,
  setLoginFormStatus,
  setRegisterFormStatus
}) => {
  return (
    <>
      {showAuthForms ? (
        <BackDrop onClick={() => setShowAuthForms(false)} />
      ) : null}
      <AuthFormsModal
        show={showAuthForms}
        close={() => setShowAuthForms(false)}
        showLogin={loginFormStatus}
        showRegister={registerFormStatus}
        setLoginStatus={setLoginFormStatus}
        setRegisterStatus={setRegisterFormStatus}
        setShowAuthForms={setShowAuthForms}
      />
    </>
  );
};

export default AuthForms;

const BackDrop = styled.div`
  background-color: rgba(48, 49, 48, 0.42);
  height: 100%;
  position: fixed;
  transition: all 1.3s;
  width: 100%;
  z-index: 5;
`;
