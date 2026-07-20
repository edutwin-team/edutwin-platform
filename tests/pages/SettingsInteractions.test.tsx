import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Settings from '../../src/pages/settings/Settings';
import { renderWithFullProviders } from '../utils/testProviders';

describe('Settings interactions', () => {
  it('modifie le thème, la taille du texte et l’accessibilité', async () => {
    renderWithFullProviders(<Settings />);

    fireEvent.click(screen.getByRole('checkbox', { name: /Activer le mode sombre/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Grande' }));
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[checkboxes.length - 2]);
    fireEvent.click(checkboxes[checkboxes.length - 1]);

    fireEvent.click(screen.getByRole('button', { name: /Enregistrer les préférences/i }));

    await waitFor(() => {
      expect(screen.getByText(/Préférences enregistrées et appliquées/i)).toBeInTheDocument();
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-font-scale')).toBe('large');
  });
});
