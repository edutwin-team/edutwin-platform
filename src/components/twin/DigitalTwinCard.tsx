import type { CSSProperties } from 'react';
import type { DigitalTwin } from '../../types/types';
import { HiPlay } from 'react-icons/hi';

interface Props {
  twin: DigitalTwin;
}

const DigitalTwinCard: React.FC<Props> = ({ twin }) => {
  const attentionTone =
    twin.attention >= 75 ? 'text-success' : twin.attention >= 50 ? 'text-warning' : 'text-error';
  const absenceTone =
    twin.absence <= 20 ? 'text-success' : twin.absence <= 50 ? 'text-warning' : 'text-error';
  const status =
    twin.attention >= 75 && twin.absence <= 25
      ? 'Stable'
      : twin.attention < 50 || twin.absence > 50
        ? 'À surveiller'
        : 'Intermédiaire';

  return (
    <div className="card rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="tooltip tooltip-bottom" data-tip="Simulation active">
              <span
                className="status-active-dot inline-block h-2.5 w-2.5 rounded-full bg-green-500"
                aria-label="Simulation active"
              />
            </div>
            <h2 className="text-lg font-semibold leading-tight md:text-xl">{twin.name}</h2>
          </div>
          <p className="mt-1 text-sm text-base-content/60">{twin.behavior}</p>
        </div>
        <div className="tooltip tooltip-left" data-tip="Lancer la simulation">
          <button
            type="button"
            aria-label={`Lancer la simulation pour ${twin.name}`}
            className="btn btn-circle btn-ghost h-12 min-h-12 w-12 border border-base-300/80 hover:border-primary hover:bg-primary/10"
          >
            <HiPlay size={24} />
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="badge badge-outline badge-sm">ID #{twin.id}</span>
        <span className="text-xs font-medium text-base-content/55">{status}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-base-300/70 bg-base-200/25 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-base-content/60">
              Attention
            </p>
            <p className="text-xs font-semibold">{twin.attention}%</p>
          </div>
          <div className="flex justify-center">
            <div
              className={`radial-progress h-16 w-16 border-0 bg-base-100 text-xs font-semibold ${attentionTone}`}
              style={{ '--value': twin.attention } as CSSProperties}
              role="progressbar"
              aria-valuenow={twin.attention}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Attention de ${twin.name}`}
            >
              {twin.attention}%
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-base-300/70 bg-base-200/25 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-base-content/60">
              Absence
            </p>
            <p className="text-xs font-semibold">{twin.absence}%</p>
          </div>
          <div className="flex justify-center">
            <div
              className={`radial-progress h-16 w-16 border-0 bg-base-100 text-xs font-semibold ${absenceTone}`}
              style={{ '--value': twin.absence } as CSSProperties}
              role="progressbar"
              aria-valuenow={twin.absence}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Absence de ${twin.name}`}
            >
              {twin.absence}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinCard;
