import { useState } from 'react';
import { useTwins } from '../../../hooks/twins/useTwins';
import type { DigitalTwin } from '../../../types/types';
import { SimpleLoader } from '../../ui/loaders/SimpleLoader';
import TwinAvatar from '../../twin/TwinAvatar';

type Props = {
  onSelect: (id: number) => void;
  onClose: () => void;
};

export function TwinSelectModal({ onSelect, onClose }: Props) {
  const { data, isLoading } = useTwins();

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6 w-[700px]">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Choisir un Jumeau</h2>
        <button onClick={onClose} className="btn btn-sm btn-ghost">
          ✕
        </button>
      </div>

      {isLoading && <SimpleLoader />}

      {/* twins */}
      <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-2">
        {data?.map((twin: DigitalTwin) => {
          const isSelected = selected === twin.id;

          return (
            <button
              key={twin.id}
              onClick={() => {
                if (twin && twin.id != undefined) setSelected(twin.id);
              }}
              className={`
                p-5 border rounded-xl text-left transition-all duration-150 cursor-pointer

                ${!isSelected && 'hover:bg-base-200 hover:border-base-content/20'}

                ${isSelected ? 'border-primary bg-primary/10 shadow-sm' : 'border-base-300'}
              `}
            >
              <div className="flex gap-4 items-center">
                <TwinAvatar seed={twin.name} size={48} />

                <div>
                  <div className="text-lg font-semibold"> {twin.name}</div>
                  <div className="text-sm text-base-content/60">{twin.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* actions */}
      <button
        disabled={!selected}
        onClick={() => selected && onSelect(selected)}
        className="btn btn-primary w-full"
      >
        Suivant →
      </button>
    </div>
  );
}
