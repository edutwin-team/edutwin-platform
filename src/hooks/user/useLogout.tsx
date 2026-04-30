import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../api/user/auth';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // clear user cache
      queryClient.setQueryData(['me'], null);

      //  remove all cached queries
      queryClient.removeQueries();
      window.location.href = '/';
    },
  });
};
