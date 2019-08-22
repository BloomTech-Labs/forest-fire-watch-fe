import React, { useReducer, createContext } from "react";
// import FireContext from "./contextProvider";
import connector from "../helpers/connects";

// import { TRIGGER_REGISTRATION_MODAL } from "./types";

// REDUCER EXPLANATION:
// We use a reducer for the same reason we would use it in redux. It combines the previous state with the updated state.
// This reducer can be moved into a separate file

const globalReducer = (state, action) => {
  switch (action.type) {
    // case TRIGGER_REGISTRATION_MODAL:
    //   return {
    //     ...state,
    //     registerModal: action.payload
    //   };
    default:
      return {
        ...state
      };
  }
};

// CREATE CONTEXT EXPLANATION:
// We initialize FireContext as an empty createContext object. We don't want to initialize any of our default variables inside createContext because then they won't run through our reducer.

export const FireContext = createContext();

function GlobalContext(props) {
  //   const [user, setUser] = useState(null);
  //   const [token, setToken] = useState(null);
  //   const [location, setLocation] = useState(null);
  //   const [remote, setRemote] = useState(connector);

  // USE REDUCER EXPLANATION:
  // We setup our default variables as a useReducer hook. This puts all of our variables into the state object. This allows us to send the entire state object into the reducer to be properly updated.

  const [state, dispatch] = useReducer(globalReducer, {
    user: null,
    token: null,
    location: "",
    remote: {},
    registerModal: false
  });

  // SET HOOKS EXPLANATION:
  // The concept of the set functions is exactly the same as in a regular hook. We use the set function to set the data inside the state. These functions (think redux actions) use dispatch to pass the newly set data into the reducer. State is then updated properly.

  const setUser = newUser => {};
  const setToken = newToken => {};
  const setLocation = newLocation => {};

  //   const setRegisterModal = () => {
  //     dispatch({
  //       type: TRIGGER_REGISTRATION_MODAL,
  //       payload: !state.registerModal
  //     });
  //   };

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
        setLocation
        // setRegisterModal
      }}
    >
      {props.children}
    </FireContext.Provider>
  );
}

export default GlobalContext;
