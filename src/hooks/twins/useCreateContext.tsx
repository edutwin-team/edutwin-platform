import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContext } from '../../api/twins/context';

export const useCreateContext = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContext,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contexts'],
      });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
