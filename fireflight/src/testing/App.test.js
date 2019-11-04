import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { render, fireEvent } from "./test-utils";
import { createMemoryHistory } from 'history'

describe("<App />", () => {
  it("renders without crashing", () => {
    const history = createMemoryHistory()
    render( 
      <App />
  )})
});
