import { useCallback, useSyncExternalStore } from 'react';
import {
  getSimulationCount,
  incrementSimulationCount,
} from '../../features/limits/simulationUsage';
import { useUsageLimit } from '../../hooks/limits/useUsageLimit';
import { useAuth } from '../../context/useAuth';

const SIMULATION_USAGE_EVENT = 'edutwin-simulation-usage-change';

function subscribe(onStoreChange: () => void) {
  window.addEventListener(SIMULATION_USAGE_EVENT, onStoreChange);
  return () => window.removeEventListener(SIMULATION_USAGE_EVENT, onStoreChange);
}

export function useSimulationUsageLimit() {
  const { user } = useAuth();
  const userId = user?.id ?? 0;

  const current = useSyncExternalStore(
    subscribe,
    () => getSimulationCount(userId),
    () => 0
  );

  const usage = useUsageLimit('simulations', current);

  const registerSimulation = useCallback(() => {
    if (usage.isLimitReached || !userId) return false;
    incrementSimulationCount(userId);
    window.dispatchEvent(new Event(SIMULATION_USAGE_EVENT));
    return true;
  }, [usage.isLimitReached, userId]);

  return {
    usage,
    registerSimulation,
    canStartSimulation: Boolean(userId) && !usage.isLimitReached,
  };
}
