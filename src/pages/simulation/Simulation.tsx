import React from 'react';
import DigitalTwinCard from '../../components/twin/DigitalTwinCard';
import type { DigitalTwin } from '../../types/types';

const twins: DigitalTwin[] = [
  { id: 1, name: 'Étudiant A', behavior: 'Toujours absent', attention: 40, absence: 90 },
  { id: 2, name: 'Étudiant B', behavior: 'Très attentif', attention: 95, absence: 5 },
  { id: 3, name: 'Étudiant C', behavior: 'En retard souvent', attention: 60, absence: 30 },
  { id: 4, name: 'Étudiant D', behavior: 'Handicap dyslexie', attention: 80, absence: 10 },
];

const Simulation: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Simulation Comportements</h1>
      <p className="mb-6">Simuler les comportements des jumeaux numériques.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {twins.map((twin) => (
          <DigitalTwinCard key={twin.id} twin={twin} />
        ))}
      </div>
    </div>
  );
};

export default Simulation;
