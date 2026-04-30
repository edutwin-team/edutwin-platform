import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Quiz, type Question, type Answer } from '../../../types/types';
import { quizService } from '../../../api/quizService';

export default function QuizDetail() {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await quizService.getById(Number(id));
        setQuiz(data);
      } catch {
        setError('Impossible de charger le quiz');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <span className="loading loading-spinner loading-lg" />;
  if (error) return <span className="text-error">{error}</span>;
  if (!quiz) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <span className={`badge ${quiz.is_published ? 'badge-success' : 'badge-ghost'}`}>
          {quiz.is_published ? 'Publié' : 'Brouillon'}
        </span>
      </div>

      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-title">Score minimum</div>
          <div className="stat-value text-primary">{quiz.passing_score}%</div>
        </div>
        <div className="stat">
          <div className="stat-title">Durée</div>
          <div className="stat-value">{quiz.time_limit_minutes} min</div>
        </div>
        <div className="stat">
          <div className="stat-title">Questions</div>
          <div className="stat-value">{quiz.questions?.length ?? 0}</div>
        </div>
      </div>

      <div className="space-y-4">
        {quiz.questions?.map((question: Question, index: number) => (
          <div
            key={question.id}
            className="collapse collapse-arrow bg-base-100 border border-base-300"
          >
            <input type="radio" name="questions" />
            <div className="collapse-title font-medium">
              {index + 1}. {question.title}
            </div>
            <div className="collapse-content">
              <ul className="space-y-2 pt-2">
                {question.answers?.map((answer: Answer) => (
                  <li
                    key={answer.id}
                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${
                      answer.is_correct ? 'bg-success/10 text-success font-medium' : 'bg-base-200'
                    }`}
                  >
                    {answer.is_correct ? '✓' : '○'} {answer.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
