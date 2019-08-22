import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Danger from "./components/Danger";
import Update from "./components/Update";
import Login from "./components/Login";
import Register from "./components/Register";
import Modal from "./components/Modal/Modal";

import { FireContext } from "./context/GlobalContext";

function App() {
  const [token, setToken] = useState("");
  const contextObject = useContext(FireContext);
  const { setRegisterModal, registerModal } = useContext(FireContext);

  useEffect(() => {});

  console.log(contextObject);

  return (
    <div className="App">
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/update" component={Update} />
      <Route path="/danger" component={Danger} />

      <button onClick={setRegisterModal}>CLICK ME!</button>
      <Modal show={registerModal} />
    </div>
  );
}

export default App;
