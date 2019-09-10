import React from "react";

const RegisterSplit = ({ toggle }) => {
  return (
    <div className="split-wrapper register-split">
      <div className="split-content">
        <h1>Welcome Back!</h1>
        <p>To keep conneted with us FireFlight please sign in with your FireFlight account</p>
        <button className="split-btn" onClick={() => toggle()}>Sign In</button>
      </div>
    </div>
  );
};

export default RegisterSplit;