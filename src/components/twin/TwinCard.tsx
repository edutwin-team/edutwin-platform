import { useState } from 'react';
import type { DigitalTwin } from '../../types/types';
import { HiPlay, HiChevronDown } from 'react-icons/hi';

import PercentRadial from '../ui/stats/PercentRadial';
import StatusTag from '../ui/stats/StatusTag';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { LearningStyleMap, PreferredContentTypeMap } from '../../utils/twins';

import TwinAvatar from './TwinAvatar';
import { useDeleteTwin } from '../../hooks/twins/useDeleteTwin';
import { GenericModal } from '../ui/modals/GenericModal';

interface Props {
  twin: DigitalTwin;
  onEdit: () => void;
}

const TwinCard: React.FC<Props> = ({ twin, onEdit }) => {
  const cognitiveMetrics = [
    { key: 'comprehension_level', label: 'Compréhension' },
    { key: 'learning_speed', label: 'Vitesse' },
    { key: 'memory_retention', label: 'Mémoire' },
    { key: 'autonomy_level', label: 'Autonomie' },
    { key: 'persistence_level', label: 'Persistance' },
    { key: 'curiosity_level', label: 'Curiosité' },
    { key: 'error_rate', label: 'Taux d’erreur' },
    { key: 'question_frequency', label: 'Questions' },
  ] as const;

  const stateMetrics = [
    { key: 'attention_level', label: 'Attention' },
    { key: 'motivation', label: 'Motivation' },
    { key: 'stress_level', label: 'Stress' },
    { key: 'fatigue_level', label: 'Fatigue' },
  ] as const;
  const [open, setOpen] = useState(false);

  const twinBehavior = twin.behavior;
  const { mutate: deleteTwin, isPending: isDeleting } = useDeleteTwin();
  const [openDelete, setOpenDelete] = useState(false);
  const handleDelete = () => {
    if (!twin?.id) return;

    deleteTwin(twin.id, {
      onSuccess: () => {
        setOpenDelete(false);
      },
    });
  };
  return (
    <div className="card rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm hover:shadow-lg transition overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4 min-w-0">
          <TwinAvatar seed={`${twin.id}-${twin.name}`} size={56} />

          <div className="min-w-0">
            <h2 className="font-semibold text-lg leading-tight truncate">{twin.name}</h2>

            <p className="text-sm text-base-content/60 line-clamp-2">{twin.description}</p>
          </div>
        </div>

        <button className="btn btn-circle btn-ghost border border-base-300 shrink-0">
          <HiPlay size={18} />
        </button>
      </div>
      {/* META */}
      <div className="flex items-center justify-between text-xs mb-3">
        {/* LEFT: AGE */}
        <div className="flex items-center gap-1">
          <span className="badge badge-outline badge-sm">{twin.age} ans</span>
        </div>

        {/* RIGHT: GRADE + CONTEXT */}
        <div className="flex items-center gap-2">
          {/* CONTEXT TAG */}
          <span className="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-md bg-base-200 text-base-content/70 border border-base-300/50">
            {twin.context_name}
          </span>

          {/* GRADE */}
          <span
            className={`badge badge-sm ${
              twin.average_grade >= 15
                ? 'badge-success'
                : twin.average_grade >= 10
                  ? 'badge-warning'
                  : 'badge-error'
            }`}
          >
            {twin.average_grade}/20
          </span>
        </div>
      </div>

      {/* twin metrics */}
      <div className="grid grid-cols-2 gap-4">
        {stateMetrics.map((m) => (
          <PercentRadial
            key={m.key}
            value={Number(twinBehavior[m.key as keyof typeof twinBehavior] ?? 0)}
            label={m.label}
            size="lg"
          />
        ))}
      </div>

      {/* TAGS */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <StatusTag value={twinBehavior.learning_style} map={LearningStyleMap} />
        <StatusTag value={twinBehavior.preferred_content_type} map={PreferredContentTypeMap} />
      </div>

      {/* BUTTON */}

      <div className="flex items-center justify-between mt-4">
        {/* LEFT */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 text-xs font-medium text-primary hover:opacity-80 transition cursor-pointer"
        >
          <HiChevronDown
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            size={16}
          />

          {open ? 'Masquer comportement' : 'Voir comportement complet'}
        </button>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="btn btn-sm btn-ghost">
            <HiPencil />
          </button>

          <button onClick={() => setOpenDelete(true)} className="btn btn-sm btn-ghost text-error">
            <HiTrash />
          </button>
        </div>
      </div>

      {/* EXPAND */}
      <div
        className={`grid grid-cols-3 gap-2 text-xs mt-4 transition-all duration-300 overflow-hidden ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {cognitiveMetrics.map((metric) => (
          <PercentRadial
            key={metric.key}
            value={Number(twinBehavior[metric.key as keyof typeof twinBehavior] ?? 0)}
            label={metric.label}
            size="sm"
          />
        ))}

        <div className="col-span-2 text-xs mt-2">
          <b>Commentaire:</b> {twinBehavior.comment}
        </div>
      </div>
      <GenericModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        title="Supprimer le twin"
        confirmText="Supprimer"
        confirmColor="error"
        loading={isDeleting}
        onConfirm={handleDelete}
      >
        <p>
          Voulez-vous vraiment supprimer
          <span className="font-semibold"> {twin?.name}</span> ?
        </p>
      </GenericModal>
    </div>
  );
};

export default TwinCard;
