import React from "react";

import PublicMap from "./PublicMap";


function Home({ setShowAuthForms, setLoginFormStatus, setRegisterFormStatus }) {
  return (
    <div style={{ width: "100%" }}>
      <PublicMap
        setShowAuthForms={setShowAuthForms}
        setLoginFormStatus={setLoginFormStatus}
        setRegisterFormStatus={setRegisterFormStatus}
      />
    </div>
  );
}

export default Home;
