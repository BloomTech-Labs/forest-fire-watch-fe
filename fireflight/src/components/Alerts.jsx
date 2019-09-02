import React, { useState, useEffect, useContext } from "react";

import { AlertContext } from "../context/AlertContext";

const Alerts = () => {
  const { alertState, getCoords } = useContext(AlertContext);
  const { fireData } = alertState;

  console.log(fireData);

  useEffect(() => {
    getCoords();
  }, []);

  let myAlerts;

  if (fireData.length > 0) {
    myAlerts = (
      <div>
        {/* {fireData.forEach(data => (
        <h4>{data.address}</h4>
        
      ))} */}
        There are active fires in your area
      </div>
    );
  } else {
    myAlerts = <p>There are no active wildfires in your area.</p>;
  }

  return <div>{myAlerts}</div>;
};

export default Alerts;
