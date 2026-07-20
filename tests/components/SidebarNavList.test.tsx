import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';

import { SidebarNavList } from '../../src/components/sidebar/SidebarNavList';

const links = [
  { name: 'Tableau de bord', path: '/dashboard', icon: HiHome },
  { name: 'Quiz', path: '/quizzes', icon: HiHome },
];

describe('SidebarNavList', () => {
  it('affiche les liens de navigation', () => {
    render(
      <MemoryRouter>
        <SidebarNavList links={links} pathname="/dashboard" />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Tableau de bord/i })).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', { name: /Quiz/i })).toHaveAttribute('href', '/quizzes');
  });

  it('met en évidence le lien actif', () => {
    render(
      <MemoryRouter>
        <SidebarNavList links={links} pathname="/dashboard" />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Tableau de bord/i })).toHaveClass('text-white');
  });

  it('appelle close au clic sur un lien', () => {
    const close = vi.fn();

    render(
      <MemoryRouter>
        <SidebarNavList links={links} pathname="/quizzes" close={close} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('link', { name: /Quiz/i }));
    expect(close).toHaveBeenCalledTimes(1);
  });
});
