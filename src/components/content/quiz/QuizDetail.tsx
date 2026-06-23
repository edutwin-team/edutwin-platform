import { type Quiz } from '../../../types/types';
import { quizSourceLabel } from '../../../utils/quiz/quizSourceLabel';
import { QuestionTypeBadge } from '../../ui/badges/QuestionTypeBadge';
import { QuizBadge } from '../../ui/badges/QuizBadge';
import { QuizDifficultyBadge } from '../../ui/badges/QuizDifficultyBadge';

type QuizDetailProps = {
  quiz: Quiz;
};

export default function QuizDetail({ quiz }: QuizDetailProps) {
  if (!quiz) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{quiz.title}</h1>

        <div className="flex gap-2 mt-2">
          <QuizBadge label={quizSourceLabel(quiz.source_type)} variant="outline" />
        </div>
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

      <div className="space-y-3">
        {quiz.questions?.map((question, index) => (
          <div
            key={question.id}
            className="collapse collapse-arrow bg-base-100 border border-base-300"
          >
            <input type="checkbox" />

            <div className="collapse-title font-medium flex items-center justify-between gap-3">
              {/* TEXT */}
              <span className="flex-1">
                {index + 1}. {question.text}
              </span>

              {/* BADGES */}
              <div className="flex items-center gap-2">
                <QuestionTypeBadge type={question.question_type} />
                <QuizDifficultyBadge level={question.difficulty_level} />
              </div>
            </div>

            <div className="collapse-content">
              <ul className="space-y-2 pt-2">
                {question.answers.map((answer) => (
                  <li
                    key={answer.id}
                    className={`px-3 py-2 rounded-lg text-sm flex gap-2 ${
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
