import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FAQ from '../../src/pages/static/FAQ';

describe('FAQ', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <FAQ />
      </MemoryRouter>
    );
  });

  it('affiche le titre principal', () => {
    expect(screen.getByText(/Vous avez des/i)).toBeInTheDocument();
  });

  it('affiche les onglets de catégories', () => {
    expect(screen.getByText(/Général/i)).toBeInTheDocument();
    expect(screen.getByText(/Technique/i)).toBeInTheDocument();
    expect(screen.getByText(/Sécurité & RGPD/i)).toBeInTheDocument();
    expect(screen.getByText(/Élèves & Enseignants/i)).toBeInTheDocument();
  });

  it('affiche les questions de la catégorie Général par défaut', () => {
    expect(screen.getByText(/jumeau numérique d'élève/i)).toBeInTheDocument();
    expect(screen.getByText(/version gratuite/i)).toBeInTheDocument();
  });

  it('change de catégorie au clic', () => {
    const techniqueTab = screen.getByText(/Technique/i);
    fireEvent.click(techniqueTab);
    expect(screen.getByText(/LMS actuel/i)).toBeInTheDocument();
  });

  it('ouvre une réponse au clic sur une question', () => {
    const question = screen.getByText(/jumeau numérique d'élève/i);
    fireEvent.click(question);
    expect(screen.getByText(/profil IA dynamique/i)).toBeInTheDocument();
  });

  it('affiche le lien vers la page contact', () => {
    expect(screen.getByText(/Nous contacter/i)).toBeInTheDocument();
  });
});
