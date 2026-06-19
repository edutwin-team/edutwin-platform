import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTwin } from '../../api/twins/twin';
import type { DigitalTwin } from '../../types/types';

export const useUpdateTwin = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DigitalTwin> }) => updateTwin(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['twins'] });

      options?.onSuccess?.();
    },
  });
};
