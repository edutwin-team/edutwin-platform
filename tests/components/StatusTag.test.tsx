import { render, screen } from '@testing-library/react';

import StatusTag from '../../src/components/ui/stats/StatusTag';

const statusMap = {
  active: { label: 'Actif', color: 'badge-success' },
  draft: { label: 'Brouillon', color: 'badge-warning' },
};

describe('StatusTag', () => {
  it('affiche le libellé mappé', () => {
    render(<StatusTag value="active" map={statusMap} />);
    expect(screen.getByText('Actif')).toBeInTheDocument();
  });

  it('affiche la valeur brute si elle est absente du mapping', () => {
    render(<StatusTag value="archived" map={statusMap} />);
    expect(screen.getByText('archived')).toBeInTheDocument();
  });

  it('utilise le style ghost pour une valeur inconnue', () => {
    render(<StatusTag value="archived" map={statusMap} />);
    expect(screen.getByText('archived')).toHaveClass('badge-ghost');
  });
});
