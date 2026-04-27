import { Link } from 'react-router-dom';
import type { NavigationLink } from '../../config/navigation';

interface SidebarNavListProps {
  links: NavigationLink[];
  pathname: string;
  close?: () => void;
}

export function SidebarNavList({ links, pathname, close }: SidebarNavListProps) {
  return (
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
                ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-950/40'
                : 'text-indigo-100/90 hover:bg-indigo-700/35 hover:text-white'
            }`}
          >
            <span
              className={`grid h-8 w-8 place-content-center rounded-lg ${
                active ? 'bg-white/20' : 'bg-indigo-900/40 group-hover:bg-indigo-800/60'
              }`}
            >
              <Icon size={18} className={active ? '' : 'opacity-85 group-hover:opacity-100'} />
            </span>
            <span className="text-sm font-medium">{link.name}</span>

            {active && <span className="ml-auto h-6 w-1 rounded-full bg-white/90" />}
          </Link>
        );
      })}
    </nav>
  );
}
