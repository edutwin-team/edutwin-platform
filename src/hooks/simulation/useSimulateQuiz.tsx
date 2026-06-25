import { useMutation, useQueryClient } from '@tanstack/react-query';
import { simulateQuiz } from '../../api/simulation/simulation';

type SimulatePayload = {
  twin_id: number;
  quiz_id: number;
};

export const useSimulateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SimulatePayload) => simulateQuiz(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
