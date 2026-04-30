import { useQuery } from '@tanstack/react-query';
import { getMe } from '../../api/user/auth';

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await getMe();
      return res.data;
    },
    retry: false,
  });
};
