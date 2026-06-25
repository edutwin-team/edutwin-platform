import { useQuery } from '@tanstack/react-query';
import { getSimulationHistory } from '../../api/simulation/simulation';

export const useSimulationHistory = () => {
  return useQuery({
    queryKey: ['simulations'],
    queryFn: getSimulationHistory,
  });
};
