export const USER_USAGE_LIMITS = {
  twins: 5,
  contexts: 5,
  simulations: 5,
} as const;

export type UsageLimitResource = keyof typeof USER_USAGE_LIMITS;

export const USAGE_LIMIT_LABELS: Record<UsageLimitResource, string> = {
  twins: 'jumeaux',
  contexts: 'contextes',
  simulations: 'simulations',
};
