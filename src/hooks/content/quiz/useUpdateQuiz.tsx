import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateQuiz } from '../../../api/content/quiz/quiz';
import type { Quiz } from '../../../types/types';

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Quiz }) => updateQuiz(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });

      queryClient.invalidateQueries({
        queryKey: ['quiz', variables.id],
      });
    },
  });
};
