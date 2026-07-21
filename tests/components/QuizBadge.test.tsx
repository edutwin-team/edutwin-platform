import { render, screen } from '@testing-library/react';

import { QuizBadge } from '../../src/components/ui/badges/QuizBadge';

describe('QuizBadge', () => {
  it('affiche le libellé fourni', () => {
    render(<QuizBadge label="Maths" />);
    expect(screen.getByText('Maths')).toBeInTheDocument();
  });

  it('applique la variante outline par défaut', () => {
    render(<QuizBadge label="Quiz" />);
    expect(screen.getByText('Quiz')).toHaveClass('badge-outline');
  });

  it('applique la variante primary', () => {
    render(<QuizBadge label="Actif" variant="primary" />);
    expect(screen.getByText('Actif')).toHaveClass('badge-primary');
  });
});
