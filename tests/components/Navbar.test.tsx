import { screen } from '@testing-library/react';

import Navbar from '../../src/components/navbar/Navbar';
import { renderWithProviders } from '../utils/renderWithProviders';

const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Navbar', () => {
  it('affiche le logo du projet', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByAltText(/Logo EduTwin/i)).toBeInTheDocument();
  });

  it('affiche les actions principales', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('button', { name: /Connexion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Activer le mode sombre/i)).toBeInTheDocument();
  });
});
