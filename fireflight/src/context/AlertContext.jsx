import React, { useReducer, createContext } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import { GET_COORDS } from "./types";

const token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

const alertReducer = (state, action) => {
  switch (action.type) {
    case GET_COORDS:
      return {
        ...state,
        coords: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export const AlertContext = createContext();

export const AlertProvider = props => {
  const [alertState, dispatch] = useReducer(alertReducer, {
    coords: []
  });

  const getCoords = () => {
    let locations = [];
    let coords = [];
    axiosWithAuth()
      .get("locations")
      .then(res => {
        res.data.forEach(loc => {
          locations.push(loc.address);
        });
        locations.forEach(loc => {
          axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=${token}`
            )
            .then(res => {
              coords.push({
                address: loc,
                lat: res.data.features[0].center[1],
                long: res.data.features[0].center[0]
              });
              dispatch({
                type: GET_COORDS,
                payload: coords
              });
            });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <AlertContext.Provider value={{ alertState, dispatch, getCoords }}>
      {props.children}
    </AlertContext.Provider>
  );
};
