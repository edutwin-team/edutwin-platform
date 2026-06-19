import { useQuery } from '@tanstack/react-query';
import { getTwin } from '../../api/twins/twin';

export const useTwin = (id: number) => {
  return useQuery({
    queryKey: ['twin', id],
    queryFn: () => getTwin(id),
    enabled: !!id,
  });
};
