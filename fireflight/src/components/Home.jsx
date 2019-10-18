import React from "react";

import PublicMap from "./PublicMap";

function Home({ setShowAuth, setShowLogin, setShowRegister, setShowAuthForms, setLoginFormStatus, setRegisterFormStatus }) {
  return (
    <div style={{ width: "100%" }}>
      <PublicMap
        setShowAuth={setShowAuth}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
        setShowAuthForms={setShowAuthForms}
        setLoginFormStatus={setLoginFormStatus}
        setRegisterFormStatus={setRegisterFormStatus}
      />
    </div>
  );
}

export default Home;
