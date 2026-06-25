export function SidebarHeader() {
  return (
    <div className="mb-6 flex items-center gap-3 border-b border-indigo-900/50 pb-5">
      <div className="grid h-11 w-11 place-content-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 shadow-lg shadow-indigo-950/40">
        <span className="font-bold italic text-white">DT</span>
      </div>
      <div>
        <h1 className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-200/90">
          Twin Numérique
        </h1>
        <p className="text-[11px] text-indigo-300">Simulation étudiante</p>
      </div>
    </div>
  );
}
