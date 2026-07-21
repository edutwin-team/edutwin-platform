import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Profile from '../../src/pages/profile/Profile';
import Results from '../../src/pages/results/Results';
import Teacher from '../../src/pages/teacher/Teacher';
import { renderWithFullProviders } from '../utils/testProviders';

vi.mock('../../src/context/useAuth');
vi.mock('../../src/hooks/user/useUpdateMe');

import { useAuth } from '../../src/context/useAuth';
import { useUpdateMe } from '../../src/hooks/user/useUpdateMe';

const mockUser = {
  id: 1,
  email: 'alice@test.com',
  first_name: 'Alice',
  last_name: 'Martin',
  role: 'teacher',
  educational_profile: {
    school: 'Lycée Test',
    diploma: 'Master',
    experience_years: 5,
  },
};

describe('Profile page', () => {
  it('affiche le chargement sans utilisateur', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, isLoading: false });
    vi.mocked(useUpdateMe).mockReturnValue({ mutate: vi.fn() } as never);

    renderWithFullProviders(<Profile />);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('affiche le profil et permet l’édition', () => {
    const updateUser = vi.fn();
    vi.mocked(useAuth).mockReturnValue({ user: mockUser, isLoading: false });
    vi.mocked(useUpdateMe).mockReturnValue({ mutate: updateUser } as never);

    renderWithFullProviders(<Profile />);

    expect(screen.getByText('Gestion de votre profil utilisateur')).toBeInTheDocument();
    expect(screen.getByText('alice@test.com')).toBeInTheDocument();
    expect(screen.getByText('Enseignant')).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'Modifier' })[0]);
    fireEvent.change(screen.getByDisplayValue('Alice'), { target: { value: 'Alicia' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sauvegarder' }));

    expect(updateUser).toHaveBeenCalledWith({ first_name: 'Alicia' });
  });

  it('affiche une erreur pour des caractères invalides', () => {
    vi.mocked(useAuth).mockReturnValue({ user: mockUser, isLoading: false });
    vi.mocked(useUpdateMe).mockReturnValue({ mutate: vi.fn() } as never);

    renderWithFullProviders(<Profile />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Modifier' })[0]);
    fireEvent.change(screen.getByDisplayValue('Alice'), { target: { value: 'Ali@ce' } });

    expect(screen.getByText('Caractères non autorisés')).toBeInTheDocument();
  });
});

describe('Results page', () => {
  it('affiche les KPIs et le feedback', () => {
    render(<Results />);
    expect(screen.getByText(/Résultats & Feedback/i)).toBeInTheDocument();
    expect(screen.getByText('81%')).toBeInTheDocument();
    expect(screen.getByText('Forces')).toBeInTheDocument();
  });
});

describe('Teacher page', () => {
  it('affiche les indicateurs enseignant', () => {
    render(<Teacher />);
    expect(screen.getByText(/Espace Enseignant/i)).toBeInTheDocument();
  });
});
