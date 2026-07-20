import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AuthModalShell } from '../../src/components/navbar/auth/AuthModalShell';
import SimulationsHeader from '../../src/components/simulation/SimulationsHeader';
import TwinsHeader from '../../src/components/twin/TwinsHeader';
import { SidebarContent } from '../../src/components/sidebar/SidebarContent';
import { ContextList } from '../../src/components/contexts/ContextList';
import { renderWithRouter } from '../utils/testProviders';

vi.mock('../../src/hooks/twins/useContexts');

import { useContexts } from '../../src/hooks/twins/useContexts';

describe('AuthModalShell', () => {
  it('ne rend rien si fermé', () => {
    const { container } = render(
      <AuthModalShell
        isOpen={false}
        onClose={vi.fn()}
        closeLabel="Fermer"
        maxWidthClass="max-w-4xl"
        minHeightClass="min-h-[500px]"
        leftPanelClassName="p-4"
        leftContent={<div>Panneau gauche</div>}
        rightContent={<div>Panneau droit</div>}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('affiche le contenu et ferme au clic', () => {
    const onClose = vi.fn();

    render(
      <AuthModalShell
        isOpen
        onClose={onClose}
        closeLabel="Fermer la modale"
        maxWidthClass="max-w-4xl"
        minHeightClass="min-h-[500px]"
        leftPanelClassName="p-4"
        leftContent={<div>Panneau gauche</div>}
        rightContent={<div>Panneau droit</div>}
      />
    );

    expect(screen.getByText('Panneau gauche')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Fermer la modale' }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe('SimulationsHeader', () => {
  it('affiche le compteur et déclenche onStart', () => {
    const onStart = vi.fn();
    render(<SimulationsHeader simulationsCount={5} onStart={onStart} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Lancer une simulation/i }));
    expect(onStart).toHaveBeenCalled();
  });
});

describe('TwinsHeader', () => {
  it('calcule les statistiques des jumeaux', () => {
    render(
      <TwinsHeader
        twins={[
          { id: 1, behavior: { attention_level: 80 } },
          { id: 2, behavior: { attention_level: 60 } },
        ] as never}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();
  });
});

describe('SidebarContent', () => {
  it('affiche header, navigation et sortie', () => {
    renderWithRouter(<SidebarContent pathname="/dashboard" />);

    expect(screen.getByText('Twin Numérique')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Tableau de bord/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Quitter/i })).toBeInTheDocument();
  });
});

describe('ContextList', () => {
  it('affiche le loader', () => {
    vi.mocked(useContexts).mockReturnValue({ isLoading: true } as never);
    render(<ContextList onEdit={vi.fn()} />);
    expect(screen.getByText('Chargement des données...')).toBeInTheDocument();
  });

  it('affiche une erreur', () => {
    vi.mocked(useContexts).mockReturnValue({ isLoading: false, isError: true } as never);
    render(<ContextList onEdit={vi.fn()} />);
    expect(screen.getByText(/Erreur lors du chargement des contextes/i)).toBeInTheDocument();
  });
});
