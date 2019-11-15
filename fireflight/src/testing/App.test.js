import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { render, fireEvent } from "./test-utils";
import { createMemoryHistory } from 'history'

describe("<App />", () => {
  it("renders without crashing", () => {
    const history = createMemoryHistory()
    render(<App />)
  })
  it("renders Enter the address and radius you wish to check fire proximity to", () => {
    const app = render(<App />);

    app.getByText(/Enter the address and radius you wish to check fire proximity to/i)
  })
  it("renders to save addresses and receive notifications", () => {
    const app = render(<App />);

    app.getByText(/to save addresses and receive notifications/i)
  })
});
