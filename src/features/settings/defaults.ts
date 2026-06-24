import type { UserSettings } from './types';

export const SETTINGS_STORAGE_KEY = 'edutwin-user-settings';

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  reduceMotion: false,
  highContrast: false,
  fontScale: 'normal',
};
