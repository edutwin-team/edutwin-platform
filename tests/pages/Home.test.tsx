// src/pages/home/Home.test.tsx

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../../src/pages/home/Home";

describe("Home Page", () => {
  test("renders Home component correctly", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/What do you want to validate first in your lesson/i)).toBeInTheDocument();
    expect(screen.getByText(/Maintain student attention/i)).toBeInTheDocument();
    expect(screen.getByText(/Check concept understanding/i)).toBeInTheDocument();
    expect(screen.getByText(/Ensure inclusive accessibility/i)).toBeInTheDocument();
  });
});
