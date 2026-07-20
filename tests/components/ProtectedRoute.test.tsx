import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../../src/components/auth/ProtectedRoute';
import { useAuth } from '../../src/context/useAuth';

vi.mock('../../src/context/useAuth');

const mockedUseAuth = vi.mocked(useAuth);

const renderProtectedRoute = (initialPath = '/dashboard') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<div>Accueil public</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<div>Zone protégée</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe('ProtectedRoute', () => {
  it('affiche un chargement pendant la vérification de session', () => {
    mockedUseAuth.mockReturnValue({ user: null, isLoading: true });

    renderProtectedRoute();

    expect(screen.getByText('Vérification de votre session...')).toBeInTheDocument();
  });

  it('redirige vers l’accueil si l’utilisateur n’est pas connecté', () => {
    mockedUseAuth.mockReturnValue({ user: null, isLoading: false });

    renderProtectedRoute();

    expect(screen.getByText('Accueil public')).toBeInTheDocument();
    expect(screen.queryByText('Zone protégée')).not.toBeInTheDocument();
  });

  it('affiche le contenu protégé si l’utilisateur est connecté', () => {
    mockedUseAuth.mockReturnValue({
      user: {
        id: 1,
        email: 'alice@example.com',
        first_name: 'Alice',
        last_name: 'Martin',
        role: 'teacher',
      },
      isLoading: false,
    });

    renderProtectedRoute();

    expect(screen.getByText('Zone protégée')).toBeInTheDocument();
  });
});
