import React from "react";
import Navigation from "../components/Navigation";
import { render, fireEvent } from "./test-utils";
import { createMemoryHistory } from 'history'

describe("<Navigation />", () => {
	it("renders without crashing", () => {
		const history = createMemoryHistory()
	   	render(<Navigation />)
	})
});