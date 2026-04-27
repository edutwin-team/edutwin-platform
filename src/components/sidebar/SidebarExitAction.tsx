import { Link } from 'react-router-dom';
import { HiLogout } from 'react-icons/hi';

interface SidebarExitActionProps {
  close?: () => void;
}

export function SidebarExitAction({ close }: SidebarExitActionProps) {
  return (
    <div className="mt-4 border-t border-indigo-900/50 pt-4">
      <Link
        to="/"
        onClick={close}
        className="flex items-center gap-3 rounded-2xl border border-indigo-900/40 px-3.5 py-2.5 text-indigo-200 transition-colors hover:border-red-500/40 hover:bg-red-900/20 hover:text-red-300"
      >
        <span className="grid h-8 w-8 place-content-center rounded-lg bg-indigo-900/40">
          <HiLogout size={18} />
        </span>
        <span className="text-sm font-medium">Quitter</span>
      </Link>
    </div>
  );
}
