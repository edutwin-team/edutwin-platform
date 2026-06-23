import { useState } from 'react';
import { useImportQuiz } from '../../../../hooks/content/quiz/useImportQuiz';

type Props = {
  onBack: () => void;
  onSuccess: () => void;
};

export function ImportQuizForm({ onBack, onSuccess }: Props) {
  const importMutation = useImportQuiz();

  const [toast, setToast] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  //todo : we can add a toaster basic component after mvp
  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });

    setTimeout(() => {
      setToast({ type: null, message: '' });
    }, 5000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    importMutation.mutate(file, {
      onSuccess: () => {
        showToast('success', 'Quiz importé avec succès');

        setTimeout(() => {
          onSuccess(); // close modal
        }, 500);
      },
      onError: () => {
        showToast('error', 'Format de quiz invalide');
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 relative">
      {/* toast */}
      {toast.type && (
        <div className="toast toast-top toast-center z-50">
          <div className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between">
        <h2 className="font-bold">Importer un quiz</h2>

        <button onClick={onBack} className="btn btn-sm btn-ghost">
          ← Retour
        </button>
      </div>

      {/* file */}
      <input
        type="file"
        accept=".csv"
        onChange={handleImport}
        className="file-input file-input-bordered w-full"
      />

      {/* DOWNLOADS */}
      <div className="flex flex-col gap-2 text-sm">
        <button
          onClick={() => {
            const modelLink = document.createElement('a');
            modelLink.href = '/templates/modele_import_quiz.csv';
            modelLink.download = 'modele_import_quiz.csv';
            modelLink.click();
          }}
          className="btn btn-sm btn-outline justify-start"
        >
          📄 Télécharger le modèle CSV
        </button>

        <button
          onClick={() => {
            const guideLink = document.createElement('a');
            guideLink.href = '/docs/guide_client.pdf';
            guideLink.download = 'guide_import_quiz.pdf';
            guideLink.click();
          }}
          className="btn btn-sm btn-secondary justify-start"
        >
          📘 Télécharger le guide PDF
        </button>
      </div>
    </div>
  );
}
