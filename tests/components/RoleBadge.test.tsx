import { render, screen } from '@testing-library/react';

import { RoleBadge } from '../../src/components/profile/RoleBadge';

describe('RoleBadge', () => {
  it('affiche Admin pour le rôle admin', () => {
    render(<RoleBadge role="admin" />);
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('affiche Enseignant pour le rôle teacher', () => {
    render(<RoleBadge role="teacher" />);
    expect(screen.getByText('Enseignant')).toBeInTheDocument();
  });

  it('affiche Étudiant par défaut', () => {
    render(<RoleBadge />);
    expect(screen.getByText('Étudiant')).toBeInTheDocument();
  });
});
