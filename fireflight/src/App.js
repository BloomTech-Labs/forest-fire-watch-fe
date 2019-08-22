import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Danger from "./components/Danger";
import Update from "./components/Update";
import Login from "./components/Login";
import Register from "./components/Register";
import Modal from "./components/Modal/Modal";

import styled from "styled-components";

// import { FireContext } from "./context/GlobalContext";

function App() {
  const [token, setToken] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // const contextObject = useContext(FireContext);
  // const { state, setLocation } = useContext(FireContext);

  // const { location } = state;

  useEffect(() => {});

  // console.log("CONTEXT OBJECT:", contextObject);
  // console.log("STATE OBJECT", state);
  // console.log("LOCATION", location);

  return (
    <div className="App" style={{ position: "relative" }}>
      {showRegisterModal ? (
        <BackDrop onClick={() => setShowRegisterModal(false)} />
      ) : null}
      <Modal
        show={showRegisterModal}
        form={<Register />}
        headerTitle={"Register"}
        close={() => setShowRegisterModal(false)}
      />
      {showLoginModal ? (
        <BackDrop onClick={() => setShowLoginModal(false)} />
      ) : null}
      <Modal
        show={showLoginModal}
        form={<Login />}
        headerTitle={"Login"}
        close={() => setShowLoginModal(false)}
      />
      <Navigation
        toggleRegister={setShowRegisterModal}
        toggleLogin={setShowLoginModal}
      />
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/update" component={Update} />
      <Route path="/danger" component={Danger} />

      {/* <button onClick={() => setLocation("THIS IS A TEST LOCATION")}>
        CLICK ME!
      </button> */}
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
