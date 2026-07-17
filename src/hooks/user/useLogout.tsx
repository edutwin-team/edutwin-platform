import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/user/auth';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // clear user cache
      queryClient.setQueryData(['me'], null);

      //  remove all cached queries
      queryClient.removeQueries();
      navigate('/');
    },
  });
};
