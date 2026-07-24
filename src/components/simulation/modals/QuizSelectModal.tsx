import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuizzes } from '../../../hooks/content/quiz/useQuizzes';

import { SimpleLoader } from '../../ui/loaders/SimpleLoader';
import { PlayCircle, PlusCircle } from 'lucide-react';
import QuizAvatar from '../../ui/avatars/QuizAvatar';
import type { Quiz } from '../../../types';
type Props = {
  onSelect: (id: number) => void;
  onBack: () => void;
  onClose: () => void;
};

export function QuizSelectModal({ onSelect, onBack, onClose }: Props) {
  const { data, isLoading } = useQuizzes();

  const [selected, setSelected] = useState<number | null>(null);
  const hasQuizzes = (data?.length ?? 0) > 0;

  return (
    <div className="flex flex-col gap-6 w-[750px]">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Choisir un Quiz</h2>

        <div className="flex gap-2">
          <button onClick={onBack} className="btn btn-sm btn-ghost">
            ← Retour
          </button>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            ✕
          </button>
        </div>
      </div>

      {isLoading && <SimpleLoader />}

      {!isLoading && !hasQuizzes && (
        <div className="rounded-xl border border-base-300 bg-base-200/40 p-8 text-center space-y-4">
          <h3 className="text-lg font-semibold">Aucun quiz disponible</h3>
          <p className="text-sm text-base-content/70">
            Vous devez créer un quiz avant de lancer une simulation.
          </p>
          <Link to="/quizzes" onClick={onClose} className="btn btn-primary gap-2">
            <PlusCircle size={18} />
            Créer un quiz
          </Link>
        </div>
      )}

      {!isLoading && hasQuizzes && (
        <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-2">
          {data?.map((quiz: Quiz) => {
            const isSelected = selected === quiz.id;

            return (
              <button
                key={quiz.id}
                onClick={() => {
                  if (quiz && quiz.id !== undefined) setSelected(quiz.id);
                }}
                className={`
                p-5 border rounded-xl text-left transition-all duration-150 cursor-pointer

            ${!isSelected && 'hover:bg-base-200 hover:border-base-content/20'}      

                ${isSelected ? 'border-primary bg-primary/10 shadow-sm' : 'border-base-300'}
              `}
              >
                <div className="flex items-center gap-3">
                  <QuizAvatar seed={`quiz-${quiz.id}`} size={48} />

                  <div className="text-lg font-semibold">{quiz.title}</div>
                </div>
                <div className="text-sm text-base-content/60">{quiz.description}</div>
              </button>
            );
          })}
        </div>
      )}

      {hasQuizzes && (
        <button
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
          className="btn btn-primary w-full"
        >
          <PlayCircle size={18} />
          Lancer la simulation
        </button>
      )}
    </div>
  );
}
