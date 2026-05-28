import { GraduationCap, Globe, BookOpen, Target, FileText, Tag } from 'lucide-react';
import { ObjectiveInput } from './ObjectiveInput';
import { useState } from 'react';
import type { Objective } from '../../types/types';

export const ContextForm = () => {
  const [objectives, setObjectives] = useState<Objective[]>([]);

  return (
    <form className="card bg-base-100 border border-base-200 shadow-sm p-6 space-y-5 rounded-2xl">
      {/* Title */}
      <div className="flex items-center gap-2">
        <Target className="text-primary" size={20} />
        <h2 className="text-xl font-bold text-base-content">Nouveau contexte d’apprentissage</h2>
      </div>

      {/* Name */}
      <div className="space-y-1">
        <label className="text-sm text-base-content/70 flex items-center gap-2">
          <Tag size={16} className="text-primary" />
          Nom du contexte
        </label>
        <input
          required
          className="input input-bordered w-full bg-base-200 focus:bg-base-100"
          placeholder="Ex: Algèbre linéaire - Niveau débutant"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-sm text-base-content/70 flex items-center gap-2">
          <FileText size={16} className="text-base-content/60" />
          Description
        </label>
        <textarea
          className="textarea textarea-bordered w-full bg-base-200 focus:bg-base-100"
          placeholder="Décris ton contexte d'apprentissage..."
        />
      </div>

      {/* Grid fields */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-base-content/60 flex items-center gap-1">
            <GraduationCap size={14} className="text-primary" />
            École
          </label>
          <input
            required
            className="input input-bordered bg-base-200 w-full"
            placeholder="Ex: École Hexagone"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-base-content/60 flex items-center gap-1">
            <Globe size={14} className="text-secondary" />
            Pays
          </label>
          <input
            required
            className="input input-bordered bg-base-200 w-full"
            placeholder="Ex: France"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-base-content/60 flex items-center gap-1">
            <BookOpen size={14} className="text-accent" />
            Niveau
          </label>
          <input
            required
            className="input input-bordered bg-base-200 w-full"
            placeholder="Ex: Bac +3"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-base-content/60 flex items-center gap-1">
            <Tag size={14} className="text-info" />
            Matière
          </label>
          <input
            required
            className="input input-bordered bg-base-200 w-full"
            placeholder="Ex: Informatique"
          />
        </div>
      </div>

      {/* Objectives */}
      <div className="space-y-2">
        <h3 className="font-semibold text-base-content flex items-center gap-2">
          <Target size={18} className="text-success" />
          Objectifs
        </h3>

        <ObjectiveInput objectives={objectives} setObjectives={setObjectives} />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <button className="btn btn-ghost">Annuler</button>
        <button type="submit" className="btn btn-primary text-white">
          Créer le contexte
        </button>
      </div>
    </form>
  );
};
