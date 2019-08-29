import React, { useReducer, createContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import {
  SET_VIEWPORT,
  SET_ADDRESS,
  SET_COORDS,
  GET_FIRES_SUCCESS,
  GET_FIRES_ERROR,
  GET_FIRES_START
} from "./types";

const mapReducer = (state, action) => {
  switch (action.type) {
    case SET_VIEWPORT:
      return {
        ...state,
        viewport: action.payload
      };
    case SET_COORDS:
      return {
        ...state,
        userCoordinates: action.payload,
        viewport: {
          ...state.viewport,
          longitude: action.payload.longitude,
          latitude: action.payload.latitude
        }
      };
    case SET_ADDRESS:
      return {
        ...state,
        userAddress: action.payload
      };
    case GET_FIRES_SUCCESS:
      return {
        ...state,
        fireData: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export const MapContext = createContext();

export const MapProvider = props => {
  const [state, dispatch] = useReducer(mapReducer, {
    viewport: {
      width: "100%",
      height: window.innerWidth < 900 ? 350 : 500,
      latitude: 0,
      longitude: 0,
      zoom: 8
    },
    userAddress: "",
    userCoordinates: {},
    fireData: []
  });

  const token =
    process.env.REACT_APP_MAPBOX_TOKEN ||
    "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

  const setViewport = newViewport => {
    dispatch({
      type: SET_VIEWPORT,
      payload: newViewport
    });
  };

  const setCoordinates = () => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${state.userAddress}.json?access_token=${token}`
      )
      .then(res => {
        // console.log(res.data);
        // console.log(res.data.features[0].center[0]);
        // console.log(res.data.features[0].center[1]);
        dispatch({
          type: SET_COORDS,
          payload: {
            ...state.userCoordinates,
            latitude: res.data.features[0].center[1],
            longitude: res.data.features[0].center[0]
          }
        });
      });
  };

  const setAddress = () => {
    console.log("Setting address...");
    axiosWithAuth()
      .get(`locations`)
      .then(res => {
        dispatch({
          type: SET_ADDRESS,
          payload: res.data[0].address
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const DSbaseURL = "https://fire-data-api.herokuapp.com";

  const setFires = location => {
    dispatch({ type: GET_FIRES_START });
    console.log("GET_FIRES_START");
    axios
      .post(`${DSbaseURL}/check_fires`, location)
      .then(res => {
        console.log("Fetching fire data...", res);
        dispatch({ type: GET_FIRES_SUCCESS, payload: res.data.Fires });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_FIRES_ERROR, payload: err });
      });
  };

  return (
    <MapContext.Provider
      value={{
        state,
        dispatch,
        setViewport,
        setAddress,
        setCoordinates,
        setFires
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};
