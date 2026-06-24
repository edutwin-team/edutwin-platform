import { describe, expect, it } from 'vitest';
import { getUsageLimitMessage, getUsageLimitState } from '../../src/features/limits/usageLimits';

describe('usageLimits', () => {
  it('calcule correctement le quota restant', () => {
    const state = getUsageLimitState('twins', 3);

    expect(state.current).toBe(3);
    expect(state.max).toBe(5);
    expect(state.remaining).toBe(2);
    expect(state.isLimitReached).toBe(false);
  });

  it('détecte la limite atteinte', () => {
    const state = getUsageLimitState('contexts', 5);

    expect(state.isLimitReached).toBe(true);
    expect(state.remaining).toBe(0);
    expect(getUsageLimitMessage(state)).toContain('Limite atteinte');
  });
});
