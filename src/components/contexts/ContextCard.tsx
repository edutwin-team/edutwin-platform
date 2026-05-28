import { GraduationCap, Globe, BookOpen, Target, Brain, Trash2 } from 'lucide-react';

export const ContextCard = ({ context }) => {
  return (
    <div className="relative rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition p-5">
      {/* Delete button */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
        <Trash2 className="cursor-pointer" size={18} />
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 pr-6">{context.name}</h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1">{context.description}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="flex items-center gap-1 px-3 py-1 text-xs rounded-full font-bold bg-blue-50 text-blue-600 border border-blue-100">
          <GraduationCap size={14} />
          {context.school}
        </span>

        <span className="flex items-center gap-1 px-3 py-1 text-xs rounded-full font-bold bg-purple-50 text-purple-600 border border-purple-100">
          <Globe size={14} />
          {context.country}
        </span>

        <span className="flex items-center gap-1 px-3 py-1 text-xs rounded font-bold rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
          <BookOpen size={14} />
          {context.level}
        </span>

        <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-cyan-50 text-cyan-600 border border-cyan-100">
          📘 {context.subject}
        </span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5">
        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Brain color="blue" size={14} />
            {context.students} étudiants
          </span>

          <span className="flex items-center gap-1">
            <Target color="indigo" size={14} />
            {context.objectives} objectifs
          </span>
        </div>

        {/* Button */}
        <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition">
          <Target size={16} />
          Appliquer
        </button>
      </div>
    </div>
  );
};
