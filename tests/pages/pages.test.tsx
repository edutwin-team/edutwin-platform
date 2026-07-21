import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Settings from '../../src/pages/settings/Settings';
import Dashboard from '../../src/pages/dashboard/Dashboard';
import Twins from '../../src/pages/twins/Twins';
import Simulation from '../../src/pages/simulation/Simulation';
import QuizPage from '../../src/pages/quiz/Quiz';
import { ContextPage } from '../../src/pages/contexts/ContextPage';
import { renderWithFullProviders } from '../utils/testProviders';

vi.mock('../../src/hooks/dashboard/useDashboard');
vi.mock('../../src/hooks/twins/useTwins');
vi.mock('../../src/hooks/twins/useContexts');
vi.mock('../../src/hooks/simulation/useSimulationHistory');
vi.mock('../../src/hooks/content/quiz/useQuizzes');
vi.mock('../../src/components/content/quiz/QuizList', () => ({
  QuizList: () => <div>Liste des quiz</div>,
}));
vi.mock('../../src/components/content/quiz/modals/AddQuizModal', () => ({
  AddQuizModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div>Modal quiz ouverte</div> : null,
}));
vi.mock('../../src/components/contexts/ContextForm', () => ({
  ContextForm: () => <div>Formulaire contexte</div>,
}));
import { useDashboard } from '../../src/hooks/dashboard/useDashboard';
import { useTwins } from '../../src/hooks/twins/useTwins';
import { useContexts } from '../../src/hooks/twins/useContexts';
import { useSimulationHistory } from '../../src/hooks/simulation/useSimulationHistory';
import { useQuizzes } from '../../src/hooks/content/quiz/useQuizzes';

const dashboardData = {
  counts: { twins: 2, simulations: 1, quizzes: 3, contexts: 4 },
  weekly_simulations: [{ day: 'Monday', count: 2 }],
  last_twins: [{ id: 1, name: 'Twin A', behavior: { attention_level: 80 } }],
};

describe('Dashboard page', () => {
  it('affiche les statistiques', () => {
    vi.mocked(useDashboard).mockReturnValue({ data: dashboardData, isLoading: false } as never);
    renderWithFullProviders(<Dashboard />);
    expect(screen.getByText('Tableau de bord enseignant')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('affiche le loader', () => {
    vi.mocked(useDashboard).mockReturnValue({ isLoading: true } as never);
    renderWithFullProviders(<Dashboard />);
    expect(screen.getByText('Chargement des données...')).toBeInTheDocument();
  });
});

describe('Twins page', () => {
  beforeEach(() => {
    vi.mocked(useContexts).mockReturnValue({ data: [], isLoading: false, isError: false } as never);
  });

  it('affiche l’état vide', () => {
    vi.mocked(useTwins).mockReturnValue({ data: [], isLoading: false, isError: false } as never);
    renderWithFullProviders(<Twins />);
    expect(screen.getByText('Aucun Jumeau trouvé')).toBeInTheDocument();
  });

  it('affiche une erreur', () => {
    vi.mocked(useTwins).mockReturnValue({ isLoading: false, isError: true } as never);
    renderWithFullProviders(<Twins />);
    expect(screen.getByText(/Erreur lors du chargement des jumeaux/i)).toBeInTheDocument();
  });
});

describe('Simulation page', () => {
  it('affiche l’historique et ouvre le flux', async () => {
    vi.mocked(useSimulationHistory).mockReturnValue({
      data: [{ id: 1, quiz_title: 'Q1', twin_name: 'T1', score: 80, created_at: '2026-01-01' }],
      isLoading: false,
      isError: false,
    } as never);

    renderWithFullProviders(<Simulation />);
    fireEvent.click(screen.getByRole('button', { name: /Lancer une simulation/i }));

    await waitFor(() => {
      expect(screen.getByText(/Choisir un Jumeau/i)).toBeInTheDocument();
    });
  });
});

describe('Quiz page', () => {
  it('ouvre la modale d’ajout', () => {
    vi.mocked(useQuizzes).mockReturnValue({ data: [], isLoading: false } as never);
    renderWithFullProviders(<QuizPage />);

    fireEvent.click(screen.getByRole('button', { name: /Ajouter un quiz/i }));
    expect(screen.getByText('Modal quiz ouverte')).toBeInTheDocument();
  });
});

describe('Context page', () => {
  it('affiche la liste vide et le formulaire', () => {
    vi.mocked(useContexts).mockReturnValue({ data: [], isLoading: false, isError: false } as never);
    renderWithFullProviders(<ContextPage />);

    expect(screen.getByText('Aucun contexte')).toBeInTheDocument();
    expect(screen.getByText('Formulaire contexte')).toBeInTheDocument();
  });
});

describe('Settings page', () => {
  it('permet de modifier et sauvegarder les préférences', async () => {
    renderWithFullProviders(<Settings />);

    expect(screen.getByRole('heading', { name: /Paramètres/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Réinitialiser/i }));
    fireEvent.click(screen.getByRole('button', { name: /Enregistrer les préférences/i }));

    await waitFor(() => {
      expect(screen.getByText(/Préférences enregistrées et appliquées/i)).toBeInTheDocument();
    });
  });
});
