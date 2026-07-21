import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from '../../../src/features/settings/defaults';
import { loadUserSettings, saveUserSettings } from '../../../src/features/settings/storage';

describe('settings storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('saveUserSettings', () => {
    it('persiste les paramètres dans le localStorage', () => {
      const settings = { ...DEFAULT_SETTINGS, theme: 'dark' as const };

      saveUserSettings(settings);

      expect(localStorage.getItem(SETTINGS_STORAGE_KEY)).toBe(JSON.stringify(settings));
    });
  });

  describe('loadUserSettings', () => {
    it('retourne les paramètres par défaut si le stockage est vide', () => {
      expect(loadUserSettings()).toEqual(DEFAULT_SETTINGS);
    });

    it('charge les paramètres valides depuis le localStorage', () => {
      const settings = {
        theme: 'dark',
        reduceMotion: true,
        highContrast: false,
        fontScale: 'compact',
      };
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));

      expect(loadUserSettings()).toEqual(settings);
    });

    it('ignore un payload invalide et retourne les valeurs par défaut', () => {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ theme: 'invalid' }));

      expect(loadUserSettings()).toEqual(DEFAULT_SETTINGS);
    });

    it('migre l’ancienne clé theme vers le nouveau format', () => {
      localStorage.setItem('theme', 'dark');

      const settings = loadUserSettings();

      expect(settings.theme).toBe('dark');
      expect(localStorage.getItem('theme')).toBeNull();
      expect(localStorage.getItem(SETTINGS_STORAGE_KEY)).toBe(JSON.stringify(settings));
    });
  });
});
