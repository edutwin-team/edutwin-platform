import { createContext } from 'react';
import type { UserSettings } from './types';

export interface SettingsContextValue {
  settings: UserSettings;
  saveSettings: (next: UserSettings) => void;
  resetSettings: () => void;
  toggleTheme: () => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);
