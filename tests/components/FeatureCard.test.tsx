import { render, screen } from '@testing-library/react';

import { FeatureCard } from '../../src/components/home/FeatureCard';

describe('FeatureCard', () => {
  it('affiche le titre et la description', () => {
    render(
      <FeatureCard
        title="Simulation IA"
        description="Testez vos contenus pédagogiques."
        icon={<span data-testid="feature-icon">🎯</span>}
      />
    );

    expect(screen.getByRole('heading', { name: 'Simulation IA' })).toBeInTheDocument();
    expect(screen.getByText('Testez vos contenus pédagogiques.')).toBeInTheDocument();
    expect(screen.getByTestId('feature-icon')).toBeInTheDocument();
  });

  it('affiche le badge optionnel', () => {
    render(
      <FeatureCard
        title="Quiz"
        description="Créez des évaluations."
        icon={<span>📝</span>}
        optionLabel="Nouveau"
      />
    );

    expect(screen.getByText('Nouveau')).toBeInTheDocument();
  });
});
