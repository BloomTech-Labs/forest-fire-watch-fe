import React, { useReducer, createContext } from "react";
import axios from "axios";
import {} from "./types";

const alertReducer = (state, action) => {
  switch (action.type) {
    default:
      return {
        ...state
      };
  }
};

export const AlertContext = createContext();

export const AlertProvider = props => {
  const [alertState, dispatch] = useReducer(alertReducer, {});

  return (
    <AlertContext.Provider value={{ alertState, dispatch }}>
      {props.children}
    </AlertContext.Provider>
  );
};
