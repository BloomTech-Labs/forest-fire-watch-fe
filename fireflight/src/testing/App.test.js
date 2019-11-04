import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalState from "../context/GlobalContext";
import { FireDataProvider } from "../context/FireDataContext";

describe("<App />", () => {
  it("renders without crashing", () => {
    render(<GlobalState>
                  <FireDataProvider>
                    <Router>
                      <App />
                    </Router>
                  </FireDataProvider>
                </GlobalState>
  )})
});
