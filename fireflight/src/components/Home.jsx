import React, { useState, useEffect, useContext } from "react";

import PublicMap from "./PublicMap";
import { PublicMapProvider } from "../context/PublicMapContext";

function Home() {
  return (
    <PublicMapProvider>
      <PublicMap />
    </PublicMapProvider>
  );
}

export default Home;
