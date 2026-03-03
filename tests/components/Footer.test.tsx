import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../../src/components/footer/footer";

describe("Footer", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it("affiche le titre du site", () => {
    const title = screen.getByRole("heading", { level: 2, name: /Digital Twin EDU/i });
    expect(title).toBeInTheDocument();
  });

  it("affiche les sections principales", () => {
    expect(screen.getByText(/Navigation/i)).toBeInTheDocument();
    expect(screen.getByText(/Resources/i)).toBeInTheDocument();
    expect(screen.getByText(/Follow Us/i)).toBeInTheDocument();
  });

  it("affiche les liens de navigation", () => {
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Digital Twins/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it("affiche les liens Resources", () => {
    expect(screen.getByText(/Documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/API Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/Support/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
  });

  it("affiche les icônes sociales", () => {
    const socialIcons = [
      "icon-facebook",
      "icon-twitter",
      "icon-tiktok",
      "icon-instagram",
      "icon-linkedin",
    ];

    socialIcons.forEach((testId) => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });

  it("affiche le texte copyright", () => {
    const copyright = screen.getByText(/©\s*2026\s*Digital Twin EDU/i);
    expect(copyright).toBeInTheDocument();
  });
});