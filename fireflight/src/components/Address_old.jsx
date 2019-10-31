import React, { useState, useContext, useEffect } from "react";
import AddressContext from "../context/addressContextProvider";
import { GlobalContext } from "../context/contextProvider";
import NavigationProfile from "./NavigationProfile";

import Geocoder from 'react-mapbox-gl-geocoder'
// import { isArray } from "util";
import {
  Button,
  ErrorText,
  FormContainer,
  Form,
  FormSelect,
  FormTextGroup,
  GoodButton,
  FormRangeGroup
} from "../styles/Forms";

function Address(props) {
  const address = useContext(AddressContext);
  const global = useContext(GlobalContext);
  // const [addy, setAddy] = useState("");
  // const [zip, setZip] = useState("");
  // const [state, setState] = useState("");
  // const [apartment, setApartment] = useState("");
  // const [street, setStreet] = useState("");
  // const [city, setCity] = useState("");
  const [saveState, setSaveState] = useState("");
  const [id, setId] = useState(undefined);
  const [name, setName] = useState("");
  const [radius, setRadius] = useState(10);
  // const [err, setErr] = useState(undefined);

  // console.log(address);

  const testFetch = e => {
    if (e) e.preventDefault();
    address.fetchAddress().then(() => { });
  };

  const testSubmit = async e => {
    if (e) {
      e.preventDefault();
      // setZip('95969')
      // setState('CA')
      // setStreet('750 Henshaw Ave')
      // parseCSV('to')
    }

    // if (![zip, state, street, name].every(i => i.length > 0)) {
    //   setSaveState(
    //     "Please fill out Street Address, Zip Code, and State, and Give the Location a Label"
    //   );
    //   return;
    // }

    if (id == null) {
      let temp = await address.saveAddress(addy, radius, name);
      try {
        if (temp) {
          setSaveState(`Saved as ${temp.address}`);
          setZip("");
          setState("");
          setApartment("");
          setStreet("");
          setCity("");
          setRadius(10);
          setName("");
        } else {
          setSaveState("Data is undefined");
          setZip("");
          setState("");
          setApartment("");
          setStreet("");
          setCity("");
          setRadius(10);
          setName("");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      let temp = await address.updateAddress(addy, radius, name, id);
      try {
        if (temp) {
          setSaveState(`Updated as ${temp.address}`);
        } else {
          setSaveState("Server Error");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const parseCSV = async direction => {
    if (direction === "to") {
      setAddy(`${street}, ${apartment}, ${city}, ${state}, ${zip}`);
    } else {
      if (addy.length > 0) {
        let temp = addy.split(",").map(s => s.trim());
        setStreet(temp[0]);
        setApartment(temp[1]);
        setCity(temp[2]);
        setState(temp[3]);
        setZip(temp[4]);
      }
    }
  };

  useEffect(() => {
    parseCSV("to");
    return e => {
      parseCSV("to");
    };
  }, [street, zip, apartment, state, city]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let temp = await global.state.remote.fetchLocations();
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const edit = e => {
    if (e.target.value === -1) {
      setZip("");
      setState("");
      setApartment("");
      setStreet("");
      setId(null);
      setRadius(10);
      setName("");
    } else {
      let temp = address.state.addresses.filter(i => {
        return i.id === e.target.value;
      })[0];
      setId(temp.id);
      setRadius(temp.radius);
      setName(temp.address_label || "");
      temp = temp.address.split(",").map(i => i.trim());
      setStreet(temp[0]);
      setApartment(temp[1]);
      setCity(temp[2]);
      setState(temp[3]);
      setZip(temp[4]);
    }
  };

  const remove = async e => {
    e.preventDefault();
    try {
      let res = await global.state.remote.deleteLocation(id);
      res = global.state.remote.fetchLocations();
      setZip("");
      setState("");
      setApartment("");
      setStreet("");
      setId(null);
      setRadius(1);
      setName("");
      setSaveState("Deleted");
      address.reset();
    } catch (err) {
      setSaveState(err);
    }
  };

  return (
    <FormContainer>
      <NavigationProfile />
      {/* <>
                <button onClick={testSubmit}>
                    test submit
                </button>
                <button onClick={testFetch}>
                    test fetch
                </button>
                <br></br>
            </> */}
      <FormSelect onChange={edit}>
        <option value={-1}>Add an Address</option>
        {address.state.addresses.map(i => (
          <option value={i.id} key={i.id}>
            {i.address_label || i.address}
          </option>
        ))}
      </FormSelect>
      <Form onSubmit={testSubmit}>
        <FormTextGroup>
          <div>Label :</div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormTextGroup>
        <FormTextGroup>
          <div>Street Address :</div>
          <input
            type="text"
            name="street"
            value={street}
            onChange={e => {
              setStreet(e.target.value);
            }}
          />
        </FormTextGroup>
        <FormTextGroup>
          <div>Apartment Number :</div>
          <input
            type="text"
            name="apartment"
            value={apartment}
            onChange={e => setApartment(e.target.value)}
          />
        </FormTextGroup>
        <FormTextGroup>
          <div>City :</div>
          <input
            type="text"
            name="city"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </FormTextGroup>
        <FormTextGroup>
          <div>State :</div>
          <input
            type="text"
            name="state"
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </FormTextGroup>
        <FormTextGroup>
          <div>Zip Code :</div>
          <input
            type="number"
            name="zip"
            value={zip}
            onChange={e => setZip(e.target.value)}
          />
        </FormTextGroup>
        <FormRangeGroup>
          <div>Radius :</div>
          <input
            type="range"
            name="radius"
            value={radius}
            onChange={e => setRadius(e.target.value)}
            min="10"
            step="1"
          />
          <br />
          <div>{radius} miles</div>
        </FormRangeGroup>
        <GoodButton type="submit">Save Location</GoodButton>
        <br />
        <Button onClick={remove}>Delete</Button>
      </Form>
      <ErrorText>{saveState}</ErrorText>
    </FormContainer>
  );
}

export default Address;
