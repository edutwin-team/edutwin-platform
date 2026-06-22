import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../src/pages/home/Home';

describe('Home Page', () => {
  test('renders Home component correctly', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/Jumeau numérique/i)).toBeInTheDocument();
    expect(screen.getByText(/Essayer la démo/i)).toBeInTheDocument();
    expect(screen.getByText(/Pourquoi/i)).toBeInTheDocument();
    expect(screen.getByText(/Comment ça marche/i)).toBeInTheDocument();
    expect(screen.getByText(/Approuvé par les éducateurs/i)).toBeInTheDocument();
  });
});