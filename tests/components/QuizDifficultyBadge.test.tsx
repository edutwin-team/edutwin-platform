import { render, screen } from '@testing-library/react';

import { QuizDifficultyBadge } from '../../src/components/ui/badges/QuizDifficultyBadge';

describe('QuizDifficultyBadge', () => {
  it.each([
    ['easy', 'Facile'],
    ['medium', 'Moyen'],
    ['hard', 'Difficile'],
  ] as const)('affiche le libellé pour le niveau %s', (level, label) => {
    render(<QuizDifficultyBadge level={level} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
