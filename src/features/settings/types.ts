export type Theme = 'light' | 'dark';

export type FontScale = 'compact' | 'normal' | 'large';

export type Difficulty = 'debutant' | 'intermediaire' | 'avance' | 'adaptatif';

export type FeedbackMode = 'immediat' | 'fin-session' | 'mixte';

export type SessionDuration = '30' | '45' | '60' | '90';

export interface UserSettings {
  theme: Theme;
  reduceMotion: boolean;
  highContrast: boolean;
  fontScale: FontScale;
  difficulty: Difficulty;
  feedbackMode: FeedbackMode;
  sessionDuration: SessionDuration;
  analyticsConsent: boolean;
  shareProgress: boolean;
  anonymizeData: boolean;
}
