import React, { useReducer, createContext, useContext } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import { GlobalContext } from "./contextProvider";
import { Marker } from "react-map-gl";
import { haversineDistance } from "../utils/haversineDistance";

import fireIcon from "../images/fireIcon.png";
import exclamationMark from "../images/exclaim.png";
import locationIcon from "../images/locationIcon.png";

import {
  GET_USER_LOCATIONS,
  GET_SELECTED_ADDRESS,
  GET_PUBLIC_COORDINATES,
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
        publicCoordinates: action.payload[0],
        publicCoordinatesMarker: action.payload[1],
        localFireMarkers: action.payload[2]
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
        allFires: action.payload[0],
        allFireMarkers: action.payload[1]
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
    publicCoordinatesMarker: [],
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
    allFires: [],
    allFireMarkers: [],
    localFires: [],
    localFireMarkers: []
  });

  const getAllFires = () => {
    axios
      .get(`${DSbaseURL}/all_fires`)
      .then(res => {
        const localArray = res.data.Fires.map((fire, index) => (
          <Marker latitude={fire[1]} longitude={fire[0]} key={fire[0] + index}>
            <img
              src={fireIcon}
              height="35"
              width="35"
              style={{ zIndex: 3, transform: "translate(-17.5px, -35px)" }}
              // onClick={e => {
              //   setSelectedFire(fire[0]);
              // }}
            />
          </Marker>
        ));

        dispatch({
          type: SET_ALL_FIRES,
          payload: [res.data.Fires, localArray]
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
          let localArray = [];

          fireDataState.allFires.forEach(fire => {
            let distance = haversineDistance(
              [res.data.features[0].center[1], res.data.features[0].center[0]],
              [fire[1], fire[0]],
              true
            );

            if (distance <= 500) {
              localArray.push(fire);
            }
          });

          const localMarkers = localArray.map((fire, index) => (
            <Marker
              latitude={fire[1]}
              longitude={fire[0]}
              key={"localMarker" + fire[0] + index}
            >
              <img
                src={exclamationMark}
                height="25"
                width="35"
                style={{ zIndex: 3, transform: "translate(-17.5px, -52px)" }}
                // onClick={e => {
                //   setSelectedFire(fire[0]);
                // }}
              />
            </Marker>
          ));

          dispatch({
            type: GET_PUBLIC_COORDINATES,
            payload: [
              {
                latitude: res.data.features[0].center[1],
                longitude: res.data.features[0].center[0]
              },
              <Marker
                latitude={res.data.features[0].center[1]}
                longitude={res.data.features[0].center[0]}
              >
                <img
                  src={locationIcon}
                  height="35"
                  width="20"
                  style={{ zIndex: -1, transform: "translate(-10px, -35px)" }}
                />
              </Marker>,
              localMarkers
            ]
          });
        });
    }
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
