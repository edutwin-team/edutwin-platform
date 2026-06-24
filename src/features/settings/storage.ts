import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from './defaults';
import type { Theme, UserSettings } from './types';

const LEGACY_THEME_KEY = 'theme';

function isUserSettings(value: unknown): value is UserSettings {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<UserSettings>;
  return (
    (candidate.theme === 'light' || candidate.theme === 'dark') &&
    typeof candidate.reduceMotion === 'boolean' &&
    typeof candidate.highContrast === 'boolean' &&
    typeof candidate.analyticsConsent === 'boolean' &&
    typeof candidate.shareProgress === 'boolean' &&
    typeof candidate.anonymizeData === 'boolean'
  );
}

export function loadUserSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isUserSettings(parsed)) {
        return { ...DEFAULT_SETTINGS, ...parsed };
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
