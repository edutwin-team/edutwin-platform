import { render, screen } from '@testing-library/react';

import { ContextHeader } from '../../src/components/contexts/ContextHeader';

describe('ContextHeader', () => {
  it('affiche le titre et la description', () => {
    render(<ContextHeader />);

    expect(screen.getByRole('heading', { name: 'Contextes Pédagogiques' })).toBeInTheDocument();
    expect(
      screen.getByText('Gérez les contextes pour vos simulations éducatives.')
    ).toBeInTheDocument();
  });
});
