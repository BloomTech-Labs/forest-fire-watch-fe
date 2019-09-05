import React from "react";

import PublicMap from "./PublicMap";

function Home({ setShowAuth, setShowLogin, setShowRegister }) {
  return (
    <div style={{ width: "100%" }}>
      <PublicMap
        setShowAuth={setShowAuth}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
      />
    </div>
  );
}

export default Home;
