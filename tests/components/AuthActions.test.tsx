import { fireEvent, render, screen } from '@testing-library/react';

import { AuthActions } from '../../src/components/navbar/AuthActions';

describe('AuthActions', () => {
  it('déclenche les callbacks connexion et inscription', () => {
    const onLoginClick = vi.fn();
    const onRegisterClick = vi.fn();

    render(<AuthActions onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Connexion' }));
    fireEvent.click(screen.getByRole('button', { name: "S'inscrire" }));

    expect(onLoginClick).toHaveBeenCalledTimes(1);
    expect(onRegisterClick).toHaveBeenCalledTimes(1);
  });
});
