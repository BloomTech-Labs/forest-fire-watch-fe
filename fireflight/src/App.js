import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Danger from "./components/Danger";
import Update from "./components/Update";
import Dashboard from "./components/Dashboard";

import AuthForms from "./components/AuthForms/AuthForms";

import Address from "./components/Address";
import AddressContext from "./context/AddressContext";
import styled from "styled-components";

import { GlobalContext } from "./context/contextProvider";
import { UserDataProvider } from "./context/UserDataContext";
import { FireDataContext } from "./context/FireDataContext";

import ReactGA from 'react-ga';

import * as v from "./styles/vars";

import "./styles/App.scss";

require("dotenv").config();

ReactGA.initialize('UA-149769097-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const token = localStorage.getItem("token");

// AUTH FORM MODAL:
// Will refactor everything in regards to the auth form modal into one single component to clean up APP.js

function App() {
  // The 3 hooks below are used for showing and toggling between the login & register forms. These can most likely be refactored to use context API.
  const [showAuthForms, setShowAuthForms] = useState(false);
  const [loginFormStatus, setLoginFormStatus] = useState(true);
  const [registerFormStatus, setRegisterFormStatus] = useState(false);

  const global = useContext(GlobalContext);
  const { fireDataState, getAllFires, setUserLocations } = useContext(
    FireDataContext
  );

  useEffect(() => {
    getAllFires();
  }, []);

  useEffect(() => {
    if (token) {
      console.log('effect')
      setUserLocations();
    }
  }, [fireDataState.allFires,fireDataState.selectedMarker]);

  useEffect(() => {
    //getLogin gets login information upon page load here;
    const getLogin = async () => {
      try {
        let user = await global.state.remote.self();
        global.setUser(user.username);
      } catch (err) {
        localStorage.removeItem("token");
        global.setUser("");
        return <Redirect to="/" />;
      }
    };
    if (token) {
      getLogin();
    }
  }, []); //[] here means this will only run once

  useEffect(() => {
    if (token) {
      const fetch = async () => {
        try {
          let temp = await global.state.remote.fetchLocations();
        } catch (err) {
          console.error(err);
        }
      };
      fetch();
    }
  }, [token]);

  return (
    <AppWrapper>
      <AddressContext>
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
        <UserDataProvider>
          <Route path="/dashboard" component={Dashboard} />
        </UserDataProvider>
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

        <Route path="/address" component={Address} />
      </AddressContext>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  position: relative;
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
