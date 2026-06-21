import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuiz } from '../../../api/content/quiz/quiz';
import type { Quiz } from '../../../types/types';

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Quiz) => createQuiz(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['quizzes'],
      });
    },
  });
};
