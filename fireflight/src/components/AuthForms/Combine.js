import React from "react";

import Login from "./Login";
import Register from "./Register";
import Modal from "../Modal/Modal";

const Combine = ({
  show,
  close,
  showLogin,
  showRegister,
  setLoginStatus,
  setRegisterStatus
}) => {
  console.log(showLogin, showRegister);
  return (
    <Modal
      show={show}
      close={close}
      setRegister={setRegisterStatus}
      setLogin={setLoginStatus}
      showRegisterStatus={showRegister}
      showLoginStatus={showLogin}
    >
      {showLogin && <Login />}
      {showRegister && <Register />}
    </Modal>
  );
};

export default Combine;
