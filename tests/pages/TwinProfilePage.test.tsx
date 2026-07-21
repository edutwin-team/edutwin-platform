import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import TwinProfilePage from '../../src/pages/profile/TwinProfilePage';

describe('TwinProfilePage', () => {
  it('affiche les sections du profil jumeau', () => {
    render(
      <MemoryRouter>
        <TwinProfilePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Profil Élève/i })).toBeInTheDocument();
    expect(screen.getByText(/Mathématiques\s*:\s*74%/)).toBeInTheDocument();
    expect(screen.getByText('Supports visuels')).toBeInTheDocument();
  });
});
