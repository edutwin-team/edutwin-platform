type Props = {
  onBack: () => void;
};

export function ManualQuizForm({ onBack }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="font-bold">Création manuelle</h2>

        <button onClick={onBack} className="btn btn-sm btn-ghost">
          ← Retour
        </button>
      </div>

      <input type="text" placeholder="Titre du quiz" className="input input-bordered w-full" />

      <textarea placeholder="Description" className="textarea textarea-bordered w-full" />

      <button className="btn btn-primary w-full">Continuer </button>
    </div>
  );
}
