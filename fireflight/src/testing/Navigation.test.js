import React from "react";
import Navigation from "../components/Navigation";
import Login from "../components/AuthForms/Login";
import Modal from "../components/AuthForms/Combine";
import { render, fireEvent } from "./test-utils";
import { createMemoryHistory } from 'history'
import fire from "../config/fire";
import expectExport from "expect";

describe("<Navigation />", () => {
	it("renders without crashing", () => {
		const history = createMemoryHistory()
	   	render(<Navigation />)
	})
	it("renders Home", () => {
		const nav = render(<Navigation />);
	    
		nav.getByText(/Home/i)
	})
	it("displays login modal when clicking Sign In", async () => {
		const { getByText, findByText } = render(<Navigation />)
		const login = render(<Modal><Login /></Modal>)

		await fireEvent.click(getByText('Sign In'))

		login.getByText(/Welcome Back/i);
	})
});