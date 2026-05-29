import { useQuery } from '@tanstack/react-query';
import { getContexts } from '../../api/twins/context';

export const useContexts = () => {
  return useQuery({
    queryKey: ['contexts'],
    queryFn: getContexts,
  });
};
