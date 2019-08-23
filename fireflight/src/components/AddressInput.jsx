import React, { useState } from "react";
import useInput from "../utils/useInput";
import axios from "axios";

function AddressForm() {
  //useInput is a custom hook that should be used for all controlled inputs
  const [address, setAddress, handleAddress] = useInput("", "address");
  const [city, setCity, handleCity] = useInput("", "city");
  const [zipCode, setZipCode, handleZipCode] = useInput("", "zipCode");
  const [radius, setRadius, handleRadius] = useInput("", "radius");
  const [loading, setLoading] = useState(false);

  function resetInputs() {
    setAddress("");
    setCity("");
    setZipCode("");
    setRadius("");
  }
  function handleAddAlert(e) {
    e.preventDefault();
    setLoading(true);
    //need endpoint and data structure info from backend before writing
    // axios.post("url", location).then(res=> {
    //   console.log(res).catch(err=> {
    //     console.log(err)
    //   })
    // });
    resetInputs();
    //this function should include add an alert to the database and redirect to the dashboard showing a map centered on this address
  }
  function handleViewMap(e) {
    e.preventDefault();
    setLoading(true);
    resetInputs();
    //this function should redirect to the dashboard showing a map centered on this address
  }
  //this function should check if alert radius was added, and add to database if so or show map if not
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (radius.length > 0) {
      handleAddAlert(e);
    } else {
      handleViewMap(e);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Street Address
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleAddress}
          />
        </label>
        <label>
          City
          <input type="text" name="city" value={city} onChange={handleCity} />
        </label>
        <label>
          Zip Code
          <input
            type="number"
            name="zipCode"
            value={zipCode}
            onChange={handleZipCode}
          />
        </label>
        <button onClick={handleViewMap} disabled={loading}>
          View on Map
        </button>
        <label>
          Alert Radius
          <input
            type="number"
            name="radius"
            value={radius}
            onChange={handleRadius}
          />
          <p>miles</p>
        </label>
        <button onClick={handleAddAlert} disabled={loading}>
          Add Alert
        </button>
      </form>
    </div>
  );
}

export default AddressForm;