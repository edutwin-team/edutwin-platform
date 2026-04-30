import { useEffect, useState } from 'react';
import { type Quiz } from '../../../types/types';
import { quizService } from '../../../api/quizService';
import { Link } from 'react-router-dom';

export function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await quizService.getAll();
        setQuizzes(data);
      } catch {
        setError('Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) return <span className="loading loading-spinner loading-lg" />;
  if (error) return <span className="text-error">{error}</span>;

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
            <Link to={`/quiz/${quiz.id}`} className="btn btn-sm btn-outline">
              Voir
            </Link>
            <Link to="/quiz" className="group btn btn-sm btn-ghost bg-orange-600">
              ← Retour
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
