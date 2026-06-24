import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContext } from '../../api/twins/context';

export const useDeleteContext = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContext,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contexts'],
      });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
