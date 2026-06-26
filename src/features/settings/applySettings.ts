import type { UserSettings } from './types';

export function applyUserSettings(settings: UserSettings): void {
  const root = document.documentElement;

  root.setAttribute('data-theme', settings.theme);
  root.setAttribute('data-font-scale', settings.fontScale);
  root.setAttribute('data-high-contrast', settings.highContrast ? 'true' : 'false');
  root.setAttribute('data-reduce-motion', settings.reduceMotion ? 'true' : 'false');
}
