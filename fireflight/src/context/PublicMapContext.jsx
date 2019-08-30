import React, { useReducer, createContext } from "react";
import axios from "axios";
import {
  SET_VIEWPORT,
  SET_ADDRESS,
  SET_FIRE_DATA,
  SET_COORDINATES,
  SET_TRIGGER
} from "./types";

const DSbaseURL = "https://fire-data-api.herokuapp.com";

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
    case SET_COORDINATES:
      return {
        ...state,
        coordinates: action.payload
      };
    case SET_FIRE_DATA:
      return {
        ...state,
        fireData: action.payload
      };
    case SET_TRIGGER:
      return {
        ...state,
        trigger: action.payload
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
      height: "100vh",
      latitude: 37.7749,
      longitude: -122.4194,
      zoom: 8
    },
    address: "",
    coordinates: {},
    fireData: [],
    trigger: false
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

  const getData = () => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${publicMapState.address}.json?access_token=${token}`
      )
      .then(res => {
        setViewport({
          width: "100%",
          height: "100vh",
          latitude: res.data.features[0].center[1],
          longitude: res.data.features[0].center[0],
          zoom: 5
        });
        dispatch({
          type: SET_COORDINATES,
          payload: {
            latitude: res.data.features[0].center[1],
            longitude: res.data.features[0].center[0]
          }
        });
        axios
          .post(`${DSbaseURL}/check_fires`, {
            user_coords: [
              res.data.features[0].center[0],
              res.data.features[0].center[1]
            ],
            distance: 500
          })
          .then(res => {
            if (res.data.Alert) {
              let fires = res.data.Fires.map(fire => {
                return {
                  distance: fire[1],
                  latitude: fire[0][1],
                  longitude: fire[0][0]
                };
              });
              dispatch({
                type: SET_FIRE_DATA,
                payload: fires
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
  };

  const setTrigger = () => {
    if (publicMapState.trigger === false) {
      setTimeout(() => {
        dispatch({
          type: SET_TRIGGER,
          payload: true
        });
      }, 5000);
    } else {
      dispatch({
        type: SET_TRIGGER,
        payload: false
      });
    }
  };

  return (
    <PublicMapContext.Provider
      value={{
        publicMapState,
        dispatch,
        setViewport,
        setAddress,
        getData,
        setTrigger
      }}
    >
      {props.children}
    </PublicMapContext.Provider>
  );
};
