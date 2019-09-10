import React from "react";

const Modal = ({ show, children }) => {
  return (
    <div className="model-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0"
      }}
    >
      <div>{children}</div>
    </div>
  );
};

export default Modal;
