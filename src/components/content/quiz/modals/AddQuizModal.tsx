import { useState } from 'react';
import { ImportQuizForm } from './ImportQuizForm';
import { ManualQuizForm } from './ManualQuizForm';
import { AddQuizChoice } from './AddQuizChoice';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddQuizModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<'choice' | 'import' | 'manual'>('choice');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          setStep('choice');
          onClose();
        }}
      />

      {/* modal */}
      <div className="relative w-full max-w-2xl bg-base-100 rounded-2xl shadow-xl p-6">
        {step === 'choice' && (
          <AddQuizChoice
            onImport={() => setStep('import')}
            onManual={() => setStep('manual')}
            onClose={() => {
              setStep('choice');
              onClose();
            }}
          />
        )}

        {step === 'import' && (
          <ImportQuizForm
            onBack={() => setStep('choice')}
            onSuccess={() => {
              setStep('choice');
              onClose();
            }}
          />
        )}

        {step === 'manual' && <ManualQuizForm onBack={() => setStep('choice')} />}
      </div>
    </div>
  );
}
