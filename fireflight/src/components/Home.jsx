import React, { useState, useEffect, useContext } from "react";

import PublicMap from "./PublicMap";
import { PublicMapProvider } from "../context/PublicMapContext";

function Home() {
  return (
    <div style={{ width: "100%" }}>
      <PublicMapProvider>
        <PublicMap />
      </PublicMapProvider>
    </div>
  );
}

export default Home;
