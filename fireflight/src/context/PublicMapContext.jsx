import React, { useReducer, createContext } from "react";
import axios from "axios";
import { SET_VIEWPORT, SET_ADDRESS } from "./types";

const token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

const publicMapReducer = (state, action) => {
  switch (action.type) {
    case SET_VIEWPORT:
      return {
        ...state,
        viewport: action.payload
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export const PublicMapContext = createContext();

export const PublicMapProvider = props => {
  const [publicMapState, dispatch] = useReducer(publicMapReducer, {
    viewport: {
      width: "100%",
      height: "95vh",
      latitude: 37.7749,
      longitude: -122.4194,
      zoom: 8
    },
    address: "",
    coordinates: {},
    fireData: []
  });

  const setViewport = newViewport => {
    dispatch({
      type: SET_VIEWPORT,
      payload: newViewport
    });
  };

  const setAddress = address => {
    dispatch({
      type: SET_ADDRESS,
      payload: address
    });
  };

  return (
    <PublicMapContext.Provider
      value={{
        publicMapState,
        dispatch,
        setViewport,
        setAddress
      }}
    >
      {props.children}
    </PublicMapContext.Provider>
  );
};
