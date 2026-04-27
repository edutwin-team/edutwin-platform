import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../src/components/navbar/Navbar';

describe('Navbar', () => {
  it('affiche le logo du projet', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/Logo EduTwin/i)).toBeInTheDocument();
  });

  it('affiche les actions principales', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /Connexion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Activer le mode sombre/i)).toBeInTheDocument();
  });
});
