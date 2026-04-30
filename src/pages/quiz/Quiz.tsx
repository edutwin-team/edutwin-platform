// Quiz.tsx
import { Outlet } from 'react-router-dom';
import { QuizList } from '../../components/content/quiz/QuizList';

export default function Quiz() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quizzes</h1>
      <QuizList />
      <Outlet />
    </div>
  );
}
