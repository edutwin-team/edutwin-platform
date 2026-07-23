import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuiz } from '../../../api/content/quiz/quiz';
import type { Quiz } from '../../../types';

export const useCreateQuiz = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Quiz) => createQuiz(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['quizzes'],
      });

      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      });

      options?.onSuccess?.();
    },
  });
};
