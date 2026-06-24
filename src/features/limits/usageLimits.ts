import type { UsageLimitResource } from '../../config/userLimits';
import { USAGE_LIMIT_LABELS, USER_USAGE_LIMITS } from '../../config/userLimits';

export interface UsageLimitState {
  resource: UsageLimitResource;
  current: number;
  max: number;
  remaining: number;
  isLimitReached: boolean;
  label: string;
}

export function getUsageLimitState(resource: UsageLimitResource, current: number): UsageLimitState {
  const max = USER_USAGE_LIMITS[resource];
  const safeCurrent = Math.max(0, current);

  return {
    resource,
    current: safeCurrent,
    max,
    remaining: Math.max(0, max - safeCurrent),
    isLimitReached: safeCurrent >= max,
    label: USAGE_LIMIT_LABELS[resource],
  };
}

export function getUsageLimitMessage(state: UsageLimitState): string {
  if (state.isLimitReached) {
    return `Limite atteinte : vous avez ${state.max} ${state.label} maximum.`;
  }

  return `${state.remaining} ${state.label} restant(s) sur ${state.max}.`;
}
