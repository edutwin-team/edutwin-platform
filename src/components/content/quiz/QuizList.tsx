import { useState } from 'react';
import { Trash2, Download } from 'lucide-react';

import { useQuizzes } from '../../../hooks/content/quiz/useQuizzes';
import { useDeleteQuiz } from '../../../hooks/content/quiz/useDeleteQuiz';
import { useExportQuiz } from '../../../hooks/content/quiz/useExportQuiz';

import { GenericModal } from '../../ui/modals/GenericModal';
import QuizDetail from './QuizDetail';

import { QuizBadge } from '../../ui/badges/QuizBadge';
import { quizSourceLabel } from '../../../utils/quiz/quizSourceLabel';

import { type Quiz } from '../../../types/types';
import { useRef } from 'react';
import { SimpleLoader } from '../../ui/loaders/SimpleLoader';

export function QuizList() {
  const { data: quizzes, isLoading, isError } = useQuizzes();

  const { mutate: deleteQuiz, isPending } = useDeleteQuiz();
  const exportMutation = useExportQuiz();

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const handleDelete = () => {
    if (!quizToDelete?.id) return;

    deleteQuiz(quizToDelete.id, {
      onSuccess: () => {
        setQuizToDelete(null);
        setSelectedQuiz(null);
      },
    });
  };

  const handleExport = async (quiz: Quiz) => {
    if (!quiz.id) return;

    const blob = await exportMutation.mutateAsync(quiz.id);

    const url = window.URL.createObjectURL(blob);
    const exportLink = document.createElement('a');

    exportLink.href = url;
    exportLink.download = `${quiz.title}.csv`;
    exportLink.click();

    window.URL.revokeObjectURL(url);

    setSelectedQuiz(null);
  };

  //todo : better to add a deticated page for quiz detail later
  const handleViewQuiz = (quiz: Quiz) => {
    setSelectedQuiz(selectedQuiz?.id === quiz.id ? null : quiz);

    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (isLoading) {
    return <SimpleLoader />;
  }

  if (isError) {
    return <span className="text-error">Erreur de chargement</span>;
  }

  if (!quizzes?.length) {
    return <p className="text-center text-base-content/60">Aucun quiz</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz: Quiz) => (
          <div
            key={quiz.id}
            className="card bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition"
          >
            {/* quiz info */}
            <div className="card-body">
              <div className="flex justify-between items-start gap-2">
                <h2 className="card-title text-lg">{quiz.title}</h2>

                <QuizBadge label={quizSourceLabel(quiz.source_type)} variant="outline" />
              </div>

              {quiz.description && (
                <p className="text-sm text-base-content/70 line-clamp-2">{quiz.description}</p>
              )}

              {/* badges */}
              <div className="flex flex-wrap gap-2 items-center mt-3">
                <QuizBadge label={`${quiz.passing_score}% min`} variant="primary" />

                <QuizBadge label={`${quiz.time_limit_minutes} min`} variant="secondary" />

                <QuizBadge label={`${quiz.questions?.length ?? 0} questions`} variant="outline" />
              </div>

              {/* btns actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    handleViewQuiz(quiz);
                  }}
                  className="btn btn-sm btn-outline"
                >
                  {selectedQuiz?.id === quiz.id ? 'Masquer' : 'Voir'}
                </button>

                <button onClick={() => handleExport(quiz)} className="btn btn-sm btn-ghost">
                  <Download size={16} />
                </button>

                <button
                  onClick={() => setQuizToDelete(quiz)}
                  className="btn btn-sm btn-ghost text-error"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* quiz detail */}
      {selectedQuiz && (
        <div ref={detailRef} className="mt-8">
          <QuizDetail quiz={selectedQuiz} />
        </div>
      )}

      {/* delete quiz modal */}
      <GenericModal
        isOpen={quizToDelete !== null}
        onClose={() => setQuizToDelete(null)}
        title="Supprimer le quiz"
        confirmText="Supprimer"
        confirmColor="error"
        loading={isPending}
        onConfirm={handleDelete}
      >
        <p>Confirmer la suppression du quiz {quizToDelete?.title} ?</p>
      </GenericModal>
    </>
  );
}
