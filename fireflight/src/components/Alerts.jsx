import React, { useState, useEffect, useContext } from "react";

import { AlertContext } from "../context/AlertContext";

const Alerts = () => {
  const { alertState, getLocations, getCoords, getData } = useContext(
    AlertContext
  );
  const { locations } = alertState;

  console.log("Alerts:", alertState);

  useEffect(() => {
    getCoords();
  }, []);

  return <div>ALERTS</div>;
};

export default Alerts;
