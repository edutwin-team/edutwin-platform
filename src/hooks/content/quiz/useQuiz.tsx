import { useQuery } from '@tanstack/react-query';
import { getQuiz } from '../../../api/content/quiz/quiz';

export const useQuiz = (id: number) => {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuiz(id),
    enabled: !!id,
  });
};
