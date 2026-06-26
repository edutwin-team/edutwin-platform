export type Theme = 'light' | 'dark';

export type FontScale = 'compact' | 'normal' | 'large';

export interface UserSettings {
  theme: Theme;
  reduceMotion: boolean;
  highContrast: boolean;
  fontScale: FontScale;
}
