import React, { useReducer, createContext, useState } from "react";
import axios from "axios";

// import FireContext from "./contextProvider";
import connector from "../helpers/connects";
import { FireContext, defaultValues } from "./contextProvider";

import {
  SET_LOCATION,
  SET_NAME,
  GET_FIRES_START,
  GET_FIRES_SUCCESS,
  GET_FIRES_ERROR,
  GET_USER_LOCATIONS_START,
  GET_USER_LOCATIONS_SUCCESS,
  GET_USER_LOCATIONS_ERROR
} from "./types";

// REDUCER EXPLANATION:
// We use a reducer for the same reason we would use it in redux. It combines the previous state with the updated state.
// This reducer can be moved into a separate file

const globalReducer = (state, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload
      };
    case GET_FIRES_SUCCESS:
      return {
        ...state,
        fireInfo: action.payload
      };
    case GET_USER_LOCATIONS_SUCCESS:
      return {
        ...state,
        userLocations: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

// CREATE CONTEXT EXPLANATION:
// We initialize FireContext as an empty createContext object. We don't want to initialize any of our default variables inside createContext because then they won't run through our reducer.

const baseDeployedURL = "https://fireflight-lambda.herokuapp.com";
const baseLocalURL = "http://localhost:5000";
const DSbaseURL = "https://fire-data-api.herokuapp.com";

function GlobalContext(props) {
  //   const [user, setUser] = useState(null);
  //   const [token, setToken] = useState(null);
  //   const [location, setLocation] = useState(null);
  //   const [remote, setRemote] = useState(connector);

  // USE REDUCER EXPLANATION:
  // We setup our default variables as a useReducer hook. This puts all of our variables into the state object. This allows us to send the entire state object into the reducer to be properly updated.

  const [state, dispatch] = useReducer(globalReducer, defaultValues);

  // SET HOOKS EXPLANATION:
  // The concept of the set functions is exactly the same as in a regular hook. We use the set function to set the data inside the state. These functions (think redux actions) use dispatch to pass the newly set data into the reducer. State is then updated properly.

  const setUser = newUser => {
    dispatch({
      type: SET_NAME,
      payload: newUser
    });
  };
  const setToken = newToken => {};

  const setLocation = newLocation => {};

  //ex location:
  //  {
  //    "user_coords" : [-122.347204, 47.653278],
  //    "distance" : 1000
  // }
  const setFires = location => dispatch => {
    dispatch({ type: GET_FIRES_START });
    console.log("GET_FIRES_START");
    axios
      .post(`${DSbaseURL}/check_fires`, location)
      .then(res => {
        dispatch({ type: GET_FIRES_SUCCESS, payload: res.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_FIRES_ERROR, payload: err });
      });
  };

  const setUserLocations = () => dispatch => {
    dispatch({ type: GET_USER_LOCATIONS_START });
    axios
      .get(`${baseLocalURL}/api/locations/`)
      .then(res => {
        dispatch({ type: GET_USER_LOCATIONS_SUCCESS, payload: res.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_USER_LOCATIONS_ERROR, payload: err });
      });
  };

  //structure
  /**
   * user: get user
   * setUser: sets user (param user)
   * token: get token
   * token: sets token (param token)
   * location: get location
   * setLocation: set location(param location)
   * remote: Get remote connector
   */

  // PASSING DATA EXPLANATION:
  // FireContext is exported as a component. We pass our state object along with all our functions for setting the state into this component. We then use this as a wrapper component using it anywhere we would like in the project. If we put this at the top level, we will have access to this anywhere in our project.
  // Its not uncommon to create several different contexts and put them where they are needed.

  // RETRIEVING THE DATA EXPLANATION:
  // We used the FireContext component as a top level wrapper so we are able to access everything at any level of our project.
  // The FireContext object we get will look like this..

  //  {
  //    dispatch,
  //    setLocation,
  //    setToken,
  //    setUser,
  //    state: {
  //      location,
  //      registerModal,
  //      remote,
  //      token,
  //      user
  //    }
  //  }

  // To gain access to the data, we import our FireContext object into the component. We can then access the data with the useContext() hook, passing FireContext into the hook.

  return (
    <FireContext.Provider
      value={{
        // user,
        // token,
        // location,
        // remote,
        state,
        dispatch,
        setUser,
        setToken,
        setLocation,
        setFires,
        setUserLocations
      }}
    >
      {props.children}
    </FireContext.Provider>
  );
}

export default GlobalContext;
