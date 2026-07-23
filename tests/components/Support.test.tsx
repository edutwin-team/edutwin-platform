import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Support from '../../src/pages/static/Support';

describe('Support', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Support />
      </MemoryRouter>
    );
  });

  it('affiche le titre principal', () => {
    expect(screen.getByText(/Comment pouvons-nous/i)).toBeInTheDocument();
  });

  it('affiche les canaux de contact', () => {
    expect(screen.getByText(/Chat en direct/i)).toBeInTheDocument();
    expect(screen.getByText(/support@edutwin.fr/i)).toBeInTheDocument();
    expect(screen.getByText(/\+33 1 23 45 67 89/i)).toBeInTheDocument();
  });

  it('affiche les délais de réponse', () => {
    expect(screen.getByText(/< 2 min/i)).toBeInTheDocument();
    expect(screen.getByText(/< 24h/i)).toBeInTheDocument();
    expect(screen.getByText(/Immédiat/i)).toBeInTheDocument();
  });

  it('affiche les ressources utiles', () => {
    expect(screen.getAllByText(/Documentation/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/FAQ/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Contact/i).length).toBeGreaterThan(0);
  });

  it('affiche le formulaire de ticket', () => {
    expect(screen.getByText(/Ouvrir un ticket/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Jean Dupont/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/jean@exemple.fr/i)).toBeInTheDocument();
  });

  it('affiche le select de type de demande', () => {
    expect(screen.getByText(/Problème technique/i)).toBeInTheDocument();
    expect(screen.getByText(/Demande de démo/i)).toBeInTheDocument();
  });

  it('soumet le formulaire avec confirmation', () => {
    fireEvent.change(screen.getByPlaceholderText(/Jean Dupont/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText(/jean@exemple.fr/i), {
      target: { value: 'test@test.fr' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Décrivez votre problème/i), {
      target: { value: 'Mon message de test' },
    });
    fireEvent.click(screen.getByText(/Envoyer le ticket/i));
    expect(screen.getByText(/Ticket créé avec succès/i)).toBeInTheDocument();
  });
});
