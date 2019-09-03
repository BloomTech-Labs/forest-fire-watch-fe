import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Danger from "./components/Danger";
import Update from "./components/Update";
import Dashboard from "./components/Dashboard";
import PrivateMap from "./components/PrivateMap";
import { MapProvider } from "./context/MapContext";

import AuthForms from "./components/AuthForms/AuthForms";

import Address from "./components/Address";
import AddressContext from "./context/AddressContext";
import styled from "styled-components";

import { FireContext } from "./context/contextProvider";

import * as v from "./styles/vars";

// AUTH FORM MODAL:
// Will refactor everything in regards to the auth form modal into one single component to clean up APP.js

function App() {
  const [token, setToken] = useState("");
  // The 3 hooks below are used for showing and toggling between the login & register forms. These can most likely be refactored to use context API.
  const [showAuthForms, setShowAuthForms] = useState(false);
  const [loginFormStatus, setLoginFormStatus] = useState(true);
  const [registerFormStatus, setRegisterFormStatus] = useState(false);

  const global = useContext(FireContext);

  useEffect(() => {
    //getLogin gets login information upon page load here;
    const getLogin = async () => {
      let user = await global.state.remote.self();
      global.setUser(user.username);
    };
    getLogin();
  }, []); //[] here means this will only run once

  return (
    <AppWrapper>
      <AuthForms
        showAuthForms={showAuthForms}
        setShowAuthForms={setShowAuthForms}
        loginFormStatus={loginFormStatus}
        registerFormStatus={registerFormStatus}
        setLoginFormStatus={setLoginFormStatus}
        setRegisterFormStatus={setRegisterFormStatus}
      />

      <Navigation
        toggleAuthForms={setShowAuthForms}
        toggleLoginStatus={setLoginFormStatus}
        toggleRegisterStatus={setRegisterFormStatus}
      />
      <Route
        exact
        path="/"
        render={() => (
          <Home
            setShowAuth={setShowAuthForms}
            setShowRegister={setRegisterFormStatus}
            setShowLogin={setLoginFormStatus}
          />
        )}
      />
      <Route path="/update" component={Update} />
      <Route path="/danger" component={Danger} />
      <Route path="/dashboard" component={Dashboard} />
      <Route
        path="/home"
        render={() => (
          <Home
            setShowAuth={setShowAuthForms}
            setShowRegister={setRegisterFormStatus}
            setShowLogin={setLoginFormStatus}
          />
        )}
      />
      <AddressContext>
        <Route path="/address" component={Address} />
        <MapProvider>
          <Route path="/maps" component={PrivateMap} />
        </MapProvider>
      </AddressContext>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  position: "relative";
  display: flex;
  flex-direction: column;
  ${v.tablet} {
    flex-direction: row;
  }
  background-image: linear-gradient(
    #f8b195,
    #f67280,
    #c06c84,
    #6c5b7b,
    #355c7d
  );
`;
