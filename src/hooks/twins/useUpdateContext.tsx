import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateContext } from '../../api/twins/context';
import type { Context } from '../../types/types';

export const useUpdateContext = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Context> }) => updateContext(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contexts'],
      });
    },
  });
};
