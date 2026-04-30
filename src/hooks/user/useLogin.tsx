import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/user/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
