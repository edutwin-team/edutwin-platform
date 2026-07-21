import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import App from '../src/App';

vi.mock('../src/hooks/csrf/useCSRF', () => ({ useCSRF: vi.fn() }));
vi.mock('../src/hooks/user/useMe', () => ({
  useMe: () => ({
    data: {
      id: 1,
      email: 'teacher@test.com',
      first_name: 'Alice',
      last_name: 'Martin',
      role: 'teacher',
    },
    isLoading: false,
  }),
}));
vi.mock('../src/hooks/dashboard/useDashboard', () => ({
  useDashboard: () => ({
    data: {
      counts: { twins: 2, simulations: 3, quizzes: 4, contexts: 1 },
      weekly_simulations: [],
      last_twins: [],
    },
    isLoading: false,
  }),
}));
vi.mock('../src/hooks/twins/useTwins', () => ({
  useTwins: () => ({ data: [], isLoading: false, isError: false }),
}));
vi.mock('../src/hooks/twins/useContexts', () => ({
  useContexts: () => ({ data: [], isLoading: false, isError: false }),
}));
vi.mock('../src/hooks/simulation/useSimulationHistory', () => ({
  useSimulationHistory: () => ({ data: [], isLoading: false, isError: false }),
}));
vi.mock('../src/hooks/content/quiz/useQuizzes', () => ({
  useQuizzes: () => ({ data: [], isLoading: false, isError: false }),
}));

describe('App', () => {
  it('affiche la page d’accueil sans sidebar', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('affiche la sidebar sur une route protégée', async () => {
    window.history.pushState({}, '', '/dashboard');
    render(<App />);

    expect(screen.getByText('Tableau de bord enseignant')).toBeInTheDocument();
    expect(screen.getByText('Twin Numérique')).toBeInTheDocument();
  });

  it('affiche la page 404 sans sidebar', () => {
    window.history.pushState({}, '', '/route-inconnue');
    render(<App />);

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  });
});

describe('Sidebar', () => {
  it('ouvre et ferme le menu mobile', async () => {
    const Sidebar = (await import('../src/components/sidebar/Sidebar')).default;

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Sidebar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: '☰' }));
    expect(screen.getAllByText('Twin Numérique').length).toBeGreaterThan(1);
  });
});
