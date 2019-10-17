import React, { useReducer, createContext } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import { Marker } from "react-map-gl";
import { haversineDistance } from "../utils/haversineDistance";

import fireIcon from "../images/fireIcon.svg";
import exclamationMark from "../images/exclaim.png";
import locationIcon from "../images/locationIcon.svg";
import locationIconGreen from "../images/locationIconGreen.svg";

import {
  GET_USER_LOCATIONS,
  GET_SELECTED_ADDRESS,
  GET_PUBLIC_COORDINATES,
  SET_PUBLIC_VIEWPORT,
  SET_TRIGGER_REGISTRATION_BUTTON,
  SET_ALL_FIRES,
  SET_SELECTED_MARKER,
  SET_SAVED_LOCATION,
  DELETE_LOCATION_MARKER,
  SET_USER_LOCATIONS,
  TOGGLE_NOTIFICATIONS
} from "./fireDataTypes";

const DSbaseURL = "https://wildfirewatch.herokuapp.com";
// const DSbaseURL = "https://fire-data-api.herokuapp.com";
// const DSbaseURL = "https://test-fire-api.herokuapp.com";

const token = process.env.REACT_APP_MAPBOX_TOKEN || "keep it secret, fool";

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
    case SET_PUBLIC_VIEWPORT:
      return {
        ...state,
        publicMapViewport: action.payload
      };
    case SET_ALL_FIRES:
      return {
        ...state,
        allFires: action.payload[0],
        allFireMarkers: action.payload[1]
      };
    case SET_SELECTED_MARKER:
      return {
        ...state,
        selectedMarker: action.payload
      };
    case SET_SAVED_LOCATION: // FINISH THIS //
      return {
        ...state,
        selectedMarker: [],
        userLocationMarkers: action.payload
      };
    case DELETE_LOCATION_MARKER:
      return {
        ...state,
        publicCoordinatesMarker: [],
        selectedMarker: [],
        localFireMarkers: []
      };
    case SET_USER_LOCATIONS:
      return {
        ...state,
        userLocationMarkers: action.payload[0],
        userLocalFireMarkers: action.payload[1]
      };
    case TOGGLE_NOTIFICATIONS:
      return {
        ...state,
        selectedMarker: [
          state.selectedMarker[0],
          state.selectedMarker[1],
          state.selectedMarker[2],
          state.selectedMarker[3],
          state.selectedMarker[4],
          state.selectedMarker[5],
          !state.selectedMarker[6]
        ]
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
    allFires: [],
    allFireMarkers: [],
    localFires: [],
    localFireMarkers: [],
    selectedMarker: [],
    selectedMarkerAddress: [],
    userLocationMarkers: [],
    userLocalFireMarkers: []
  });

  const getAllFires = () => {
    axios
      .get(`${DSbaseURL}/all_fires`)
      .then(res => {
        const localArray = res.data.Fires.map((fire, index) => (
          <Marker latitude={fire[1]} longitude={fire[0]} key={fire[0] + index}>
            <img
              src={fireIcon}
              height="20"
              width="15"
              style={{ zIndex: 100, transform: "translate(-10px, -9px)" }}
              alt=""
              // onClick={e => {
              //   dispatch({
              //     type: SET_SELECTED_MARKER,
              //     payload: [fire[1], fire[0], null, null, "fireLocation"]
              //   });
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

  const deleteLocationMarker = () => {
    dispatch({
      type: DELETE_LOCATION_MARKER
    });
  };

  const saveLocationMarker = () => {
    const theToken = localStorage.getItem("token");

    if (theToken) {
      axiosWithAuth()
        .post("locations", {
          address: fireDataState.selectedMarker[2],
          radius: fireDataState.selectedMarker[3]
        })
        .then(res => {
          dispatch({
            type: SET_SAVED_LOCATION,
            payload: [
              ...fireDataState.userLocationMarkers,
              <Marker
                latitude={fireDataState.selectedMarker[0]}
                longitude={fireDataState.selectedMarker[1]}
                key={`greenMarker${fireDataState.selectedMarker[0]}`}
              >
                <img
                  src={locationIconGreen}
                  height="35"
                  width="20"
                  style={{ zIndex: 5, transform: "translate(-17.5px, -35px)" }}
                  alt=""
                  onClick={e => {
                    dispatch({
                      type: SET_SELECTED_MARKER,
                      payload: [
                        fireDataState.selectedMarker[0],
                        fireDataState.selectedMarker[1],
                        fireDataState.selectedMarker[2],
                        fireDataState.selectedMarker[3],
                        "savedLocation"
                      ]
                    });
                  }}
                />
              </Marker>
            ]
          });
        });
    } else {
      alert("Please log in to save a location.");
    }
  };

  const getCoordinates = (address, radius) => {
    if (address) {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}`
        )
        .then(res => {
          let localArray = [];

          fireDataState.allFires.forEach(fire => {
            let distance = haversineDistance(
              [res.data.features[0].center[1], res.data.features[0].center[0]],
              [fire[1], fire[0]],
              true
            );

            if (distance <= radius) {
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
                height="20"
                width="27"
                style={{ zIndex: 3, transform: "translate(-15px, -29px)" }}
                alt=""
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
                  style={{ zIndex: 5, transform: "translate(-7.5px, -35px)" }}
                  alt=""
                  onClick={e => {
                    dispatch({
                      type: SET_SELECTED_MARKER,
                      payload: [
                        res.data.features[0].center[1],
                        res.data.features[0].center[0],
                        address,
                        radius,
                        "tempLocation"
                      ]
                    });
                  }}
                />
              </Marker>,
              localMarkers
            ]
          });
        });
    }
  };

  const deleteUserLocation = () => {
    axiosWithAuth()
      .delete(`locations/${fireDataState.selectedMarker[5]}`)
      .then(res => {
        dispatch({
          type: SET_SELECTED_MARKER,
          payload: []
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const setNotificationStatus = () => {
    console.log("before axios: ", fireDataState.selectedMarker);
    axiosWithAuth()
      .put(`locations/${fireDataState.selectedMarker[5]}`, {
        notifications: fireDataState.selectedMarker[6]
      })
      .then(res => {
        console.log(res);
        console.log("after axios: ", fireDataState.selectedMarker);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleNotification = () => {
    dispatch({
      type: TOGGLE_NOTIFICATIONS
    });
    console.log("before axios: ", fireDataState.selectedMarker);
    axiosWithAuth()
      .put(`locations/${fireDataState.selectedMarker[5]}`, {
        notifications: !fireDataState.selectedMarker[6]
      })
      .then(res => {
        console.log(res);
        console.log("after axios: ", fireDataState.selectedMarker);
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

  const setUserLocations = () => {
    axiosWithAuth()
      .get("locations")
      .then(res => {
        let localArray = [];
        // for each user location, add fires that are within the search radius to localArray
        // radius = what the user chooses as the radius in their location setting
        // distance = distance from user location and fire
        res.data.forEach(loc => {
          fireDataState.allFires.forEach(fire => {
            let distance = haversineDistance(
              [loc.latitude, loc.longitude],
              [fire[1], fire[0]], // fire latitude, fire longitude (store in variable later and refactor)
              true // in miles
            );
            if (distance <= loc.radius) {
              localArray.push(fire);
            }
          });
        });
        // fire markers - setting exclamation points on top of fire images for fires within radius of user location
        const localMarkers = localArray.map((fire, index) => (
          <Marker
            latitude={fire[1]}
            longitude={fire[0]}
            key={"localMarker" + fire[0] + index}
          >
            <img
              src={exclamationMark}
              height="20"
              width="27"
              style={{ zIndex: 3, transform: "translate(-15px, -29px)" }}
              alt=""
            />
          </Marker>
        ));
        // saved user locations
        const userLocs = res.data.map((uLoc, index) => (
          <Marker
            latitude={uLoc.latitude}
            longitude={uLoc.longitude}
            key={`greenMarker${index}${uLoc.latitude}${index}`}
          >
            <img
              src={locationIconGreen}
              height="35"
              width="20"
              style={{ zIndex: 5, transform: "translate(-7.5px, -35px)" }}
              alt=""
              onClick={e => {
                dispatch({
                  type: SET_SELECTED_MARKER,
                  payload: [
                    uLoc.latitude,
                    uLoc.longitude,
                    uLoc.address,
                    uLoc.radius,
                    "savedLocation",
                    uLoc.id,
                    uLoc.notifications
                  ]
                });
              }}
            />
          </Marker>
        ));
        dispatch({
          type: SET_USER_LOCATIONS,
          payload: [userLocs, localMarkers]
        });
      });
  };

  // the pop up when you click into a saved location
  const updatePopupRadius = param => {
    axiosWithAuth()
      .put(`locations/${fireDataState.selectedMarker[5]}`, { radius: param })
      .then(res => {
        setUserLocations();
      })
      .catch(err => {
        console.log(err);
      });
    dispatch({
      type: SET_SELECTED_MARKER,
      payload: [
        fireDataState.selectedMarker[0],
        fireDataState.selectedMarker[1],
        fireDataState.selectedMarker[2],
        param,
        fireDataState.selectedMarker[4],
        fireDataState.selectedMarker[5],
        fireDataState.selectedMarker[6]
      ]
    });
  };

  const closeSelectedMarker = () => {
    dispatch({
      type: SET_SELECTED_MARKER,
      payload: []
    });
  };

  const setPublicViewport = viewport => {
    dispatch({
      type: SET_PUBLIC_VIEWPORT,
      payload: viewport
    });
  };

  return (
    <FireDataContext.Provider
      value={{
        fireDataState,
        dispatch,
        getUserLocations,
        getCoordinates,
        setPublicViewport,
        getAllFires,
        closeSelectedMarker,
        deleteLocationMarker,
        saveLocationMarker,
        setUserLocations,
        setNotificationStatus,
        toggleNotification,
        deleteUserLocation,
        updatePopupRadius
      }}
    >
      {children}
    </FireDataContext.Provider>
  );
};
