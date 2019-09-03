import React, { useReducer, createContext } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import { GET_FIREDATA, SET_SHOW_ALERT, SET_ALERT_VIEWED } from "./types";

const DSbaseURL = "https://fire-data-api.herokuapp.com";

const token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  "pk.eyJ1Ijoia2VuMTI4NiIsImEiOiJjanpuMXdlb2UwZzlkM2JsY2t2aTVkcGFoIn0.eGKKY2f3oC5s8GqsyB70Yg";

const alertReducer = (state, action) => {
  switch (action.type) {
    case GET_FIREDATA:
      return {
        ...state,
        fireData: [...state.fireData, action.payload]
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
    default:
      return {
        ...state
      };
  }
};

export const AlertContext = createContext();

export const AlertProvider = props => {
  const [alertState, dispatch] = useReducer(alertReducer, {
    fireData: [],
    alertViewed: false,
    showAlert: false
  });

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

  const getCoords = () => {
    let locations = [];
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
                    dispatch({
                      type: GET_FIREDATA,
                      payload: {
                        address: loc,
                        fireData: res.data.Fires
                      }
                    });
                  }
                });
            });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <AlertContext.Provider
      value={{ alertState, dispatch, getCoords, setShowAlert, setAlertViewed }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
