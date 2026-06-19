import { useQuery } from '@tanstack/react-query';
import { getTwins } from '../../api/twins/twin';

export const useTwins = () => {
  return useQuery({
    queryKey: ['twins'],
    queryFn: getTwins,
  });
};
