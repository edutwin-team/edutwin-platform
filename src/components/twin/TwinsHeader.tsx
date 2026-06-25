import type { DigitalTwin } from '../../types/types';

interface Props {
  twins: DigitalTwin[];
}

const TwinsHeader: React.FC<Props> = ({ twins }) => {
  //todo better to use avg grade in the future
  const avgAttention =
    twins.reduce((acc, t) => acc + (t.behavior?.attention_level || 0), 0) / (twins.length || 1);

  return (
    <section className="rounded-3xl border border-base-300/70 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-sky-500/10 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* LEFT TEXT */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Digital Twins
          </p>

          <h1 className="text-3xl font-bold">Liste des jumeaux numériques</h1>

          <p className="text-base-content/70 mt-2 max-w-2xl">
            Suivi et analyse des comportements des apprenants à travers leurs profils numériques.
          </p>
        </div>

        {/* STATS */}
        <div className="stats border border-base-300/70 bg-base-100 shadow-sm">
          <div className="stat">
            <div className="stat-title">Total jumeaux</div>
            <div className="stat-value text-2xl">{twins.length}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Attention moyenne</div>
            <div className="stat-value text-2xl">{Math.round(avgAttention)}%</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwinsHeader;
