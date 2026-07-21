import { render, screen } from '@testing-library/react';

import { FormLabel, RequiredMark } from '../../src/components/ui/form/FormLabel';

describe('FormLabel', () => {
  it('affiche un astérisque pour les champs obligatoires', () => {
    render(<FormLabel required>Email</FormLabel>);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('(obligatoire)')).toHaveClass('sr-only');
  });

  it('n’affiche pas d’astérisque pour les champs optionnels', () => {
    render(<FormLabel>Description</FormLabel>);

    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });
});

describe('RequiredMark', () => {
  it('affiche l’astérisque et le texte accessible', () => {
    render(<RequiredMark />);

    expect(screen.getByText('*')).toHaveClass('text-error');
    expect(screen.getByText('(obligatoire)')).toHaveClass('sr-only');
  });
});
