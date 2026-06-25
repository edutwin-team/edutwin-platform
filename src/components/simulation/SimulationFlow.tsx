import { useState } from 'react';
import type { QuizSimulationResult } from '../../types/types';
import { useSimulateQuiz } from '../../hooks/simulation/useSimulateQuiz';
import { TwinSelectModal } from './modals/TwinSelectModal';
import { QuizSelectModal } from './modals/QuizSelectModal';
import { SimulationModal } from './modals/SimulationModal';
import { useQueryClient } from '@tanstack/react-query';

type Step = 'twin' | 'quiz' | 'loading' | 'result';

interface Props {
  onClose: () => void;
}

export function SimulationFlow({ onClose }: Props) {
  const [step, setStep] = useState<Step>('twin');

  const [twinId, setTwinId] = useState<number | null>(null);

  const [result, setResult] = useState<QuizSimulationResult | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const simulateMutation = useSimulateQuiz();

  const startSimulation = async (twinId: number, quizId: number) => {
    setError(null);
    setStep('loading');
    setLoading(true);

    try {
      const MIN_LOADING_TIME = 3000;
      const start = Date.now();

      const res = await simulateMutation.mutateAsync({
        twin_id: twinId,
        quiz_id: quizId,
      });

      const elapsed = Date.now() - start;
      const remaining = MIN_LOADING_TIME - elapsed;

      setTimeout(
        () => {
          setResult(res);
          setLoading(false);
          setStep('result');
          queryClient.invalidateQueries({ queryKey: ['simulations'] });
        },
        Math.max(0, remaining)
      );
    } catch (err) {
      console.error(err);

      setLoading(false);

      setStep('loading');
      setError('Vous avez atteint votre limite d’essais de simulation.');
    }
  };

  return (
    <>
      {/* STEP 1 twin select */}
      {step === 'twin' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-base-100 p-6 rounded-xl w-[750px]">
            <TwinSelectModal
              onSelect={(id) => {
                setTwinId(id);
                setStep('quiz');
              }}
              onClose={onClose}
            />
          </div>
        </div>
      )}

      {/* STEP 2 quiz select */}
      {step === 'quiz' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-base-100 p-6 rounded-xl w-[800px]">
            <QuizSelectModal
              onSelect={(quizId) => {
                if (twinId) {
                  startSimulation(twinId, quizId);
                }
              }}
              onBack={() => setStep('twin')}
              onClose={onClose}
            />
          </div>
        </div>
      )}

      {/* STEP 3  simulation loding and result */}
      {(step === 'loading' || step === 'result') && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-base-100 p-6 rounded-xl w-[700px]">
            <SimulationModal loading={loading} result={result} error={error} onClose={onClose} />
          </div>
        </div>
      )}
    </>
  );
}
