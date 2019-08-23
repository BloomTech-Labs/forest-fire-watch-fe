import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Danger from "./components/Danger";
import Update from "./components/Update";
import AuthFormsModal from "./components/AuthForms/Combine";
import Map from "./components/Map";

import styled from "styled-components";

import { FireContext } from "./context/GlobalContext";

// AUTH FORM MODAL:
// Will refactor everything in regards to the auth form modal into one single component to clean up APP.js

function App() {
  const [token, setToken] = useState("");
  const [showAuthForms, setShowAuthForms] = useState(false);
  const [loginFormStatus, setLoginFormStatus] = useState(true);
  const [registerFormStatus, setRegisterFormStatus] = useState(false);

  const contextObject = useContext(FireContext);

  const { state, setName } = useContext(FireContext);

  // const { location } = state;

  useEffect(() => {});

  console.log("CONTEXT OBJECT:", contextObject);
  console.log("STATE OBJECT", state);

  // console.log("LOCATION", location);

  console.log(showAuthForms, loginFormStatus, registerFormStatus);

  return (
    <div className="App" style={{ position: "relative", margin: 25 }}>
      {showAuthForms ? (
        <BackDrop onClick={() => setShowAuthForms(false)} />
      ) : null}
      <AuthFormsModal
        show={showAuthForms}
        close={() => setShowAuthForms(false)}
        showLogin={loginFormStatus}
        showRegister={registerFormStatus}
        setLoginStatus={setLoginFormStatus}
        setRegisterStatus={setRegisterFormStatus}
      />

      <Navigation
        toggleAuthForms={setShowAuthForms}
        toggleLoginStatus={setLoginFormStatus}
        toggleRegisterStatus={setRegisterFormStatus}
      />
      <Route exact path="/" component={Home} />
      <Route path="/update" component={Update} />
      <Route path="/danger" component={Danger} />
      <Route path="/map" component={Map} />

      <button onClick={() => setName()}>CLICK ME!</button>
    </div>
  );
}

export default App;

const BackDrop = styled.div`
  background-color: rgba(48, 49, 48, 0.42);
  height: 100%;
  position: fixed;
  transition: all 1.3s;
  width: 100%;
`;
