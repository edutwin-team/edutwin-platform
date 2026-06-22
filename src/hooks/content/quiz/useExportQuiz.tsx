import { useMutation } from '@tanstack/react-query';
import { exportQuiz } from '../../../api/content/quiz/quiz';

export const useExportQuiz = () => {
  return useMutation({
    mutationFn: exportQuiz,
  });
};
