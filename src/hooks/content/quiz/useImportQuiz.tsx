import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importQuiz } from '../../../api/content/quiz/quiz';

export const useImportQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
