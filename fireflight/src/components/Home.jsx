import React from "react";

import PublicMap from "./PublicMap";
import MapLegend from "./MapLegend";

function Home({ setShowAuthForms, setLoginFormStatus, setRegisterFormStatus }) {
  return (
    <div style={{ width: "100%" }}>
      <PublicMap
        setShowAuthForms={setShowAuthForms}
        setLoginFormStatus={setLoginFormStatus}
        setRegisterFormStatus={setRegisterFormStatus}
      />
      <MapLegend />
    </div>
  );
}

export default Home;
