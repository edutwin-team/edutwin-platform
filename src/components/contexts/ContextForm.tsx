import { useState } from 'react';
import { GraduationCap, Globe, BookOpen, Target, FileText, Tag } from 'lucide-react';

import { ObjectiveInput } from './ObjectiveInput';
import { GenericModal } from '../ui/modals/GenericModal';

import { useCreateContext } from '../../hooks/twins/useCreateContext';
import { useUpdateContext } from '../../hooks/twins/useUpdateContext';

import type { Context, Objective } from '../../types/types';

type ContextFormProps = {
  context?: Context | null;
  onCancelEdit?: () => void;
};

export const ContextForm = ({ context, onCancelEdit }: ContextFormProps) => {
  const getInitialForm = (context?: Context | null) => ({
    name: context?.name ?? '',
    description: context?.description ?? '',
    school: context?.school ?? '',
    country: context?.country ?? '',
    level: context?.level ?? '',
    subject: context?.subject ?? '',
    academic_year: context?.academic_year ?? '',
  });

  console.log('🚀 ~ file: ContextForm.tsx:34 ~ ContextForm ~ context:', context);

  const [formData, setFormData] = useState(() => getInitialForm(context));
  const [objectives, setObjectives] = useState<Objective[]>(context?.objectives ?? []);

  const [openConfirm, setOpenConfirm] = useState(false);

  const { mutate: createContext, isPending: isCreating } = useCreateContext();

  const { mutate: updateContext, isPending: isUpdating } = useUpdateContext();

  const isPending = isCreating || isUpdating;

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      school: '',
      country: '',
      level: '',
      subject: '',
      academic_year: '',
    });

    setObjectives([]);
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    const payload = {
      ...formData,
      objectives: objectives.map((obj) => ({
        label: obj.label,
      })),
    };

    if (context) {
      updateContext(
        {
          id: context.id,
          data: payload,
        },
        {
          onSuccess: () => {
            setOpenConfirm(false);
            handleCancel();
          },
        }
      );
    } else {
      createContext(payload, {
        onSuccess: () => {
          setOpenConfirm(false);
          resetForm();
        },
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 border border-base-200 shadow-sm p-6 space-y-5 rounded-2xl"
      >
        {/* Title */}
        <div className="flex items-center gap-2">
          <Target className="text-primary" size={20} />

          <h2 className="text-xl font-bold text-base-content">
            {context ? 'Modifier le contexte' : 'Nouveau contexte d’apprentissage'}
          </h2>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm text-base-content/70 flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            Nom du contexte
          </label>

          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full bg-base-200 focus:bg-base-100"
            placeholder="Décris ton contexte d'apprentissage..."
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-base-content/60 flex items-center gap-1">
              <GraduationCap size={14} className="text-primary" />
              École
            </label>

            <input
              required
              name="school"
              value={formData.school}
              onChange={handleChange}
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
              name="country"
              value={formData.country}
              onChange={handleChange}
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
              name="level"
              value={formData.level}
              onChange={handleChange}
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
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="input input-bordered bg-base-200 w-full"
              placeholder="Ex: Informatique"
            />
          </div>

          <div className="space-y-1 col-span-2">
            <label className="text-xs text-base-content/60">📅 Année académique</label>

            <input
              required
              name="academic_year"
              value={formData.academic_year}
              onChange={handleChange}
              className="input input-bordered bg-base-200 w-full"
              placeholder="Ex: 2025-2026"
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
          <button type="button" className="btn btn-ghost" onClick={handleCancel}>
            {context ? 'Annuler la modification' : 'Réinitialiser'}
          </button>

          <button type="submit" disabled={isPending} className="btn btn-primary text-white">
            {isPending
              ? context
                ? 'Modification...'
                : 'Création...'
              : context
                ? 'Modifier le contexte'
                : 'Créer le contexte'}
          </button>
        </div>
      </form>

      <GenericModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title={context ? 'Modifier le contexte' : 'Créer le contexte'}
        confirmText={context ? 'Modifier' : 'Créer'}
        confirmColor="primary"
        loading={isPending}
        onConfirm={handleConfirm}
      >
        <div className="space-y-3">
          <p className="text-base-content/80">
            {context
              ? 'Voulez-vous enregistrer les modifications ?'
              : 'Voulez-vous créer ce contexte pédagogique ?'}
          </p>

          <div className="bg-base-200 rounded-xl p-4 border border-base-300">
            <h4 className="font-semibold">{formData.name}</h4>

            <p className="text-sm text-base-content/60">
              {formData.subject} • {formData.level}
            </p>

            <p className="text-sm text-base-content/60">{objectives.length} objectif(s)</p>
          </div>
        </div>
      </GenericModal>
    </>
  );
};
