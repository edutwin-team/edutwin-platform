import { useState } from 'react';
import { Play } from 'lucide-react';
import {
  UsageLimitAlert,
  UsageLimitBadge,
  UsageLimitHint,
} from '../../components/limits/UsageLimit';
import { useSimulationUsageLimit } from '../../hooks/limits/useSimulationUsageLimit';
import { useAuth } from '../../context/useAuth';

export default function Question() {
  const { user } = useAuth();
  const { usage, registerSimulation, canStartSimulation } = useSimulationUsageLimit();
  const [isRunning, setIsRunning] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleStartSimulation = () => {
    setFeedback(null);

    if (!user) {
      setFeedback('Connectez-vous pour lancer une simulation.');
      return;
    }

    const started = registerSimulation();
    if (!started) return;

    setIsRunning(true);
    setFeedback('Simulation démarrée. Votre quota a été mis à jour.');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 md:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Simulation
          </p>
          <h1 className="text-3xl font-bold">Session pédagogique</h1>
          <p className="mt-2 text-sm text-base-content/70">
            Lancez une simulation pour tester le comportement de vos jumeaux numériques.
          </p>
        </div>
        <UsageLimitBadge usage={usage} />
      </div>

      <UsageLimitHint usage={usage} />
      <UsageLimitAlert usage={usage} />

      <div className="card border border-base-300 bg-base-100 p-5 shadow-sm">
        <p className="font-semibold">Exemple : Qu’est-ce qu’un jumeau numérique ?</p>
        <p className="mt-2 text-sm text-base-content/70">
          Cette session utilisera vos paramètres pédagogiques et le profil des jumeaux sélectionnés.
        </p>

        {isRunning ? (
          <div className="mt-4 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
            Simulation en cours...
          </div>
        ) : null}

        {feedback ? (
          <div className="mt-4 rounded-xl border border-base-300 bg-base-200/40 px-4 py-3 text-sm">
            {feedback}
          </div>
        ) : null}

        <button
          type="button"
          className="btn btn-primary mt-5 gap-2"
          onClick={handleStartSimulation}
          disabled={!canStartSimulation}
        >
          <Play className="h-4 w-4" />
          Lancer une simulation
        </button>
      </div>
    </div>
  );
}
