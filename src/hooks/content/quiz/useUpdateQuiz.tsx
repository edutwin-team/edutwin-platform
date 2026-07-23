import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateQuiz } from '../../../api/content/quiz/quiz';
import type { Quiz } from '../../../types';

export const useUpdateQuiz = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Quiz }) => updateQuiz(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['quizzes'],
      });

      queryClient.invalidateQueries({
        queryKey: ['quiz', variables.id],
      });

      options?.onSuccess?.();
    },
  });
};
