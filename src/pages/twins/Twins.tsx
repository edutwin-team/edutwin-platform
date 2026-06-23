import { useState } from 'react';

import TwinsHeader from '../../components/twin/TwinsHeader';
import TwinsList from '../../components/twin/TwinsList';
import { TwinModal } from '../../components/twin/TwinModal';
import { useTwins } from '../../hooks/twins/useTwins';

import type { DigitalTwin } from '../../types/types';
import { SimpleLoader } from '../../components/ui/loaders/SimpleLoader';

const Twins = () => {
  const { data: twins, isLoading, isError } = useTwins();

  const [selectedTwin, setSelectedTwin] = useState<DigitalTwin | null>(null);
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    setSelectedTwin(null);
    setOpen(true);
  };

  const handleEdit = (twin: DigitalTwin) => {
    setSelectedTwin(twin);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTwin(null);
  };

  if (isLoading) {
    return <SimpleLoader />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="alert alert-error">Erreur lors du chargement des jumeaux.</div>
      </div>
    );
  }

  const hasTwins = twins && twins.length > 0;

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <TwinsHeader twins={twins ?? []} />

      {/* ACTION */}
      <div className="flex justify-between items-center">
        <button onClick={handleCreate} className="btn btn-primary">
          + Nouveau Twin
        </button>
      </div>

      {/* EMPTY STATE */}
      {!hasTwins && (
        <div className="card bg-base-100 border border-base-300 p-6 text-center">
          <h2 className="text-lg font-semibold">Aucun Jumeau trouvé</h2>
          <p className="text-sm text-base-content/70 mt-1">Crée ton premier jumeau numérique.</p>
        </div>
      )}

      {/* LIST */}
      {hasTwins && <TwinsList twins={twins ?? []} onEdit={handleEdit} />}

      {/* MODAL */}
      <TwinModal
        key={selectedTwin?.id ?? 'create'}
        open={open}
        twin={selectedTwin}
        onClose={handleClose}
      />
    </div>
  );
};

export default Twins;
