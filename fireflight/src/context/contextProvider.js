import React from "react";

const defaultValues = {
  user: null,
  token: null,
  location: "",
  remote: {},
  setUser: newUser => {},
  setToken: newToken => {},
  setLocation: newLocation => {},
  name: "Mike"
};

//set default state for autocomplete
const FireContext = React.createContext(defaultValues);

export { FireContext, defaultValues };
