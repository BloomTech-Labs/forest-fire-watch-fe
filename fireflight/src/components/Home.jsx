import React, { useState, useEffect, useContext } from "react";

import PublicMap from "./PublicMap";
import { MapProvider } from "../context/MapContext";

function Home() {
  return (
    <div>
      <MapProvider>
        <PublicMap />
      </MapProvider>
    </div>
  );
}

export default Home;
