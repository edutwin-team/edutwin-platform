import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, Settings } from 'lucide-react';

type SidebarNavListProps = {
  pathname: string;
  onNavigate: () => void;
};

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    label: 'Students',
    href: '/students',
    icon: GraduationCap,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function SidebarNavList({ onNavigate }: SidebarNavListProps) {
  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                'hover:bg-white/10',
                isActive ? 'bg-white/15 text-white shadow-lg' : 'text-white/80',
              ].join(' ')
            }
          >
            <Icon size={20} className="shrink-0" />

            <span className="truncate">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
