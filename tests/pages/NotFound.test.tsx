import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NotFound from '../../src/pages/static/NotFound';

describe('NotFound', () => {
  it('affiche le message 404 et un lien vers l’accueil', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Page introuvable/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Retour à l’accueil/i })).toHaveAttribute('href', '/');
  });
});
