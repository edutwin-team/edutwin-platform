import { useMemo } from 'react';
import type { UsageLimitResource } from '../../config/userLimits';
import { getUsageLimitState } from '../../features/limits/usageLimits';

export function useUsageLimit(resource: UsageLimitResource, current: number) {
  return useMemo(() => getUsageLimitState(resource, current), [resource, current]);
}
