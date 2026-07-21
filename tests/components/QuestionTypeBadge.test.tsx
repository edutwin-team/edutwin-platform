import { render, screen } from '@testing-library/react';

import { QuestionTypeBadge } from '../../src/components/ui/badges/QuestionTypeBadge';

describe('QuestionTypeBadge', () => {
  it.each([
    ['single_choice', 'Choix unique'],
    ['multiple_choice', 'Choix multiple'],
    ['true_false', 'Vrai / Faux'],
  ] as const)('affiche le libellé pour %s', (type, label) => {
    render(<QuestionTypeBadge type={type} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
