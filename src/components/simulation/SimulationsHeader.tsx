import { PlayCircle } from 'lucide-react';

interface SimulationsHeaderProps {
  simulationsCount: number;
  onStart: () => void;
}

const SimulationsHeader: React.FC<SimulationsHeaderProps> = ({ simulationsCount, onStart }) => {
  return (
    <section className="rounded-3xl border border-base-300/70 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* left*/}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Simulations
          </p>

          <h1 className="text-3xl font-bold">Simulations pédagogiques</h1>

          <p className="text-base-content/70 mt-2 max-w-2xl">
            Évaluez les performances de vos jumeaux numériques en les confrontant à des quiz et
            analysez leurs comportements.
          </p>
        </div>

        {/* right*/}
        <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 px-5 py-4 shadow-sm">
          <div>
            <p className="text-xs text-base-content/60">Simulations</p>
            <p className="text-2xl font-bold">{simulationsCount}</p>
          </div>

          <div className="h-10 w-px bg-base-300" />

          <div>
            <p className="text-xs text-base-content/60">Temps estimé</p>
            <p className="text-2xl font-bold">3-5s</p>
          </div>

          <button onClick={onStart} className="btn btn-primary gap-2 ml-2">
            <PlayCircle size={18} />
            Lancer une simulation
          </button>
        </div>
      </div>
    </section>
  );
};

export default SimulationsHeader;
