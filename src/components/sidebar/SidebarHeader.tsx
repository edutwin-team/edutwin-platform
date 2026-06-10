interface SidebarHeaderProps {
  close?: () => void;
}

export function SidebarHeader({ close }: SidebarHeaderProps) {
  return (
    <div className="mb-5 flex min-w-0 items-center gap-3 border-b border-indigo-900/50 pb-5">
      <div className="grid h-11 w-11 shrink-0 place-content-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 shadow-lg shadow-indigo-950/40">
        <span className="font-bold italic text-white">DT</span>
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-xs font-bold uppercase tracking-[0.16em] text-indigo-200/90">
          Twin Numérique
        </h1>
        <p className="truncate text-[11px] text-indigo-300">Simulation étudiante</p>
      </div>

      {close && (
        <button
          type="button"
          onClick={close}
          className="btn btn-ghost btn-xs shrink-0 rounded-lg text-indigo-100 md:hidden"
          aria-label="Fermer le menu"
        >
          ✕
        </button>
      )}
    </div>
  );
}
