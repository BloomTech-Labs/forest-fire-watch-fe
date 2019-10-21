import React from "react";
import App from "./App";
import { render } from "@testing-library/react";
// import "@testing-library/react/cleanup-after-each";
import Navigation from "./components/Navigation";

// describe("<App />", () => {
//   it("renders without crashing", () => {
//     const app = render(<App />);
//   });
// });

describe("<Navigation />", () => {
  it("renders without crashing", () => {
    const navigation = render(<Navigation />);
  });
});
