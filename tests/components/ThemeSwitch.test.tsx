import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeSwitch } from '../../src/components/navbar/ThemeSwitch';

describe('ThemeSwitch', () => {
  it('affiche la case à cocher avec le bon état', () => {
    render(<ThemeSwitch isDark={false} onToggle={vi.fn()} />);

    const toggle = screen.getByRole('checkbox', { name: /Activer le mode sombre/i });
    expect(toggle).not.toBeChecked();
  });

  it('appelle onToggle au changement', () => {
    const onToggle = vi.fn();
    render(<ThemeSwitch isDark={false} onToggle={onToggle} />);

    fireEvent.click(screen.getByRole('checkbox', { name: /Activer le mode sombre/i }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
