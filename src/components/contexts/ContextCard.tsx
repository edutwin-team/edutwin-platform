import { GraduationCap, Globe, BookOpen, Target, Brain, Trash2, Edit2 } from 'lucide-react';
import type { Context } from '../../types/types';
import { useDeleteContext } from '../../hooks/twins/useDeleteContext';
import { useState } from 'react';
import { GenericModal } from '../ui/modals/GenericModal';

type ContextProps = {
  context: Context;
  onEdit: (context: Context) => void;
};

export const ContextCard = ({ context, onEdit }: ContextProps) => {
  const { mutate: deleteContext, isPending } = useDeleteContext();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    deleteContext(context.id, {
      onSuccess: () => {
        setOpenDelete(false);
      },
    });
  };
  return (
    <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-base-200 shadow-sm hover:shadow-md transition p-5">
      {/* action buttons */}
      <button
        onClick={() => setOpenDelete(true)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
      >
        <Trash2 className="cursor-pointer" size={18} />
      </button>

      <button
        onClick={() => onEdit(context)}
        className="absolute top-4 right-12 text-gray-400 hover:text-blue-500 transition"
      >
        <Edit2 className="cursor-pointer" size={18} />
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 pr-6">
        {context.name}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{context.description}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
          <GraduationCap size={14} />
          {context.school}
        </span>

        <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
          <Globe size={14} />
          {context.country}
        </span>

        <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
          <BookOpen size={14} />
          {context.level}
        </span>

        <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-800">
          📘 {context.subject}
        </span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5">
        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Brain className="text-blue-500 dark:text-blue-400" size={14} />
            {context.twins} jumeaux
          </span>

          <span className="flex items-center gap-1">
            <Target className="text-indigo-500 dark:text-indigo-400" size={14} />
            {context.objectives.length} objectifs
          </span>
        </div>

        <button className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition">
          <Target size={16} />
          Appliquer
        </button>
      </div>
      <GenericModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        title="Supprimer le contexte"
        confirmText="Supprimer"
        confirmColor="error"
        loading={isPending}
        onConfirm={handleDelete}
      >
        <p>
          Voulez-vous vraiment supprimer
          <span className="font-semibold"> {context.name}</span>?
        </p>
      </GenericModal>
    </div>
  );
};
