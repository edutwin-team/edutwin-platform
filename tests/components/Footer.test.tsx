import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../src/components/footer/Footer';

describe('Footer', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it('affiche le titre du site', () => {
    const title = screen.getByRole('heading', { level: 2, name: /EduTwin/i });
    expect(title).toBeInTheDocument();
  });

  it('affiche les sections principales', () => {
    expect(screen.getByText(/Ressources/i)).toBeInTheDocument();
    expect(screen.getByText(/Nous suivre/i)).toBeInTheDocument();
  });

  it('affiche les liens Ressources', () => {
    expect(screen.getByRole('link', { name: /Documentation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Support/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /FAQ/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  });

  it('affiche les icônes sociales', () => {
    const socialIcons = [
      'icon-facebook',
      'icon-twitter',
      'icon-tiktok',
      'icon-instagram',
      'icon-linkedin',
    ];

    socialIcons.forEach((testId) => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });

  it('affiche le texte copyright', () => {
    expect(screen.getByText(/EduTwin — Tous droits réservés/i)).toBeInTheDocument();
  });
});
