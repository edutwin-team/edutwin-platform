import { render, screen } from '@testing-library/react';
import Home from '../src/pages/home/Home';

describe('Home page', () => {
  it('affiche le titre Accueil', () => {
    render(<Home />);
    const title = screen.getByText(/Accueil/i);
    expect(title).toBeInTheDocument();
  });
});
