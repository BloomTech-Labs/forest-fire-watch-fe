import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { Popup } from "react-map-gl";
import styled from "styled-components";

import { FireDataContext } from "../context/FireDataContext";
import MapLegend from "./MapLegend";
import Navigation from "../components/Navigation";

// mapbox API token
const token = process.env.REACT_APP_MAPBOX_TOKEN;

const PublicMap = ({
  setShowAuthForms,
  setLoginFormStatus,
  setRegisterFormStatus
}) => {
  const {
    fireDataState,
    setPublicViewport,
    getCoordinates,
    closeSelectedMarker,
    deleteLocationMarker,
    saveLocationMarker,
    toggleNotification,
    deleteUserLocation,
    updatePopupRadius
  } = useContext(FireDataContext);
  const {
    publicMapViewport,
    allFireMarkers,
    publicCoordinatesMarker,
    localFireMarkers,
    selectedMarker,
    userLocationMarkers,
    userLocalFireMarkers
  } = fireDataState;

  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState("");
  const [popupRadius, setPopupRadius] = useState("");

  // Add event listener to window - close whatever
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        closeSelectedMarker();
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (address) {
      getCoordinates(address, radius);
    }
  };

  const tempLocationPopup = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>Want to save this location?</p>
      <button
        className="save-location-btn"
        onClick={e => {
          saveLocationMarker();
          deleteLocationMarker();
        }}
      >
        Click here
      </button>
      <button onClick={e => deleteLocationMarker()}>Delete this pin</button>
    </div>
  );

  const savedLocationPopup = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span
        style={{
          marginBottom: "6px",
          textAlign: "center",
          textTransform: "uppercase"
        }}
      >
        {selectedMarker[2]}
      </span>
      <b />
      <span style={{ marginBottom: "6px", textAlign: "center" }}>
        {" "}
        Alert Radius: {selectedMarker[3]}mi{" "}
      </span>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <span>Toggle Notifications:</span>
        <div className="checkbox-wrapper">
          <CheckBox
            onChange={() => {
              toggleNotification();
            }}
            checked={selectedMarker[6]}
            id="checkbox"
            type="checkbox"
          />
          <CheckBoxLabel htmlFor="checkbox" />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <FormRadiusInput
          type="text"
          name="PopupRadius"
          placeholder="Radius (miles)"
          value={popupRadius}
          onChange={e => setPopupRadius(e.target.value)}
          style={{ height: 8, width: 110, fontSize: 14, margin: "0 10px 0 0" }}
        />
        <button
          onClick={() => {
            updatePopupRadius(popupRadius);
          }}
          style={{ marginTop: 3, height: 24 }}
        >
          Set Alert Radius
        </button>
      </div>
      <button
        onClick={() => {
          deleteUserLocation();
        }}
        style={{ marginTop: 6 }}
      >
        Delete this pin
      </button>
    </div>
  );

  const fireLocationPopup = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      THIS IS A FIRE
    </div>
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MapLegend />
      <div className="public-container">
        <Navigation
          toggleAuthForms={setShowAuthForms}
          toggleLoginStatus={setLoginFormStatus}
          toggleRegisterStatus={setRegisterFormStatus}
        />
        <form onSubmit={handleSubmit} className="map-form-container">
          <label className="map-form-text">
            Enter the address you wish to check fire proximity to.
          </label>
          <input
            className="address-input"
            type="text"
            name="Address"
            placeholder="Enter address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <input
            className="radius-input"
            type="number"
            name="Radius"
            placeholder="mi"
            value={radius}
            onChange={e => setRadius(e.target.value)}
          />
          <button className="form-btn">Search</button>
          {localStorage.getItem("token") == null && (
            <React.Fragment>
              <label className="signup-form-text">
                to save addresses and receive notifications
              </label>
              <button className="signup-btn">Sign Up</button>
            </React.Fragment>
          )}
        </form>
        {/* End Form Container */}
      </div>

      <ReactMapGL
        {...publicMapViewport}
        width="100%"
        // height="100%"
        mapboxApiAccessToken={token}
        onViewportChange={publicMapViewport => {
          const { width, height } = publicMapViewport;
          setPublicViewport(publicMapViewport);
        }}
        mapStyle="mapbox://styles/astillo/ck1s93bpe5bnk1cqsfd34n8ap"
      >
        {allFireMarkers}
        {userLocalFireMarkers}
        {localFireMarkers}

        {userLocationMarkers}
        {publicCoordinatesMarker}
        {selectedMarker.length > 0 ? (
          <Popup
            closeOnClick={false}
            anchor="top"
            latitude={selectedMarker[0]}
            longitude={selectedMarker[1]}
            onClose={() => {
              closeSelectedMarker();
            }}
          >
            {selectedMarker[4] === "savedLocation" && savedLocationPopup}
            {selectedMarker[4] === "tempLocation" && tempLocationPopup}
            {selectedMarker[4] === "fireLocation" && fireLocationPopup}
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default PublicMap;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const FormRadiusInput = styled.input`
  width: 150px;
  margin: 25px 17.5px 5px 10px;
  padding: 10px;
  font-size: 1em;
  background-color: white;
  border-radius: 5px;
  border: solid 1px black;
  @media (max-width: 576px) {
    width: 200px;
    padding: 8px;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;
