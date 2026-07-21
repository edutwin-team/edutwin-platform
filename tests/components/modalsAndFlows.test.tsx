import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AddQuizModal } from '../../src/components/content/quiz/modals/AddQuizModal';
import { AddQuizChoice } from '../../src/components/content/quiz/modals/AddQuizChoice';
import { ImportQuizForm } from '../../src/components/content/quiz/modals/ImportQuizForm';
import { ManualQuizForm } from '../../src/components/content/quiz/modals/ManualQuizForm';
import PreviousSimulationsCard from '../../src/components/dashboard/PreviousSimulationsCard';
import { SimulationModal } from '../../src/components/simulation/modals/SimulationModal';
import { TwinSelectModal } from '../../src/components/simulation/modals/TwinSelectModal';
import { QuizSelectModal } from '../../src/components/simulation/modals/QuizSelectModal';
import { SimulationFlow } from '../../src/components/simulation/SimulationFlow';
import { LoginModal } from '../../src/components/navbar/login/LoginModal';
import { RegisterModal } from '../../src/components/navbar/register/modals/RegisterModal';
import QuizDetail from '../../src/components/content/quiz/QuizDetail';
import { ObjectiveInput } from '../../src/components/contexts/ObjectiveInput';
import { ContentSourceType, type QuizSimulationResult } from '../../src/types';
import { QueryWrapper, RouterQueryWrapper, renderWithRouter } from '../utils/testProviders';

vi.mock('../../src/hooks/content/quiz/useImportQuiz');
vi.mock('../../src/hooks/twins/useTwins');
vi.mock('../../src/hooks/content/quiz/useQuizzes');
vi.mock('../../src/hooks/simulation/useSimulateQuiz');
vi.mock('../../src/hooks/user/useLogin');
vi.mock('../../src/hooks/user/useRegister');

import { useImportQuiz } from '../../src/hooks/content/quiz/useImportQuiz';
import { useTwins } from '../../src/hooks/twins/useTwins';
import { useQuizzes } from '../../src/hooks/content/quiz/useQuizzes';
import { useSimulateQuiz } from '../../src/hooks/simulation/useSimulateQuiz';
import { useLogin } from '../../src/hooks/user/useLogin';
import { useRegister } from '../../src/hooks/user/useRegister';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const simulationResult = {
  id: 1,
  twin_id: 1,
  twin_name: 'Twin A',
  quiz_id: 2,
  quiz_title: 'Quiz Flow',
  simulated_score: 85,
  simulated_time_seconds: 120,
  correct: 8,
  total: 10,
  passed: true,
  feedback: 'Très bon résultat',
  behavior_snapshot: {} as QuizSimulationResult['behavior_snapshot'],
} satisfies QuizSimulationResult;

const quizWithQuestions = {
  id: 1,
  title: 'Quiz Physique',
  description: 'Chapitre 1',
  difficulty: 'medium',
  source_type: ContentSourceType.MANUAL,
  passing_score: 60,
  time_limit_minutes: 30,
  course: null,
  questions: [
    {
      id: 1,
      text: 'Quelle est la formule de la vitesse ?',
      question_type: 'multiple_choice',
      difficulty_level: 'easy',
      answers: [
        { id: 1, text: 'v = d/t', is_correct: true },
        { id: 2, text: 'v = t/d', is_correct: false },
      ],
    },
  ],
};

