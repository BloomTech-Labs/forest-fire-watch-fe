import React, { useReducer, createContext } from "react";

import {} from "./types";

const mapReducer = (state, action) => {
  switch (action.type) {
    default:
      return {
        ...state
      };
  }
};

export const MapContext = createContext();

export const MapProvider = props => {
  const [state, dispatch] = useReducer(mapReducer, {
    test: ""
  });

  return (
    <MapContext.Provider value={[state, dispatch]}>
      {props.children}
    </MapContext.Provider>
  );
};
