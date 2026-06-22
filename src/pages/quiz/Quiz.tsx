// Quiz.tsx
import { Outlet } from 'react-router-dom';
import { QuizList } from '../../components/content/quiz/QuizList';
import { useImportQuiz } from '../../hooks/content/quiz/useImportQuiz';

export default function Quiz() {
  const importMutation = useImportQuiz();
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    importMutation.mutate(file);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quizzes</h1>
      <label className="btn btn-secondary">
        Import CSV
        <input type="file" accept=".csv" hidden onChange={handleImport} />
      </label>
      <QuizList />
      <Outlet />
    </div>
  );
}
