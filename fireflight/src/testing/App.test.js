import React from "react";
import App from "../App";
import { render, fireEvent } from "./test-utils";

describe("<App />", () => {
  it("renders without crashing", () => {
    render(<App />)
  })
  it("renders Enter the address you wish to check fire proximity to", () => {
    const app = render(<App />);

    app.getByText(/Enter the address you wish to check fire proximity to/i)
  })
  it("renders to save addresses and receive notifications", () => {
    const app = render(<App />);

    app.getByText(/to save addresses and receive notifications/i)
  })
  // it("displays login modal when clicking Sign In", async() => {
	// 	const { getByText, findByText } = render(<App />)

	// 	// act(() => {
	// 		fireEvent.click(findByText('Sign In'))
	// 	// })

	// 	await expect(findByText(/Welcome back/i)).toBeTruthy()
	// })
});
