import React from "react";
import DigitalTwinCard from "../../components/twin/DigitalTwinCard";
import type { DigitalTwin } from "../../types/types";

const twins: DigitalTwin[] = [
  { id: 1, name: "Étudiant A", behavior: "Toujours absent", attention: 40, absence: 90 },
  { id: 2, name: "Étudiant B", behavior: "Très attentif", attention: 95, absence: 5 },
  { id: 3, name: "Étudiant C", behavior: "En retard souvent", attention: 60, absence: 30 },
  { id: 4, name: "Étudiant D", behavior: "Handicap dyslexie", attention: 80, absence: 10 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-base-300/70 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-sky-500/10 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Espace Professeur
            </p>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-2 max-w-2xl text-base-content/70">
              Pilotez vos jumeaux numériques, identifiez rapidement les profils à risque et lancez vos simulations en un clic.
            </p>
          </div>
          <div className="stats stats-vertical border border-base-300/70 bg-base-100 shadow-sm md:stats-horizontal">
            <div className="stat px-5 py-3">
              <div className="stat-title text-xs">Jumeaux suivis</div>
              <div className="stat-value text-2xl">{twins.length}</div>
            </div>
            <div className="stat px-5 py-3">
              <div className="stat-title text-xs">Attention moyenne</div>
              <div className="stat-value text-2xl">
                {Math.round(twins.reduce((sum, twin) => sum + twin.attention, 0) / twins.length)}%
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {twins.map((twin) => (
          <DigitalTwinCard key={twin.id} twin={twin} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
