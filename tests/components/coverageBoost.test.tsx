import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import TwinCard from '../../src/components/twin/TwinCard';
import { QuizList } from '../../src/components/content/quiz/QuizList';
import SimulationHistory from '../../src/components/simulation/history/SimulationHistory';
import { ContextCard } from '../../src/components/contexts/ContextCard';
import LatestTwinsCard from '../../src/components/dashboard/LatestTwinsCard';
import { GenericModal } from '../../src/components/ui/modals/GenericModal';
import { ContentSourceType } from '../../src/types';
import { QueryWrapper, RouterQueryWrapper } from '../utils/testProviders';

vi.mock('../../src/hooks/twins/useDeleteTwin');
vi.mock('../../src/hooks/content/quiz/useQuizzes');
vi.mock('../../src/hooks/content/quiz/useDeleteQuiz');
vi.mock('../../src/hooks/content/quiz/useExportQuiz');
vi.mock('../../src/hooks/twins/useDeleteContext');

import { useDeleteTwin } from '../../src/hooks/twins/useDeleteTwin';
import { useQuizzes } from '../../src/hooks/content/quiz/useQuizzes';
import { useDeleteQuiz } from '../../src/hooks/content/quiz/useDeleteQuiz';
import { useExportQuiz } from '../../src/hooks/content/quiz/useExportQuiz';
import { useDeleteContext } from '../../src/hooks/twins/useDeleteContext';

const twin = {
  id: 1,
  name: 'Twin Alpha',
  description: 'Description',
  behavior: {
    attention_level: 80,
    motivation: 70,
    stress_level: 20,
    fatigue_level: 15,
    comprehension_level: 75,
    learning_speed: 65,
    memory_retention: 72,
    autonomy_level: 68,
    persistence_level: 80,
    curiosity_level: 77,
    error_rate: 12,
    question_frequency: 40,
    learning_style: 'visual',
    preferred_content_type: 'video',
    comment: 'Bon élève',
  },
} as never;

const quiz = {
  id: 1,
  title: 'Quiz Maths',
  description: 'Desc',
  difficulty: 'easy',
  source_type: ContentSourceType.MANUAL,
  passing_score: 60,
  time_limit_minutes: 30,
  course: null,
  questions: [
    {
      id: 1,
      text: 'Question 1',
      question_type: 'multiple_choice',
      difficulty_level: 'easy',
      answers: [{ id: 1, text: 'Réponse', is_correct: true }],
    },
  ],
};

describe('TwinCard', () => {
  it('affiche le jumeau et ouvre la suppression', () => {
    const deleteTwin = vi.fn();
    vi.mocked(useDeleteTwin).mockReturnValue({ mutate: deleteTwin, isPending: false } as never);

    const { container } = render(
      <RouterQueryWrapper>
        <TwinCard twin={twin} onEdit={vi.fn()} />
      </RouterQueryWrapper>
    );

    expect(screen.getByText('Twin Alpha')).toBeInTheDocument();
    const deleteBtn = container.querySelector('button.text-error');
    expect(deleteBtn).toBeTruthy();
    fireEvent.click(deleteBtn!);
    expect(screen.getByText('Supprimer le jumeau numérique')).toBeInTheDocument();
  });
});

