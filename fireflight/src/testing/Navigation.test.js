import React from "react";
import Navigation from "../components/Navigation";
import { render } from "@testing-library/react";
import { Router } from 'react-router-dom'
import GlobalState from "../context/GlobalContext";
import { FireDataProvider } from "../context/FireDataContext";

describe("<Navigation />", () => {
  it("renders without crashing", () => {
	// const history = createMemoryHistory()
    	render(<GlobalState>
                  <FireDataProvider>
                    <Router>
                      <Navigation />
                    </Router>
                  </FireDataProvider>
                </GlobalState>
  )})
});