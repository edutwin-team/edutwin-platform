import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTwin } from '../../api/twins/twin';
import type { DigitalTwin } from '../../types/types';

export const useCreateTwin = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<DigitalTwin>) => createTwin(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['twins'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });

      options?.onSuccess?.();
    },
  });
};
