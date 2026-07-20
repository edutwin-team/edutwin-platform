import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from '../../../src/features/settings/defaults';

describe('settings defaults', () => {
  it('utilise une clé de stockage dédiée', () => {
    expect(SETTINGS_STORAGE_KEY).toBe('edutwin-user-settings');
  });

  it('définit des préférences par défaut accessibles', () => {
    expect(DEFAULT_SETTINGS).toEqual({
      theme: 'light',
      reduceMotion: false,
      highContrast: false,
      fontScale: 'normal',
    });
  });
});
