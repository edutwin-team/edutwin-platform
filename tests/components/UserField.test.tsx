import { fireEvent, render, screen } from '@testing-library/react';
import { User } from 'lucide-react';

import { Field } from '../../src/components/profile/UserField';

const baseEdit = { field: null, values: {} };

describe('UserField', () => {
  it('affiche le libellé et la valeur', () => {
    render(
      <Field
        icon={<User data-testid="field-icon" />}
        label="Prénom"
        value="Alice"
        field="first_name"
        edit={baseEdit}
        startEdit={vi.fn()}
        handleChange={vi.fn()}
      />
    );

    expect(screen.getByText('Prénom')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByTestId('field-icon')).toBeInTheDocument();
  });

  it('affiche un tiret si la valeur est vide', () => {
    render(
      <Field
        icon={<User />}
        label="École"
        value={undefined}
        field="educational_profile.school"
        edit={baseEdit}
        startEdit={vi.fn()}
        handleChange={vi.fn()}
      />
    );

    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('passe en mode édition', () => {
    const startEdit = vi.fn();

    render(
      <Field
        icon={<User />}
        label="Nom"
        value="Martin"
        field="last_name"
        edit={baseEdit}
        startEdit={startEdit}
        handleChange={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Modifier' }));
    expect(startEdit).toHaveBeenCalledWith('last_name', 'Martin');
  });

  it('affiche un input en mode édition', () => {
    render(
      <Field
        icon={<User />}
        label="Prénom"
        value="Alice"
        field="first_name"
        edit={{ field: 'first_name', values: { first_name: 'Alicia' } }}
        startEdit={vi.fn()}
        handleChange={vi.fn()}
      />
    );

    expect(screen.getByDisplayValue('Alicia')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Modifier' })).not.toBeInTheDocument();
  });
});
