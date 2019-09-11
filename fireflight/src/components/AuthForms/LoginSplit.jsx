import React from "react";

const LoginSplit = ({ toggle }) => {
  return (
    <div className="split-wrapper login-split">
      <div className="split-content">
        <h1>Make plans now for wildfire season</h1>
        <p>Take control of you and your family's well-being.</p>
        <button className="split-btn" onClick={() => toggle()}>Create Account</button>
      </div>
    </div>
  );
};

export default LoginSplit;