import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalState from "./context/GlobalContext";
import { FireDataProvider } from "./context/FireDataContext";

//setting state to global for use
ReactDOM.render(
  <GlobalState>
    <FireDataProvider>
      <Router>
        <App />
      </Router>
    </FireDataProvider>
  </GlobalState>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
