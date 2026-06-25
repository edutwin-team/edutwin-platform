import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTwin } from '../../api/twins/twin';

export const useDeleteTwin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTwin(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['twins'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
