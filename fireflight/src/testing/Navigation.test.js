import React from "react";
import Navigation from "../components/Navigation";
import { render, fireEvent } from "./test-utils";
import { createMemoryHistory } from 'history'
import fire from "../config/fire";

describe("<Navigation />", () => {
	it("renders without crashing", () => {
		const history = createMemoryHistory()
	   	render(<Navigation />)
	})
	it("renders Home", () => {
		const nav = render(<Navigation />);
	    
		nav.getByText(/Home/i)
	})
	it("displays login modal when clicking Sign In", () => {
		const { getByText, findByText } = render(<Navigation />)

		fireEvent.click(getByText('Sign In'))

		
	})
});