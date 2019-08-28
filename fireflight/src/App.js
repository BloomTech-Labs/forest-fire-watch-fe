import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Danger from "./components/Danger";
import Update from "./components/Update";
import Dashboard from "./components/Dashboard";

import AuthForms from "./components/AuthForms/AuthForms";

import Map from "./components/Map";
import Address from './components/Address';
import AddressContext from './context/AddressContext'
import styled from "styled-components";

import { FireContext } from "./context/contextProvider";

// AUTH FORM MODAL:
// Will refactor everything in regards to the auth form modal into one single component to clean up APP.js

function App() {
  const [token, setToken] = useState("");
  // The 3 hooks below are used for showing and toggling between the login & register forms. These can most likely be refactored to use context API.
  const [showAuthForms, setShowAuthForms] = useState(true);
  const [loginFormStatus, setLoginFormStatus] = useState(true);
  const [registerFormStatus, setRegisterFormStatus] = useState(false);

  const global =useContext(FireContext)

  useEffect(() => {
    //getLogin gets login information upon page load here;
    const getLogin=async ()=>{
      let user = await global.state.remote.self()
      global.setUser(user.username)
    }
    getLogin()
  },[]);//[] here means this will only run once

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
      <Route exact path="/" component={Home} />
      <Route path="/update" component={Update} />
      <Route path="/danger" component={Danger} />
      <Route path="/dashboard" component={Dashboard} />
      <AddressContext>
        <Route path="/address" component={Address} />
        <Route path="/map" component={Map} />
      </AddressContext>
    

    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  position: "relative";
`;
