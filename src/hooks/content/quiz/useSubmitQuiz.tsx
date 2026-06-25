import { useMutation } from '@tanstack/react-query';
import { submitQuiz } from '../../../api/content/quiz/quiz';

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: ({
      quizId,
      answers,
    }: {
      quizId: number;
      answers: {
        question_id: number;
        answer_id: number;
      }[];
    }) => submitQuiz(quizId, { answers }),
  });
};
