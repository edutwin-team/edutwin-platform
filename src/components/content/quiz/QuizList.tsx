import { Link } from 'react-router-dom';
import { type Quiz } from '../../../types/types';
import { useQuizzes } from '../../../hooks/content/quiz/useQuizzes';

export function QuizList() {
  const { data: quizzes, isLoading, isError } = useQuizzes();

  if (isLoading) return <span className="loading loading-spinner loading-lg" />;
  if (isError)
    return <span className="text-error">Erreur lors de la récupération des données</span>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quizzes?.map((quiz: Quiz) => (
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
