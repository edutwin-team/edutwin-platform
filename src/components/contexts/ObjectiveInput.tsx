import { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import type { Objective } from '../../types/types';

type ObjectiveInputProps = {
  objectives: Objective[];
  setObjectives: React.Dispatch<React.SetStateAction<Objective[]>>;
};

export const ObjectiveInput = ({ objectives, setObjectives }: ObjectiveInputProps) => {
  const [value, setValue] = useState('');

  const addObjective = () => {
    if (!value.trim()) return;

    setObjectives([
      ...objectives,
      {
        id: Date.now(),
        label: value.trim(),
      },
    ]);

    setValue('');
  };

  const removeObjective = (id: number) => {
    setObjectives(objectives.filter((o) => o.id !== id));
  };

  return (
    <div className="space-y-3 mt-2">
      {/* Input */}
      <div className="flex gap-2">
        <input
          className="input input-bordered w-full bg-base-200 focus:bg-base-100"
          placeholder="Ex: Comprendre les matrices"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <span onClick={addObjective} className="btn btn-primary text-white">
          <Plus size={18} />
        </span>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {objectives.map((obj) => (
          <div
            key={obj.id}
            className="flex items-center justify-between bg-base-200 border border-base-300 px-3 py-2 rounded-xl hover:bg-base-300 transition"
          >
            <span className="text-sm text-base-content">{obj.label}</span>

            <button
              onClick={() => removeObjective(obj.id)}
              className="text-base-content/40 hover:text-red-500 transition"
            >
              <Trash2 className="cursor-pointer" size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
