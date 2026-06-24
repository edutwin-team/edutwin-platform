const STORAGE_KEY_PREFIX = 'edutwin-simulation-count';

function getStorageKey(userId: number): string {
  return `${STORAGE_KEY_PREFIX}:${userId}`;
}

export function getSimulationCount(userId: number): number {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (!raw) return 0;
    const parsed = Number.parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

export function incrementSimulationCount(userId: number): number {
  const next = getSimulationCount(userId) + 1;
  localStorage.setItem(getStorageKey(userId), String(next));
  return next;
}
