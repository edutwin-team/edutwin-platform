import { render, screen } from '@testing-library/react';
import About from '../../src/pages/about/About';

describe('About', () => {
  it('affiche la présentation du projet', () => {
    render(<About />);

    expect(screen.getByRole('heading', { name: 'À propos du projet' })).toBeInTheDocument();
    expect(screen.getByText(/Projet fil rouge/i)).toBeInTheDocument();
    expect(screen.getByText(/jumeaux numériques/i)).toBeInTheDocument();
  });
});
