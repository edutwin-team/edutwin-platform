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

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Essayer la démo/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Pourquoi/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Comment ça marche/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Approuvé par les éducateurs/i })
    ).toBeInTheDocument();
  });
});
