import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { applyUserSettings } from './applySettings';
import { DEFAULT_SETTINGS } from './defaults';
import { SettingsContext } from './settingsContext';
import { loadUserSettings, saveUserSettings } from './storage';
import type { UserSettings } from './types';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(() => loadUserSettings());

  const persistSettings = useCallback((next: UserSettings) => {
    setSettings(next);
    applyUserSettings(next);
    saveUserSettings(next);
  }, []);

  const saveSettings = useCallback(
    (next: UserSettings) => {
      persistSettings(next);
    },
    [persistSettings],
  );

  const resetSettings = useCallback(() => {
    persistSettings(DEFAULT_SETTINGS);
  }, [persistSettings]);

  const toggleTheme = useCallback(() => {
    setSettings((prev) => {
      const next: UserSettings = {
        ...prev,
        theme: prev.theme === 'light' ? 'dark' : 'light',
      };
      applyUserSettings(next);
      saveUserSettings(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      settings,
      saveSettings,
      resetSettings,
      toggleTheme,
    }),
    [settings, saveSettings, resetSettings, toggleTheme],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
