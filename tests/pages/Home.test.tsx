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


    expect(
      screen.getByText(/NEXT-GEN EDUCATIONAL TECH/i)
    ).toBeInTheDocument();


    expect(
      screen.getByText(/Simulate Students to/i)
    ).toBeInTheDocument();


    expect(screen.getByText(/Teacher Dashboard/i)).toBeInTheDocument();

    
    expect(screen.getByText(/Create Digital Twin/i)).toBeInTheDocument();

    expect(screen.getByText(/Digital Twin Concept/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Pedagogical Content/i)).toBeInTheDocument();
    expect(screen.getByText(/Inclusive Design/i)).toBeInTheDocument();
  });
});
