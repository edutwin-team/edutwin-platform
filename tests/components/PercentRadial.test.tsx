import { render, screen } from '@testing-library/react';

import PercentRadial from '../../src/components/ui/stats/PercentRadial';

describe('PercentRadial', () => {
  it('affiche la valeur et le libellé', () => {
    render(<PercentRadial value={72} label="Réussite" />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('72%')).toBeInTheDocument();
    expect(screen.getByText('Réussite')).toBeInTheDocument();
  });

  it('borne la valeur entre 0 et 100', () => {
    render(<PercentRadial value={150} label="Score" />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('utilise 0 pour une valeur invalide', () => {
    render(<PercentRadial value={Number.NaN} label="Score" />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});
