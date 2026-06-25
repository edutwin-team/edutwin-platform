import { type AnswerDetail, type SimulationHistoryItem } from '../../../types/types';
import SimulationAvatar from '../../ui/avatars/SimulationAvatar';

type Props = {
  simulation: SimulationHistoryItem;
};

export default function SimulationDetail({ simulation }: Props) {
  const hasIndexError = (answer: AnswerDetail) => {
    return (
      answer.chosen_text?.toLowerCase().includes('index') &&
      answer.chosen_text?.toLowerCase().includes('invalide')
    );
  };
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* header */}
      <div className="flex items-center gap-4">
        <SimulationAvatar simulationId={simulation.id} />

        <div>
          <h1 className="text-xl font-bold">{simulation.twin_name}</h1>
          <p className="text-sm text-base-content/60">
            {simulation.quiz_title ?? simulation.course_title}
          </p>
        </div>
      </div>

      {/* stats */}
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-title">Score simulé</div>
          <div className="stat-value text-primary">{simulation.simulated_score}%</div>
        </div>

        <div className="stat">
          <div className="stat-title">Type</div>

          <div className="stat-value">
            <span
              className={`badge ${simulation.simulation_type === 'quiz' ? 'badge-primary' : 'badge-secondary'}`}
            >
              {simulation.simulation_type === 'quiz' ? 'Quiz' : 'Cours'}
            </span>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Résultat</div>
          <div className={`stat-value ${simulation.passed ? 'text-success' : 'text-error'}`}>
            {simulation.passed ? 'Réussi' : 'Échoué'}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Réponses</div>
          <div className="stat-value">
            {simulation.correct ?? 0}/{simulation.total ?? 0}
          </div>
        </div>
      </div>

      {/* simulation ai feedback */}
      <div className="bg-base-200 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Feedback IA</h3>
        <p className="text-sm text-base-content/80">{simulation.feedback}</p>
      </div>

      {/* answers */}
      <div className="space-y-3">
        {simulation.answer_details.map((answer, index) => (
          <div key={index} className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="checkbox" />

            <div className="collapse-title flex items-center justify-between gap-3">
              <span className="flex-1 text-sm">
                {index + 1}. {answer.question_title}
              </span>

              <div className={`badge ${answer.is_correct ? 'badge-success' : 'badge-error'}`}>
                {answer.is_correct ? 'Correct' : 'Incorrect'}
              </div>
            </div>

            <div className="collapse-content space-y-2 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-semibold">Choisi :</span>

                {hasIndexError(answer) ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span>⚠️</span>

                    <span className="text-warning font-medium">Réponse invalide détectée</span>

                    <span className="badge badge-warning badge-sm">Quiz incohérent</span>
                  </div>
                ) : (
                  <span className="text-base-content">{answer.chosen_text}</span>
                )}
              </div>
              <p>
                <span className="font-semibold">Bonne réponse :</span> {answer.correct_text}
              </p>

              <p className="text-base-content/70 italic">{answer.reasoning}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
