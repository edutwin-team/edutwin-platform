import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Documentation from '../../src/pages/static/Documentation';

describe('Documentation', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Documentation />
      </MemoryRouter>
    );
  });

  it('affiche le titre principal', () => {
    expect(screen.getByText(/Guide complet/i)).toBeInTheDocument();
  });

  it('affiche les sections principales', () => {
    expect(screen.getByText(/Démarrage rapide/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Jumeau numérique/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Tableau de bord/i)).toBeInTheDocument();
    expect(screen.getByText(/Intégrations/i)).toBeInTheDocument();
  });

  it('affiche les badges de catégorie', () => {
    expect(screen.getByText(/Premiers pas/i)).toBeInTheDocument();
    expect(screen.getByText(/Cœur du produit/i)).toBeInTheDocument();
    expect(screen.getByText(/Enseignants/i)).toBeInTheDocument();
    expect(screen.getByText(/Technique/i)).toBeInTheDocument();
  });

  it('affiche le lien vers le support', () => {
    expect(screen.getByText(/Contacter le support/i)).toBeInTheDocument();
  });

  it('affiche le texte de description', () => {
    expect(screen.getByText(/Tout ce dont vous avez besoin/i)).toBeInTheDocument();
  });
});
