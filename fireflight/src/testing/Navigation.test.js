import React from "react";
import Navigation from "../components/Navigation";
// import Login from "../components/AuthForms/Login"
import { render, fireEvent } from "./test-utils";

describe("<Navigation />", () => {
	it("renders without crashing", () => {
	   	render(<Navigation />)
	})
	it("renders Home", () => {
		const nav = render(<Navigation />);
	    
		nav.getByText(/Home/i)
	})
	
	// it('login modal shows the children and a close button', async() => {
	// 	const handleClose = jest.fn()
	  
	// 	// Act
	// 	const { getByText } = render(
	// 	  <Login onClose={handleClose}>
	// 		<div>test</div>
	// 	  </Login>
	// 	)
	// 	// Assert
	// 	expect(getByText('test')).toBeTruthy()
	  
	// 	// // Act
		// fireEvent.click(getByText(/x/i))
	  
		// // Assert
		// expect(handleClose).toHaveBeenCalledTimes(1)
	//   })
});