describe('QuizList', () => {
  it('affiche les quiz et gère la sélection', () => {
    vi.mocked(useQuizzes).mockReturnValue({
      data: [quiz],
      isLoading: false,
      isError: false,
    } as never);
    vi.mocked(useDeleteQuiz).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useExportQuiz).mockReturnValue({ mutateAsync: vi.fn() } as never);

    render(
      <QueryWrapper>
        <QuizList />
      </QueryWrapper>
    );

    expect(screen.getByText('Quiz Maths')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Voir' }));
    expect(screen.getAllByRole('heading', { name: 'Quiz Maths' })).toHaveLength(2);
  });

  it('affiche le loader', () => {
    vi.mocked(useQuizzes).mockReturnValue({ isLoading: true } as never);
    render(<QuizList />);
    expect(screen.getByText('Chargement des données...')).toBeInTheDocument();
  });

  it('affiche une erreur et l’état vide', () => {
    vi.mocked(useQuizzes).mockReturnValue({ isLoading: false, isError: true } as never);
    render(<QuizList />);
    expect(screen.getByText('Erreur de chargement')).toBeInTheDocument();

    vi.mocked(useQuizzes).mockReturnValue({ data: [], isLoading: false, isError: false } as never);
    render(<QuizList />);
    expect(screen.getByText('Aucun quiz')).toBeInTheDocument();
  });

  it('exporte et supprime un quiz', async () => {
    const deleteQuiz = vi.fn((_id, opts) => opts.onSuccess());
    const blob = new Blob(['csv'], { type: 'text/csv' });
    vi.mocked(useQuizzes).mockReturnValue({
      data: [quiz],
      isLoading: false,
      isError: false,
    } as never);
    vi.mocked(useDeleteQuiz).mockReturnValue({ mutate: deleteQuiz, isPending: false } as never);
    vi.mocked(useExportQuiz).mockReturnValue({
      mutateAsync: vi.fn().mockResolvedValue(blob),
    } as never);

    URL.createObjectURL = vi.fn(() => 'blob:mock');
    URL.revokeObjectURL = vi.fn();

    render(
      <QueryWrapper>
        <QuizList />
      </QueryWrapper>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Voir' }));
    fireEvent.click(screen.getByRole('button', { name: 'Masquer' }));

    const exportBtn = screen
      .getAllByRole('button')
      .find((btn) => btn.className.includes('btn-ghost') && !btn.className.includes('text-error'));
    fireEvent.click(exportBtn!);

    const deleteBtn = screen
      .getAllByRole('button')
      .find((btn) => btn.className.includes('text-error'));
    fireEvent.click(deleteBtn!);

    expect(screen.getByText('Supprimer le quiz')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Supprimer').find((el) => el.tagName === 'BUTTON')!);

    expect(deleteQuiz).toHaveBeenCalledWith(1, expect.any(Object));
  });
});

describe('SimulationHistory', () => {
  it('affiche les simulations et le détail', () => {
    const simulations = [
      {
        id: 1,
        twin_name: 'Twin A',
        quiz_title: 'Quiz 1',
        simulated_score: 85,
        passed: true,
        answer_details: [],
        simulation_type: 'quiz',
      },
    ] as never;

    render(<SimulationHistory simulations={simulations} />);

    expect(screen.getByText('Twin A')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Voir détail/i }));
    expect(screen.getByRole('button', { name: /Masquer/i })).toBeInTheDocument();
  });
});

describe('ContextCard', () => {
  it('affiche le contexte et déclenche l’édition', () => {
    vi.mocked(useDeleteContext).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    const onEdit = vi.fn();

    render(
      <MemoryRouter>
        <ContextCard
          context={{
            id: 1,
            name: 'Classe 3A',
            description: 'Maths',
            school: 'Lycée',
            country: 'France',
            level: 'Lycée',
            subject: 'Mathématiques',
            academic_year: '2025-2026',
            objectives: [{ label: 'Algèbre' }],
            twins: 2,
          }}
          onEdit={onEdit}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Classe 3A')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(onEdit).toHaveBeenCalled();
  });
});

describe('LatestTwinsCard', () => {
  it('affiche les jumeaux récents', () => {
    render(
      <MemoryRouter>
        <LatestTwinsCard
          twins={[{ id: 1, name: 'Twin 1', description: null, average_grade: 16 }]}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Twin 1')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Gérer vos jumeaux/i })).toHaveAttribute(
      'href',
      '/twins'
    );
  });
});

describe('GenericModal', () => {
  it('affiche le contenu et confirme', () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();

    render(
      <GenericModal isOpen title="Titre" onClose={onClose} onConfirm={onConfirm}>
        Contenu modal
      </GenericModal>
    );

    expect(screen.getByText('Contenu modal')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Confirmer'));
    expect(onConfirm).toHaveBeenCalled();
  });
});
