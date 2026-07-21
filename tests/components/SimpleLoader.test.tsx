import { render, screen } from '@testing-library/react';

import { SimpleLoader } from '../../src/components/ui/loaders/SimpleLoader';

describe('SimpleLoader', () => {
  it('affiche un indicateur de chargement', () => {
    render(<SimpleLoader />);
    expect(screen.getByText('Chargement des données...')).toBeInTheDocument();
  });
});
