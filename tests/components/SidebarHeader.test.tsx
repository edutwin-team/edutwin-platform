import { render, screen } from '@testing-library/react';

import { SidebarHeader } from '../../src/components/sidebar/SidebarHeader';

describe('SidebarHeader', () => {
  it('affiche le branding de la sidebar', () => {
    render(<SidebarHeader />);

    expect(screen.getByText('DT')).toBeInTheDocument();
    expect(screen.getByText('Twin Numérique')).toBeInTheDocument();
    expect(screen.getByText('Simulation étudiante')).toBeInTheDocument();
  });
});
