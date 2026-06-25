import React, { useState } from 'react';
import SimulationsHeader from '../../components/simulation/SimulationsHeader';
import { SimulationFlow } from '../../components/simulation/SimulationFlow';
import SimulationHistory from '../../components/simulation/history/SimulationHistory';
import { useSimulationHistory } from '../../hooks/simulation/useSimulationHistory';
import { SimpleLoader } from '../../components/ui/loaders/SimpleLoader';

const Simulation: React.FC = () => {
  const [openFlow, setOpenFlow] = useState(false);
  const { data, isLoading, isError } = useSimulationHistory();

  if (isLoading) return <SimpleLoader />;
  if (isError) return <p className="text-error">Erreur de chargement</p>;
  if (!data?.length) return <p className="text-center">Aucune simulation</p>;
  return (
    <div className="space-y-6 p-6 relative">
      <SimulationsHeader simulationsCount={data?.length ?? 0} onStart={() => setOpenFlow(true)} />

      <SimulationHistory simulations={data ?? []} />

      {openFlow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <SimulationFlow onClose={() => setOpenFlow(false)} />
        </div>
      )}
    </div>
  );
};

export default Simulation;
