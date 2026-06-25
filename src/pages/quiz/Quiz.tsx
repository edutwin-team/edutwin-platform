import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { QuizList } from '../../components/content/quiz/QuizList';
import { AddQuizModal } from '../../components/content/quiz/modals/AddQuizModal';

export default function Quiz() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quiz</h1>
          <p className="text-gray-500">Gérez vos quiz et suivez les résultats.</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="btn btn-primary mb-4">
          Ajouter un quiz
        </button>
      </div>

      <QuizList />

      <Outlet />

      <AddQuizModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
