import { useEffect, useState } from 'react';
import { type Quiz } from '../../../types/types';

export function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/content/quizzes/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setQuizzes(data);
      } catch {
        setError('Impossible de charger les quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <span className="loading loading-spinner loading-lg" />;
  if (error) return <p className="text-error">{error}</p>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body">
            <h2 className="card-title">{quiz.title}</h2>
            <div className="flex gap-2 text-sm text-base-content/70">
              <span>Score min: {quiz.passing_score}%</span>
              <span>·</span>
              <span>{quiz.time_limit_minutes} min</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`badge badge-sm ${quiz.is_published ? 'badge-success' : 'badge-ghost'}`}
              >
                {quiz.is_published ? 'Publié' : 'Brouillon'}
              </span>
              <span className="badge badge-sm badge-outline">
                {quiz.questions?.length ?? 0} questions
              </span>
            </div>
            <div className="card-actions justify-end mt-2">
              <button className="btn btn-sm btn-outline">Voir</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
