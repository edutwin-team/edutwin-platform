import { Link } from "react-router-dom";
import {
  HiHome,
  HiUser,
  HiDocumentText,
  HiPlay,
  HiChartBar,
  HiInformationCircle,
  HiCog,
  HiLogout,
} from "react-icons/hi";

const links = [
  { name: "Tableau de bord", path: "/dashboard", icon: HiHome },
  { name: "Profil", path: "/profile", icon: HiUser },
  { name: "Générateur de QCM", path: "/quiz", icon: HiDocumentText },
  { name: "Simulation", path: "/question", icon: HiPlay },
  { name: "Résultats", path: "/results", icon: HiChartBar },
  { name: "À propos", path: "/about", icon: HiInformationCircle },
  { name: "Espace enseignant", path: "/teacher", icon: HiUser },
  { name: "Paramètres", path: "/settings", icon: HiCog },
];

interface SidebarContentProps {
  pathname: string;
  close?: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  pathname,
  close,
}) => (
  <div className="flex h-full flex-col">
    {/* Logo */}
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

    {/* Nav */}
    <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
      {links.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.path;

        return (
          <Link
            key={link.path}
            to={link.path}
            onClick={close}
            className={`group relative flex items-center gap-3 rounded-2xl px-3.5 py-2.5 transition-all ${
              active
                ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-950/40"
                : "text-indigo-100/90 hover:bg-indigo-700/35 hover:text-white"
            }`}
          >
            <span
              className={`grid h-8 w-8 place-content-center rounded-lg ${
                active ? "bg-white/20" : "bg-indigo-900/40 group-hover:bg-indigo-800/60"
              }`}
            >
              <Icon size={18} className={active ? "" : "opacity-85 group-hover:opacity-100"} />
            </span>
            <span className="text-sm font-medium">{link.name}</span>

            {active && (
              <span className="ml-auto h-6 w-1 rounded-full bg-white/90" />
            )}
          </Link>
        );
      })}
    </nav>

    {/* Bottom */}
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
  </div>
);
