import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { SidebarExitAction } from '../../src/components/sidebar/SidebarExitAction';

describe('SidebarExitAction', () => {
  it('affiche le lien de sortie vers l’accueil', () => {
    render(
      <MemoryRouter>
        <SidebarExitAction />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Quitter/i })).toHaveAttribute('href', '/');
  });

  it('appelle close au clic', () => {
    const close = vi.fn();

    render(
      <MemoryRouter>
        <SidebarExitAction close={close} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('link', { name: /Quitter/i }));
    expect(close).toHaveBeenCalledTimes(1);
  });
});
