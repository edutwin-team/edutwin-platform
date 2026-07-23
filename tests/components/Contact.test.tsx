import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../../src/pages/static/Contact';

describe('Contact', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
  });

  it('affiche le titre principal', () => {
    expect(screen.getByText(/Parlons de votre/i)).toBeInTheDocument();
  });

  it('affiche les infos de contact', () => {
    expect(screen.getByText(/contact@edutwin.fr/i)).toBeInTheDocument();
    expect(screen.getByText(/\+33 1 23 45 67 89/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });

  it('affiche le formulaire de contact', () => {
    expect(screen.getByPlaceholderText(/Jean Dupont/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/jean@exemple.fr/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Décrivez votre besoin/i)).toBeInTheDocument();
  });

  it('affiche le bouton envoyer', () => {
    expect(screen.getByText(/Envoyer le message/i)).toBeInTheDocument();
  });

  it('affiche les réseaux sociaux', () => {
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument();
    expect(screen.getByText(/Twitter/i)).toBeInTheDocument();
    expect(screen.getByText(/Instagram/i)).toBeInTheDocument();
  });
});
