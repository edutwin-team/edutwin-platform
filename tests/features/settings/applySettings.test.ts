import { applyUserSettings } from '../../../src/features/settings/applySettings';
import { DEFAULT_SETTINGS } from '../../../src/features/settings/defaults';
import type { UserSettings } from '../../../src/features/settings/types';

describe('applyUserSettings', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-font-scale');
    document.documentElement.removeAttribute('data-high-contrast');
    document.documentElement.removeAttribute('data-reduce-motion');
  });

  it('applique le thème et les préférences d’accessibilité', () => {
    const settings: UserSettings = {
      theme: 'dark',
      fontScale: 'large',
      highContrast: true,
      reduceMotion: true,
    };

    applyUserSettings(settings);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-font-scale')).toBe('large');
    expect(document.documentElement.getAttribute('data-high-contrast')).toBe('true');
    expect(document.documentElement.getAttribute('data-reduce-motion')).toBe('true');
  });

  it('désactive les attributs booléens quand les options sont off', () => {
    applyUserSettings(DEFAULT_SETTINGS);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-high-contrast')).toBe('false');
    expect(document.documentElement.getAttribute('data-reduce-motion')).toBe('false');
  });
});
