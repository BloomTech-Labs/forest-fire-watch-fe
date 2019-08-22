import React, { useReducer, createContext } from "react";
// import FireContext from "./contextProvider";
import connector from "../helpers/connects";

// import { TRIGGER_REGISTRATION_MODAL } from "./types";

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

export const FireContext = createContext();

function GlobalContext(props) {
  //   const [user, setUser] = useState(null);
  //   const [token, setToken] = useState(null);
  //   const [location, setLocation] = useState(null);
  //   const [remote, setRemote] = useState(connector);

  const [state, dispatch] = useReducer(globalReducer, {
    user: null,
    token: null,
    location: "",
    remote: {},
    registerModal: false
  });

  const setUser = newUser => {};
  const setToken = newToken => {};
  const setLocation = newLocation => {};

  //   const setRegisterModal = () => {
  //     dispatch({
  //       type: TRIGGER_REGISTRATION_MODAL,
  //       payload: !state.registerModal
  //     });
  //   };

  //structrure
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
