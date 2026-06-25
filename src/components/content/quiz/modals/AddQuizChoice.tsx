type Props = {
  onImport: () => void;
  onManual: () => void;
  onClose: () => void;
};

export function AddQuizChoice({ onImport, onManual, onClose }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Créer un quiz</h2>

        <button onClick={onClose} className="btn btn-sm btn-ghost">
          ✕
        </button>
      </div>

      {/* choice btns */}
      <div className="flex gap-4">
        {/* IMPORT */}
        <button
          onClick={onImport}
          className="flex-1 p-6 border rounded-xl hover:bg-base-200 transition text-left cursor-pointer"
        >
          <div className="text-lg font-semibold">📥 Importer</div>
          <div className="text-sm text-base-content/60">CSV + modèle + guide</div>
        </button>

        {/* MANUAL */}
        <button
          onClick={onManual}
          className="btn-disabled flex-1 p-6 border rounded-xl hover:bg-base-200 transition text-left cursor-pointer"
        >
          <div className="text-lg font-semibold">✍️ Manuel (not finished)</div>
          <div className="text-sm text-base-content/60">Création étape par étape</div>
        </button>
      </div>
    </div>
  );
}
