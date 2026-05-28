import { ObjectiveInput } from './ObjectiveInput';

export const ContextForm = () => {
  return (
    <div className="card bg-base-100 shadow-xl p-4 space-y-4">
      <h2 className="text-xl font-bold">Nouveau Contexte</h2>

      <input className="input input-bordered w-full" placeholder="Nom" />

      <textarea className="textarea textarea-bordered w-full" placeholder="Description" />

      <div className="grid grid-cols-2 gap-2">
        <input className="input input-bordered" placeholder="École" />
        <input className="input input-bordered" placeholder="Pays" />
        <input className="input input-bordered" placeholder="Niveau" />
        <input className="input input-bordered" placeholder="Matière" />
      </div>

      <div>
        <h3 className="font-semibold">Objectifs</h3>
        <ObjectiveInput />
      </div>

      <div className="flex justify-end gap-2">
        <button className="btn">Annuler</button>
        <button className="btn btn-primary">Créer</button>
      </div>
    </div>
  );
};
