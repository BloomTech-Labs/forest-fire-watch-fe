import React from "react";
import remote from '../helpers/connects'

const defaultValues = {
  user: null,
  token: null,
  location: "",
  remote: remote,
  setUser: newUser => {},
  setToken: newToken => {},
  setLocation: newLocation => {},
  name: "Mike"
};

//set default state for autocomplete
const FireContext = React.createContext(defaultValues);

export { FireContext, defaultValues };
