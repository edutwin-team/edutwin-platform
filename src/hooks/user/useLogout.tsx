import { useMutation } from '@tanstack/react-query';
import { logout } from '../../api/user/auth';

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
