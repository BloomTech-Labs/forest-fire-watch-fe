import React, { useContext, useEffect } from "react";

import { FireDataContext } from "../context/FireDataContext";

function DangerLevel() {
  const fireDataContext = useContext(FireDataContext);
  console.log(fireDataContext);

  useEffect(() => {
    fireDataContext.getUserLocations();
    // fireDataContext.getPublicMapData();
    fireDataContext.getCoordinates({
      address: "san diego california",
      address_label: null
    });
  }, []);

  useEffect(() => {
    fireDataContext.getCoordinates();
    fireDataContext.getPublicMapData();
  }, [fireDataContext.fireDataState.userLocations]);

  useEffect(() => {
    if (fireDataContext.fireDataState.userCoordinates.length > 0) {
      fireDataContext.getPrivateMapData(9);
    }
  }, [fireDataContext.fireDataState.userCoordinates]);

  return <div>Danger Level!</div>;
}

export default DangerLevel;
