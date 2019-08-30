import React, { useState, useEffect, useContext } from "react";

import PublicMap from "./PublicMap";
import { PublicMapProvider } from "../context/PublicMapContext";

function Home({ setShowAuth, setShowLogin, setShowRegister }) {
  return (
    <div style={{ width: "100%" }}>
      <PublicMapProvider>
        <PublicMap
          setShowAuth={setShowAuth}
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
        />
      </PublicMapProvider>
    </div>
  );
}

export default Home;
