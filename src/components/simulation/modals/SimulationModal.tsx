import { useEffect, useState } from 'react';
import type { QuizSimulationResult } from '../../../types/types';

type Props = {
  loading: boolean;
  result?: QuizSimulationResult;
  onClose: () => void;
  error?: string | null;
};

const steps = [
  'Récupération des données du twin...',
  'Analyse du comportement...',
  'Préparation du quiz...',
  'Simulation du raisonnement...',
  'Génération des réponses...',
  'Calcul du score...',
];

export function SimulationModal({ loading, result, onClose, error }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(
      () => {
        setStep((s) => (s < steps.length - 1 ? s + 1 : s));
      },
      1400 + Math.random() * 600
    );

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="flex flex-col gap-6 w-[650px]">
      {/* header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Simulation</h2>
        {/* todo : use icon instead */}
        <button onClick={onClose} className="btn btn-sm btn-ghost">
          ✕
        </button>
      </div>

      {/* simulation api error */}
      {error && (
        <div className="flex flex-col gap-4 text-center">
          <div className="p-5 rounded-xl bg-error/10 border border-error/20">
            <div className="text-2xl">⚠️</div>

            <div className="text-lg font-bold text-error mt-2">Simulation impossible</div>

            <div className="text-sm text-base-content/70 mt-2">{error}</div>
          </div>

          <button onClick={onClose} className="btn btn-primary w-full">
            Compris
          </button>
        </div>
      )}

      {/* loading */}
      {loading && !error && (
        <div className="flex flex-col gap-5">
          <span className="loading loading-dots loading-lg"></span>

          <div className="text-sm text-base-content/70 transition-all duration-300">
            {steps[step]}
          </div>

          <div className="flex items-center gap-2 text-xs text-base-content/50">
            <span className="loading loading-ring loading-xs"></span>
            Simulation IA en cours...
          </div>

          <progress
            className="progress progress-primary w-full transition-all duration-500"
            value={step + 1}
            max={steps.length}
          />
        </div>
      )}

      {/* result recap */}
      {!loading && !error && result && (
        <div className="flex flex-col gap-5 animate-in fade-in duration-300">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition">
              <div className="text-sm text-base-content/60">Score</div>
              <div className="text-xl font-bold">{result.simulated_score}</div>
            </div>

            <div className="p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition">
              <div className="text-sm text-base-content/60">Temps</div>
              <div className="text-xl font-bold">{result.simulated_time_seconds}s</div>
            </div>

            <div className="p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition">
              <div className="text-sm text-base-content/60">Correct</div>
              <div className="text-xl font-bold">
                {result.correct}/{result.total}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition">
              <div className="text-sm text-base-content/60">Statut</div>
              <div className={`text-xl font-bold ${result.passed ? 'text-success' : 'text-error'}`}>
                {result.passed ? 'Réussi' : 'Échoué'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-base-200/40 text-sm">{result.feedback}</div>

          <button onClick={onClose} className="btn btn-primary w-full">
            Fermer la simulation
          </button>
        </div>
      )}
    </div>
  );
}
