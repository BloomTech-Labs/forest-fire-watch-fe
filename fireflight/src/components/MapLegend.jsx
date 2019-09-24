import React, { useState } from "react";

import fireIcon from "../images/fireIcon.png";
import exclamationMark from "../images/exclaim.png";
import locationIcon from "../images/locationIcon.png";
import locationIconGreen from "../images/locationIconGreen.png";

const MapLegend = () => {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className="legend-container">
      <h4
        style={{
          textAlign: "center",
          padding: 10,
          margin: 0,
          cursor: "pointer"
        }}
        onClick={() => setShowLegend(!showLegend)}
      >
        * Legend *
      </h4>
      <div
        style={{
          display: showLegend ? "flex" : "none",
          flexDirection: "column"
        }}
      >
        <span className="legend-item">
          <h5 className="legend-text">Temp. Location Marker:</h5>
          <img
            src={locationIcon}
            height="25"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 10px)" }}
            alt="Temporary location marker"
          />
        </span>
        <span className="legend-item">
          <h5 className="legend-text">Saved Location Marker:</h5>
          <img
            src={locationIconGreen}
            height="25"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 10px)" }}
            alt="Saved location marker"
          />
        </span>
        <span className="legend-item">
          <h5 className="legend-text">Wildfire Marker:</h5>
          <img
            src={fireIcon}
            height="20"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 10px)" }}
            alt="Wildfire marker"
          />
        </span>
        <span className="legend-item">
          <h5 className="legend-text">Fire Within Radius:</h5>
          <img
            src={exclamationMark}
            height="20"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 10px)" }}
            alt="Fire within radius"
          />
        </span>
        <p className="legend-info">
          Location markers can be clicked. There are actions available on the
          Temp. Location Marker that will allow you to save that location to
          your profile. Once saved, you can choose to receive alerts for that
          location and adjust the alert radius.
        </p>
      </div>
    </div>
  );
};

export default MapLegend;
