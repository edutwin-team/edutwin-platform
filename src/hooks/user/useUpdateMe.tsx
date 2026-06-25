import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMe } from '../../api/user/auth';

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};