describe('AddQuizModal', () => {
  it('navigue entre les étapes et ferme la modale', () => {
    const onClose = vi.fn();
    render(<AddQuizModal isOpen onClose={onClose} />);

    expect(screen.getByText('Créer un quiz')).toBeInTheDocument();
    fireEvent.click(screen.getByText('📥 Importer'));
    expect(screen.getByText('Importer un quiz')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Retour/i }));
    fireEvent.click(screen.getByText('✍️ Manuel (not finished)'));
    expect(screen.getByText('Création manuelle')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Retour/i }));
    fireEvent.click(document.querySelector('.bg-black\\/50')!);
    expect(onClose).toHaveBeenCalled();
  });

  it('ne rend rien si fermée', () => {
    const { container } = render(<AddQuizModal isOpen={false} onClose={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('AddQuizChoice', () => {
  it('déclenche les callbacks', () => {
    const onImport = vi.fn();
    const onManual = vi.fn();
    const onClose = vi.fn();

    render(<AddQuizChoice onImport={onImport} onManual={onManual} onClose={onClose} />);

    fireEvent.click(screen.getByText('📥 Importer'));
    fireEvent.click(screen.getByText('✍️ Manuel (not finished)'));
    fireEvent.click(screen.getByRole('button', { name: '✕' }));

    expect(onImport).toHaveBeenCalled();
    expect(onManual).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});

describe('ImportQuizForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('importe un fichier avec succès', async () => {
    const mutate = vi.fn((_file, opts) => opts.onSuccess());
    vi.mocked(useImportQuiz).mockReturnValue({ mutate, isPending: false } as never);

    const onSuccess = vi.fn();
    render(<ImportQuizForm onBack={vi.fn()} onSuccess={onSuccess} />);

    const file = new File(['a,b,c'], 'quiz.csv', { type: 'text/csv' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(mutate).toHaveBeenCalled();
    expect(screen.getByText('Quiz importé avec succès')).toBeInTheDocument();

    vi.advanceTimersByTime(600);
    expect(onSuccess).toHaveBeenCalled();
  });

  it('affiche une erreur et permet de revenir', () => {
    const mutate = vi.fn((_file, opts) => opts.onError());
    vi.mocked(useImportQuiz).mockReturnValue({ mutate, isPending: false } as never);
    const onBack = vi.fn();

    render(<ImportQuizForm onBack={onBack} onSuccess={vi.fn()} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, {
      target: { files: [new File(['bad'], 'bad.csv', { type: 'text/csv' })] },
    });

    expect(screen.getByText('Format de quiz invalide')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Retour/i }));
    expect(onBack).toHaveBeenCalled();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});

describe('ManualQuizForm', () => {
  it('permet de saisir et revenir', () => {
    const onBack = vi.fn();
    render(<ManualQuizForm onBack={onBack} />);

    fireEvent.change(screen.getByPlaceholderText('Titre du quiz'), {
      target: { value: 'Mon quiz' },
    });
    expect(screen.getByDisplayValue('Mon quiz')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Retour/i }));
    expect(onBack).toHaveBeenCalled();
  });
});

describe('PreviousSimulationsCard', () => {
  it('affiche les simulations passées', () => {
    render(<PreviousSimulationsCard />);

    expect(screen.getByText('Previous Simulations')).toBeInTheDocument();
    expect(screen.getByText('Math Final Exam')).toBeInTheDocument();
    expect(screen.getByText('82%')).toBeInTheDocument();
    expect(screen.getAllByText('Success')).toHaveLength(2);
    expect(screen.getByText('Fail')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View All Simulations/i })).toBeInTheDocument();
  });
});

describe('SimulationModal', () => {
  it('affiche le chargement', () => {
    render(<SimulationModal loading result={undefined} onClose={vi.fn()} />);
    expect(screen.getByText('Simulation IA en cours...')).toBeInTheDocument();
  });

  it('affiche une erreur', () => {
    const onClose = vi.fn();
    render(<SimulationModal loading={false} error="Limite atteinte" onClose={onClose} />);

    expect(screen.getByText('Simulation impossible')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Compris' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('affiche le résultat', () => {
    const onClose = vi.fn();
    render(<SimulationModal loading={false} result={simulationResult} onClose={onClose} />);

    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('Très bon résultat')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Fermer la simulation/i }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe('TwinSelectModal', () => {
  it('sélectionne un jumeau', () => {
    vi.mocked(useTwins).mockReturnValue({
      data: [{ id: 1, name: 'Twin A', description: 'Desc A' }],
      isLoading: false,
    } as never);

    const onSelect = vi.fn();
    render(
      <QueryWrapper>
        <TwinSelectModal onSelect={onSelect} onClose={vi.fn()} />
      </QueryWrapper>
    );

    fireEvent.click(screen.getByText('Twin A'));
    fireEvent.click(screen.getByRole('button', { name: /Suivant/i }));
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('affiche le loader', () => {
    vi.mocked(useTwins).mockReturnValue({ isLoading: true } as never);
    render(
      <QueryWrapper>
        <TwinSelectModal onSelect={vi.fn()} onClose={vi.fn()} />
      </QueryWrapper>
    );
    expect(screen.getByText('Chargement des données...')).toBeInTheDocument();
  });

  it('affiche un message et un lien de création sans jumeau', () => {
    vi.mocked(useTwins).mockReturnValue({ data: [], isLoading: false } as never);

    render(
      <RouterQueryWrapper>
        <TwinSelectModal onSelect={vi.fn()} onClose={vi.fn()} />
      </RouterQueryWrapper>
    );

    expect(screen.getByText('Aucun jumeau disponible')).toBeInTheDocument();
    expect(
      screen.getByText(/Vous devez créer un jumeau numérique avant de lancer une simulation/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Créer un jumeau/i })).toHaveAttribute('href', '/twins');
    expect(screen.queryByRole('button', { name: /Suivant/i })).not.toBeInTheDocument();
  });
});

describe('QuizSelectModal', () => {
  it('sélectionne un quiz et lance la simulation', () => {
    vi.mocked(useQuizzes).mockReturnValue({
      data: [{ id: 2, title: 'Quiz B', description: 'Desc B' }],
      isLoading: false,
    } as never);

    const onSelect = vi.fn();
    render(
      <QueryWrapper>
        <QuizSelectModal onSelect={onSelect} onBack={vi.fn()} onClose={vi.fn()} />
      </QueryWrapper>
    );

    fireEvent.click(screen.getByText('Quiz B'));
    fireEvent.click(screen.getByRole('button', { name: /Lancer la simulation/i }));
    expect(onSelect).toHaveBeenCalledWith(2);
  });
});

describe('SimulationFlow', () => {
  beforeEach(() => {
    vi.mocked(useTwins).mockReturnValue({
      data: [{ id: 1, name: 'Twin Flow', description: 'Test' }],
      isLoading: false,
    } as never);
    vi.mocked(useQuizzes).mockReturnValue({
      data: [{ id: 2, title: 'Quiz Flow', description: 'Test' }],
      isLoading: false,
    } as never);
  });

  it('enchaîne twin, quiz et résultat', async () => {
    vi.mocked(useSimulateQuiz).mockReturnValue({
      mutateAsync: vi.fn().mockResolvedValue(simulationResult),
    } as never);

    render(
      <QueryWrapper>
        <SimulationFlow onClose={vi.fn()} />
      </QueryWrapper>
    );

    fireEvent.click(screen.getByText('Twin Flow'));
    fireEvent.click(screen.getByRole('button', { name: /Suivant/i }));

    fireEvent.click(screen.getByText('Quiz Flow'));
    fireEvent.click(screen.getByRole('button', { name: /Lancer la simulation/i }));

    expect(screen.getByText('Simulation IA en cours...')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText('Très bon résultat')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  }, 10000);

  it('affiche une erreur de limite', async () => {
    vi.mocked(useSimulateQuiz).mockReturnValue({
      mutateAsync: vi.fn().mockRejectedValue(new Error('limit')),
    } as never);

    render(
      <QueryWrapper>
        <SimulationFlow onClose={vi.fn()} />
      </QueryWrapper>
    );

    fireEvent.click(screen.getByText('Twin Flow'));
    fireEvent.click(screen.getByRole('button', { name: /Suivant/i }));
    fireEvent.click(screen.getByText('Quiz Flow'));
    fireEvent.click(screen.getByRole('button', { name: /Lancer la simulation/i }));

    await waitFor(() => {
      expect(screen.getByText(/limite d.essais/i)).toBeInTheDocument();
    });
  });
});

describe('LoginModal', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('valide les champs et connecte l’utilisateur', () => {
    const mutate = vi.fn((_data, opts) => opts.onSuccess());
    vi.mocked(useLogin).mockReturnValue({ mutate, isPending: false } as never);
    const onClose = vi.fn();

    renderWithRouter(<LoginModal isOpen onClose={onClose} />);

    const form = screen.getByRole('button', { name: 'Se connecter' }).closest('form')!;

    fireEvent.submit(form);
    expect(screen.getByText('Email requis')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('nom@ecole.fr'), {
      target: { value: 'bad-email' },
    });
    fireEvent.change(screen.getByPlaceholderText('Votre mot de passe'), {
      target: { value: 'abcdef' },
    });
    fireEvent.submit(form);
    expect(screen.getByText('Email invalide')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('nom@ecole.fr'), {
      target: { value: 'user@test.fr' },
    });
    fireEvent.change(screen.getByPlaceholderText('Votre mot de passe'), {
      target: { value: 'secret123' },
    });
    fireEvent.submit(form);

    expect(mutate).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('affiche une erreur de connexion', () => {
    const mutate = vi.fn((_data, opts) => opts.onError());
    vi.mocked(useLogin).mockReturnValue({ mutate, isPending: false } as never);

    renderWithRouter(<LoginModal isOpen onClose={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('nom@ecole.fr'), {
      target: { value: 'user@test.fr' },
    });
    fireEvent.change(screen.getByPlaceholderText('Votre mot de passe'), {
      target: { value: 'secret123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }));

    expect(screen.getByText('Email ou mot de passe incorrect')).toBeInTheDocument();
  });
});

describe('RegisterModal', () => {
  it('valide l’étape 1 et passe à l’étape 2', () => {
    vi.mocked(useRegister).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);

    renderWithRouter(<RegisterModal isOpen onClose={vi.fn()} />);

    const form = screen.getByRole('button', { name: 'Suivant' }).closest('form')!;
    fireEvent.submit(form);
    expect(screen.getByText('Veuillez remplir tous les champs')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Prénom'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByPlaceholderText('Nom'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'jean@test.fr' } });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe'), { target: { value: 'pass123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirmer votre mot de passe'), {
      target: { value: 'pass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Suivant' }));
    expect(screen.getByText('Informations pédagogiques')).toBeInTheDocument();
  });
});

describe('QuizDetail', () => {
  it('affiche les questions et réponses', () => {
    render(<QuizDetail quiz={quizWithQuestions as never} />);

    expect(screen.getByText('Quiz Physique')).toBeInTheDocument();
    expect(screen.getByText(/Quelle est la formule de la vitesse/i)).toBeInTheDocument();
    expect(screen.getByText(/v = d\/t/i)).toBeInTheDocument();
  });
});

describe('ObjectiveInput', () => {
  it('ajoute et supprime un objectif', () => {
    const Wrapper = () => {
      const [objectives, setObjectives] = useState<{ id?: number; label: string }[]>([]);
      return <ObjectiveInput objectives={objectives} setObjectives={setObjectives} />;
    };

    const { container } = render(<Wrapper />);

    fireEvent.change(screen.getByPlaceholderText(/Comprendre les matrices/i), {
      target: { value: 'Maîtriser les équations' },
    });
    fireEvent.click(container.querySelector('.btn-primary')!);
    expect(screen.getByText('Maîtriser les équations')).toBeInTheDocument();

    fireEvent.click(container.querySelector('button')!);
    expect(screen.queryByText('Maîtriser les équations')).not.toBeInTheDocument();
  });
});
