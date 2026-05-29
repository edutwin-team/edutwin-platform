import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateContext } from '../../api/twins/context';

type updateObjectivePayload = {
  label: string;
};

export type updateContextPayload = {
  name: string;
  description: string;
  school: string;
  country: string;
  level: string;
  subject: string;
  academic_year: string;
  objectives: updateObjectivePayload[];
};

export const useUpdateContext = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: updateContextPayload }) =>
      updateContext(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contexts'],
      });
    },
  });
};
