import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from './defaults';
import type { FontScale, Theme, UserSettings } from './types';

const LEGACY_THEME_KEY = 'theme';

function parseUserSettings(value: unknown): UserSettings | null {
  if (!value || typeof value !== 'object') return null;

  const candidate = value as Partial<UserSettings>;

  if (candidate.theme !== 'light' && candidate.theme !== 'dark') return null;
  if (typeof candidate.reduceMotion !== 'boolean' || typeof candidate.highContrast !== 'boolean') {
    return null;
  }

  const fontScale: FontScale =
    candidate.fontScale === 'compact' ||
    candidate.fontScale === 'normal' ||
    candidate.fontScale === 'large'
      ? candidate.fontScale
      : DEFAULT_SETTINGS.fontScale;

  return {
    theme: candidate.theme,
    reduceMotion: candidate.reduceMotion,
    highContrast: candidate.highContrast,
    fontScale,
  };
}

export function loadUserSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      const settings = parseUserSettings(parsed);
      if (settings) {
        saveUserSettings(settings);
        return settings;
      }
    }
  } catch {
    // ignore invalid storage payload
  }

  const legacyTheme = localStorage.getItem(LEGACY_THEME_KEY);
  if (legacyTheme === 'light' || legacyTheme === 'dark') {
    const migrated: UserSettings = { ...DEFAULT_SETTINGS, theme: legacyTheme as Theme };
    saveUserSettings(migrated);
    localStorage.removeItem(LEGACY_THEME_KEY);
    return migrated;
  }

  return DEFAULT_SETTINGS;
}

export function saveUserSettings(settings: UserSettings): void {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}
