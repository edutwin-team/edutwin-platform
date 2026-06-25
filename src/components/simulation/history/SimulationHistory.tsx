import { useRef, useState } from 'react';

import SimulationDetail from './SimulationDetail';
import { type SimulationHistoryItem } from '../../../types/types';
import SimulationAvatar from '../../ui/avatars/SimulationAvatar';

type SimulationHistoryProps = {
  simulations: SimulationHistoryItem[];
};

export default function SimulationHistory({ simulations }: SimulationHistoryProps) {
  const [selected, setSelected] = useState<SimulationHistoryItem | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (item: SimulationHistoryItem) => {
    setSelected(selected?.id === item.id ? null : item);

    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {simulations.map((simulation: SimulationHistoryItem) => (
          <div
            key={simulation.id}
            className="card bg-base-100 border border-base-200 shadow-md hover:shadow-lg transition"
          >
            <div className="card-body">
              {/* header */}
              <div className="flex items-center gap-3">
                <SimulationAvatar
                  twinName={simulation.twin_name}
                  quizTitle={simulation.quiz_title || 'course'}
                  size={48}
                />

                <div className="flex-1">
                  <h2 className="font-semibold">{simulation.twin_name}</h2>
                  <p className="text-xs text-base-content/60">
                    {simulation.quiz_title ?? simulation.course_title}
                  </p>
                </div>
              </div>

              {/* score */}
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">
                  Score : <span className="font-bold">{simulation.simulated_score}%</span>
                </div>

                <div className={`badge ${simulation.passed ? 'badge-success' : 'badge-error'}`}>
                  {simulation.passed === null ? 'N/A' : simulation.passed ? 'Validé' : 'Échoué'}
                </div>
              </div>

              <div className="text-xs text-base-content/60 mt-2">
                Type : {simulation.simulation_type === 'quiz' ? 'Quiz' : 'Cours'}
              </div>

              {/* ACTION */}
              <button
                onClick={() => handleSelect(simulation)}
                className="btn btn-sm btn-outline mt-4"
              >
                {selected?.id === simulation.id ? 'Masquer' : 'Voir détail'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* detail */}
      {selected && (
        <div ref={detailRef} className="mt-8">
          <SimulationDetail simulation={selected} />
        </div>
      )}
    </div>
  );
}
