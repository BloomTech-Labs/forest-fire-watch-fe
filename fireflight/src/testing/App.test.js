import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { render, fireEvent } from "./test-utils";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import GlobalState from "../context/GlobalContext";
import { FireDataProvider } from "../context/FireDataContext";

describe("<App />", () => {
  it("renders without crashing", () => {
    const history = createMemoryHistory()
    render( 
      <Router history={history}>
      <App />
      </Router>
  )})
});
