import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NavbarBrand } from '../../src/components/navbar/NavbarBrand';

describe('NavbarBrand', () => {
  it('affiche le logo avec la version en tooltip', () => {
    render(
      <MemoryRouter>
        <NavbarBrand version="1.1.0" />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: 'Logo EduTwin' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
