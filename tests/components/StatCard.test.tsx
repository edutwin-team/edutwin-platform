import { render, screen } from '@testing-library/react';

import StatCard from '../../src/components/ui/stats/StatCard';

describe('StatCard', () => {
  it('affiche le titre, la valeur et l’icône', () => {
    render(
      <StatCard
        title="Simulations"
        value={42}
        icon={<span data-testid="stat-icon">📊</span>}
        bgColor="bg-primary"
      />
    );

    expect(screen.getByText('Simulations')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByTestId('stat-icon')).toBeInTheDocument();
  });
});
