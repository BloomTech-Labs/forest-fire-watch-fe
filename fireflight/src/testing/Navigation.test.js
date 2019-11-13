import React from "react";
import Navigation from "../components/Navigation";
import NavigationProfile from "../components/NavigationProfile";
import { render, fireEvent } from "./test-utils";
import { createMemoryHistory } from 'history'

describe("<Navigation />", () => {

	it("renders without crashing", () => {
		const history = createMemoryHistory()
	   	render(<Navigation />)
	})
	it("renders Home", () => {
		const nav = render(<Navigation />);
	    
		nav.getByText(/Home/i)
	})
	it("renders Sign In in demo mode", () => {
		const nav = render(<Navigation />);

		nav.getByText(/Sign In/i)
	})
	it("renders Sign Up in demo mode", () => {
		const nav = render(<Navigation />);

		nav.getByText(/Sign Up/i)
	})
});

describe("<NavigationProfile /> while logged in", () => {
	it("renders without crashing", () => {
		const history = createMemoryHistory();
		render(<NavigationProfile />) 
	})
	it("renders Profile when logged in", () => {
		const navProf = render(<NavigationProfile />);

		navProf.getByText(/Profile/i)
	})
	// it("renders Logout when logged in", () => {
	// 	const nav = render(<NavigationProfile />);

	// 	nav.getByText(/Logout/i)
	// })
})