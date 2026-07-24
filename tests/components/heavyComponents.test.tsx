import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TwinModal } from '../../src/components/twin/TwinModal';
import { ContextForm } from '../../src/components/contexts/ContextForm';
import SimulationsChart from '../../src/components/dashboard/SimulationsChart';
import Twins from '../../src/pages/twins/Twins';
import { QueryWrapper, RouterQueryWrapper, renderWithFullProviders } from '../utils/testProviders';

vi.mock('../../src/hooks/twins/useContexts');
vi.mock('../../src/hooks/twins/useCreateTwin');
vi.mock('../../src/hooks/twins/useUpdateTwin');
vi.mock('../../src/hooks/twins/useCreateContext');
vi.mock('../../src/hooks/twins/useUpdateContext');
vi.mock('../../src/hooks/twins/useTwins');

import { useContexts } from '../../src/hooks/twins/useContexts';
import { useCreateTwin } from '../../src/hooks/twins/useCreateTwin';
import { useUpdateTwin } from '../../src/hooks/twins/useUpdateTwin';
import { useCreateContext } from '../../src/hooks/twins/useCreateContext';
import { useUpdateContext } from '../../src/hooks/twins/useUpdateContext';
import { useTwins } from '../../src/hooks/twins/useTwins';

const twin = {
  id: 1,
  name: 'Twin Beta',
  age: 16,
  average_grade: 14,
  description: 'Un profil test',
  context: 1,
  behavior: {
    attention_level: 60,
    motivation: 70,
    stress_level: 30,
    fatigue_level: 20,
    comprehension_level: 65,
    learning_speed: 55,
    memory_retention: 62,
    autonomy_level: 58,
    persistence_level: 72,
    curiosity_level: 68,
    error_rate: 15,
    question_frequency: 25,
    learning_style: 'visual',
    preferred_content_type: 'video',
    comment: 'Test',
  },
} as never;

describe('TwinModal', () => {
  it('affiche le formulaire de création', () => {
    vi.mocked(useContexts).mockReturnValue({
      data: [{ id: 1, name: 'Contexte 1' }],
    } as never);
    vi.mocked(useCreateTwin).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateTwin).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);

    render(
      <QueryWrapper>
        <TwinModal open onClose={vi.fn()} />
      </QueryWrapper>
    );

    expect(screen.getByText(/Créer un jumeau numérique/i)).toBeInTheDocument();
    expect(screen.getAllByText('*').length).toBeGreaterThanOrEqual(4);
    fireEvent.change(screen.getByPlaceholderText(/Mohamed, Emma, Lucas/i), {
      target: { value: 'Nouveau Twin' },
    });
  });

  it('affiche le formulaire en mode édition', () => {
    vi.mocked(useContexts).mockReturnValue({ data: [{ id: 1, name: 'Contexte 1' }] } as never);
    vi.mocked(useCreateTwin).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateTwin).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);

    render(
      <QueryWrapper>
        <TwinModal open twin={twin} onClose={vi.fn()} />
      </QueryWrapper>
    );

    expect(screen.getByDisplayValue('Twin Beta')).toBeInTheDocument();
  });

  it('affiche un message et redirige vers la création de contexte', () => {
    vi.mocked(useContexts).mockReturnValue({ data: [], isLoading: false } as never);
    vi.mocked(useCreateTwin).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateTwin).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);

    render(
      <RouterQueryWrapper>
        <TwinModal open onClose={vi.fn()} />
      </RouterQueryWrapper>
    );

    fireEvent.change(screen.getByPlaceholderText(/Mohamed, Emma, Lucas/i), {
      target: { value: 'Nouveau Twin' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ex. : 18'), { target: { value: '18' } });
    fireEvent.change(screen.getByPlaceholderText('Ex. : 14.5'), { target: { value: '14' } });
    fireEvent.change(screen.getByPlaceholderText(/Élève motivé/i), {
      target: { value: 'Description test' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Suivant/i }));

    expect(screen.getByText('Aucun contexte pédagogique disponible')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Créer un contexte pédagogique/i })
    ).toHaveAttribute('href', '/contexts');
  });
});

describe('ContextForm', () => {
  it('permet de saisir un nouveau contexte', () => {
    vi.mocked(useCreateContext).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateContext).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);

    render(
      <QueryWrapper>
        <ContextForm />
      </QueryWrapper>
    );

    fireEvent.change(screen.getByPlaceholderText(/Algèbre linéaire/i), {
      target: { value: 'Classe 2B' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ex: École Hexagone'), {
      target: { value: 'Lycée Test' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ex: France'), {
      target: { value: 'France' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ex: Bac +3'), {
      target: { value: 'Lycée' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ex: Informatique'), {
      target: { value: 'Maths' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ex: 2025-2026'), {
      target: { value: '2025-2026' },
    });

    expect(screen.getByDisplayValue('Classe 2B')).toBeInTheDocument();
  });

  it('soumet le formulaire de création', () => {
    const createContext = vi.fn((_payload, opts) => opts.onSuccess());
    vi.mocked(useCreateContext).mockReturnValue({
      mutate: createContext,
      isPending: false,
    } as never);
    vi.mocked(useUpdateContext).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);

    render(
      <QueryWrapper>
        <ContextForm />
      </QueryWrapper>
    );

    fireEvent.change(screen.getByPlaceholderText(/Algèbre linéaire/i), {
      target: { value: 'Classe 2B' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ex: École Hexagone'), {
      target: { value: 'Lycée Test' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ex: France'), {
      target: { value: 'France' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ex: Bac +3'), {
      target: { value: 'Lycée' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ex: Informatique'), {
      target: { value: 'Maths' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ex: 2025-2026'), {
      target: { value: '2025-2026' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Créer le contexte/i }));

    expect(screen.getByText('Voulez-vous créer ce contexte pédagogique ?')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Créer').find((el) => el.tagName === 'BUTTON')!);

    expect(createContext).toHaveBeenCalled();
  });
});

describe('SimulationsChart', () => {
  it('affiche le graphique et filtre par jour', () => {
    render(
      <SimulationsChart
        data={[
          { day: 'Monday', count: 3 },
          { day: 'Tuesday', count: 1 },
        ]}
      />
    );

    expect(screen.getByText('Simulations des 7 derniers jours')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Monday' } });
    expect(screen.getByRole('combobox')).toHaveValue('Monday');
  });
});

describe('Twins page avec données', () => {
  it('affiche la liste et ouvre la modale', () => {
    vi.mocked(useTwins).mockReturnValue({
      data: [twin],
      isLoading: false,
      isError: false,
    } as never);
    vi.mocked(useContexts).mockReturnValue({ data: [{ id: 1, name: 'Ctx' }] } as never);
    vi.mocked(useCreateTwin).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateTwin).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);

    renderWithFullProviders(<Twins />);

    expect(screen.getByText('Twin Beta')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Nouveau Jumeau/i }));
    expect(screen.getByText(/Créer un jumeau numérique/i)).toBeInTheDocument();
  });
});
