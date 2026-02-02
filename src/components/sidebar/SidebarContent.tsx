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
  { name: "Dashboard", path: "/dashboard", icon: HiHome },
  { name: "Digital Twins", path: "/digital-twins", icon: HiUser },
  { name: "QCM Generator", path: "/quiz", icon: HiDocumentText },
  { name: "Simulation", path: "/simulation", icon: HiPlay },
  { name: "Results", path: "/results", icon: HiChartBar },
  { name: "About", path: "/about", icon: HiInformationCircle },
  { name: "Settings", path: "/settings", icon: HiCog },
];

interface SidebarContentProps {
  pathname: string;
  close?: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  pathname,
  close,
}) => (
  <>
    {/* Logo */}
    <div className="flex items-center gap-3 mb-10">
      <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
        <span className="font-bold italic">DT</span>
      </div>
      <div>
        <h1 className="text-sm font-bold uppercase opacity-80">
          Digital Twin
        </h1>
        <p className="text-[10px] text-indigo-400">Student Simulation</p>
      </div>
    </div>

    {/* Nav */}
    <nav className="space-y-1 flex-1">
      {links.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.path;

        return (
          <Link
            key={link.path}
            to={link.path}
            onClick={close}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              active
                ? "bg-indigo-600 text-white shadow-md"
                : "text-indigo-200 hover:bg-indigo-800/50 hover:text-white"
            }`}
          >
            <Icon size={20} />
            <span className="text-sm font-medium">{link.name}</span>

            {active && (
              <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>

    {/* Bottom */}
    <div className="mt-auto">
      <div className="bg-indigo-900/40 rounded-2xl p-4 mb-4 border border-indigo-800/50">
        <p className="text-xs text-indigo-300 mb-1">Status</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs font-semibold">Simulation Active</span>
        </div>
      </div>

      <Link
        to="/"
        onClick={close}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-indigo-200 hover:bg-red-900/20 hover:text-red-300"
      >
        <HiLogout size={20} />
        <span className="text-sm font-medium">Exit App</span>
      </Link>
    </div>
  </>
);
