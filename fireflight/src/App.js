import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Danger from "./components/Danger";
import Update from "./components/Update";
import Login from "./components/Login";
import Register from "./components/Register";
import Modal from "./components/Modal/Modal";

// import { FireContext } from "./context/GlobalContext";

function App() {
  const [token, setToken] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  // const contextObject = useContext(FireContext);
  // const { state, setLocation } = useContext(FireContext);

  // const { location } = state;

  useEffect(() => {});

  // console.log("CONTEXT OBJECT:", contextObject);
  // console.log("STATE OBJECT", state);
  // console.log("LOCATION", location);

  return (
    <div className="App">
      <Navigation toggleRegister={setShowRegisterModal} />
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/update" component={Update} />
      <Route path="/danger" component={Danger} />
      <Modal
        show={showRegisterModal}
        form={<Register />}
        headerTitle={"Register"}
        close={() => setShowRegisterModal(false)}
      />
      {/* <button onClick={() => setLocation("THIS IS A TEST LOCATION")}>
        CLICK ME!
      </button> */}
    </div>
  );
}

export default App;
