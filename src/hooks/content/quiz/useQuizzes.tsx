import { useQuery } from '@tanstack/react-query';
import { getQuizzes } from '../../../api/content/quiz/quiz';

export const useQuizzes = () => {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: getQuizzes,
  });
};
