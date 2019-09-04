import React, { useReducer, createContext } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";

import {
  GET_USER_LOCATIONS,
  GET_SELECTED_ADDRESS,
  GET_PUBLIC_COORDINATES,
  GET_USER_COORDINATES,
  GET_PUBLIC_MAP_DATA,
  GET_PRIVATE_MAP_DATA,
  SET_PRIVATE_VIEWPORT,
  SET_PUBLIC_VIEWPORT,
  GET_ALERT_DATA
} from "./fireDataTypes";

const DSbaseURL = "https://fire-data-api.herokuapp.com";

const token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

const fireDataReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_LOCATIONS:
      return {
        ...state,
        userLocations: action.payload
      };
    case GET_SELECTED_ADDRESS:
      return {
        ...state,
        addresses: action.payload
      };
    case GET_PUBLIC_COORDINATES:
      return {
        ...state,
        publicCoordinates: action.payload
      };
    case GET_USER_COORDINATES:
      return {
        ...state,
        userCoordinates: [...state.userCoordinates, action.payload]
      };
    case GET_PUBLIC_MAP_DATA:
      return {
        ...state,
        publicMapData: action.payload
      };
    case GET_PRIVATE_MAP_DATA:
      return {
        ...state,
        privateMapData: action.payload
      };
    case SET_PUBLIC_VIEWPORT:
      return {
        ...state,
        publicMapViewport: action.payload
      };
    case SET_PRIVATE_VIEWPORT:
      return {
        ...state,
        privateMapViewport: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export const FireDataContext = createContext();

export const FireDataProvider = ({ children }) => {
  const [fireDataState, dispatch] = useReducer(fireDataReducer, {
    userLocations: [],
    addresses: [],
    publicCoordinates: {},
    publicRadius: 500,
    userCoordinates: [],
    publicMapData: {},
    publicMapViewport: {
      width: "100%",
      height: "100vh",
      latitude: 37.7749,
      longitude: -122.4194,
      zoom: 8
    },
    privateMapData: {},
    privateMapViewport: {
      width: "100%",
      height: "100vh",
      latitude: 37.7749,
      longitude: -122.4194,
      zoom: 8
    }
  });

  const getUserLocations = () => {
    axiosWithAuth()
      .get("locations")
      .then(res => {
        dispatch({
          type: GET_USER_LOCATIONS,
          payload: res.data
        });
      });
  };

  const getCoordinates = address => {
    if (address) {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.address}.json?access_token=${token}`
        )
        .then(res => {
          dispatch({
            type: GET_PUBLIC_COORDINATES,
            payload: {
              address_label: address.address_label,
              latitude: res.data.features[0].center[1],
              longitude: res.data.features[0].center[0]
            }
          });
        });
    } else {
      fireDataState.userLocations.forEach(loc => {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc.address}.json?access_token=${token}`
          )
          .then(res => {
            dispatch({
              type: GET_USER_COORDINATES,
              payload: {
                address_label: loc.address_label,
                latitude: res.data.features[0].center[1],
                longitude: res.data.features[0].center[0],
                radius: loc.radius,
                id: loc.id
              }
            });
          });
      });
    }
  };

  const getPublicMapData = () => {
    console.log(fireDataState.publicCoordinates);
    axios
      .post(`${DSbaseURL}/check_fires`, {
        user_coords: [
          fireDataState.publicCoordinates.longitude,
          fireDataState.publicCoordinates.latitude
        ],
        distance: fireDataState.publicRadius
      })
      .then(res => {
        dispatch({
          type: GET_PUBLIC_MAP_DATA,
          payload: res.data
        });
      });
  };

  const getPrivateMapData = id => {
    let selection = fireDataState.userCoordinates.filter(
      item => item.id === id
    );

    selection = selection[0];

    console.log(selection);

    axios
      .post(`${DSbaseURL}/check_fires`, {
        user_coords: [selection.longitude, selection.latitude],
        distance: selection.radius
          ? selection.radius
          : fireDataState.publicRadius
      })
      .then(res => {
        dispatch({
          type: GET_PRIVATE_MAP_DATA,
          payload: res.data
        });
      });
  };

  return (
    <FireDataContext.Provider
      value={{
        fireDataState,
        dispatch,
        getUserLocations,
        getPublicMapData,
        getCoordinates,
        getPrivateMapData
      }}
    >
      {children}
    </FireDataContext.Provider>
  );
};
