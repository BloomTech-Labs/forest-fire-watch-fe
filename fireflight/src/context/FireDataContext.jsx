import React, { useReducer, createContext, useContext } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import { GlobalContext } from "./contextProvider";

import {
  GET_USER_LOCATIONS,
  GET_SELECTED_ADDRESS,
  GET_PUBLIC_COORDINATES,
  GET_USER_COORDINATES,
  GET_PUBLIC_MAP_DATA,
  GET_PRIVATE_MAP_DATA,
  SET_PRIVATE_VIEWPORT,
  SET_PUBLIC_VIEWPORT,
  GET_ALERT_DATA,
  SET_ALERT_VIEWED,
  SET_SHOW_ALERT,
  SET_TRIGGER_REGISTRATION_BUTTON,
  SET_ALL_FIRES
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
        userCoordinates: action.payload
      };
    case GET_PUBLIC_MAP_DATA:
      return {
        ...state,
        publicMapViewport: action.viewport
      };
    case GET_PRIVATE_MAP_DATA:
      return {
        ...state,
        privateMapData: action.payload,
        privateMapViewport: action.viewport
      };
    case SET_PRIVATE_VIEWPORT:
      return {
        ...state,
        privateMapViewport: action.payload
      };
    case SET_PUBLIC_VIEWPORT:
      return {
        ...state,
        publicMapViewport: action.payload
      };
    case SET_TRIGGER_REGISTRATION_BUTTON:
      return {
        ...state,
        triggerRegistrationButton: action.payload
      };
    case GET_ALERT_DATA:
      return {
        ...state,
        alertData: [
          ...state.alertData,
          !state.alertData.includes(action.payload) ? action.payload : null
        ]
      };
    case SET_ALERT_VIEWED:
      return {
        ...state,
        alertViewed: action.payload
      };
    case SET_SHOW_ALERT:
      return {
        ...state,
        showAlert: action.payload
      };
    case SET_ALL_FIRES:
      return {
        ...state,
        allFires: action.payload
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
      latitude: 39.8283,
      longitude: -98.5795,
      zoom: 3.3
    },
    privateMapData: {},
    privateMapViewport: {
      width: "100%",
      height: window.innerWidth < 900 ? 350 : 500,
      latitude: 37.7749,
      longitude: -122.4194,
      zoom: 7
    },
    triggerRegistrationButton: false,
    alertData: [],
    alertViewed: false,
    showAlert: false,
    allFires: []
  });

  const getAllFires = () => {
    axios
      .get(`${DSbaseURL}/all_fires`)
      .then(res => {
        dispatch({
          type: SET_ALL_FIRES,
          payload: res.data.Fires
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
      let payload = [];
      fireDataState.userLocations.forEach(loc => {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc.address}.json?access_token=${token}`
          )
          .then(res => {
            payload.push({
              address_label: loc.address_label,
              address: loc.address,
              latitude: res.data.features[0].center[1],
              longitude: res.data.features[0].center[0],
              radius: loc.radius,
              id: loc.id
            });
          });
      });
      dispatch({
        type: GET_USER_COORDINATES,
        payload: payload
      });
    }
  };

  const getPublicMapData = () => {
    dispatch({
      type: GET_PUBLIC_MAP_DATA,
      viewport: {
        width: "100%",
        height: "100vh",
        latitude: fireDataState.publicCoordinates.latitude,
        longitude: fireDataState.publicCoordinates.longitude,
        zoom: 3.3
      }
    });
  };

  const getPrivateMapData = id => {
    let selection = fireDataState.userCoordinates.filter(item => item.id == id);
    selection = selection[0];

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
          payload: {
            ...res.data,
            latitude: selection.latitude,
            longitude: selection.longitude,
            radius: selection.radius
              ? selection.radius
              : fireDataState.publicRadius
          },
          viewport: {
            width: "100%",
            height: window.innerWidth < 900 ? 350 : 500,
            latitude: selection.latitude,
            longitude: selection.longitude,
            zoom: 7
          }
        });
      });
  };

  const setPrivateViewport = viewport => {
    dispatch({
      type: SET_PRIVATE_VIEWPORT,
      payload: viewport
    });
  };

  const setPublicViewport = viewport => {
    dispatch({
      type: SET_PUBLIC_VIEWPORT,
      payload: viewport
    });
  };

  const setTriggerRegistrationButton = () => {
    if (!localStorage.getItem("token")) {
      if (fireDataState.triggerRegistrationButton === false) {
        setTimeout(() => {
          dispatch({
            type: SET_TRIGGER_REGISTRATION_BUTTON,
            payload: true
          });
        }, 5000);
      }
    }
  };

  const getAlertData = () => {
    fireDataState.userCoordinates.forEach(coord => {
      axios
        .post(`${DSbaseURL}/check_fires`, {
          user_coords: [coord.longitude, coord.latitude],
          distance: coord.radius
        })
        .then(res => {
          if (res.data.Alert) {
            dispatch({
              type: GET_ALERT_DATA,
              payload: coord.address
            });
          }
        });
    });
  };

  const setAlertViewed = change => {
    dispatch({
      type: SET_ALERT_VIEWED,
      payload: change
    });
  };

  const setShowAlert = change => {
    dispatch({
      type: SET_SHOW_ALERT,
      payload: change
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
        getPrivateMapData,
        setPublicViewport,
        setPrivateViewport,
        setTriggerRegistrationButton,
        getAlertData,
        setAlertViewed,
        setShowAlert,
        getAllFires
      }}
    >
      {children}
    </FireDataContext.Provider>
  );
};
