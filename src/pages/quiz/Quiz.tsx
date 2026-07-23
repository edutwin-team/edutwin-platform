import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { QuizList } from '../../components/content/quiz/QuizList';
import { AddQuizModal } from '../../components/content/quiz/modals/AddQuizModal';
import { ManualQuizForm } from '../../components/content/quiz/modals/ManualQuizForm';

import type { Quiz } from '../../types';

export default function Quiz() {
  const [openAddModal, setOpenAddModal] = useState(false);

  const [openManual, setOpenManual] = useState(false);

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleCreate = () => {
    setOpenAddModal(true);
  };

  const handleEdit = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setOpenManual(true);
  };

  const closeManual = () => {
    setOpenManual(false);
    setSelectedQuiz(null);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quiz</h1>
          <p className="text-gray-500">Gérez vos quiz et suivez les résultats.</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          Ajouter un quiz
        </button>
      </div>

      <QuizList onEdit={handleEdit} />

      <Outlet />

      {/* create quiz */}
      <AddQuizModal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} />

      {/* edit quiz */}
      <ManualQuizForm
        key={selectedQuiz?.id ?? 'create'}
        open={openManual}
        quiz={selectedQuiz}
        onClose={closeManual}
      />
    </div>
  );
}
