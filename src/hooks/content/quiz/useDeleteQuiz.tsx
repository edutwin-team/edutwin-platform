import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuiz } from '../../../api/content/quiz/quiz';

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteQuiz(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['quizzes'],
      });
    },
  });
};
