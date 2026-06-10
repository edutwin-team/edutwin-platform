import { SidebarHeader } from './SidebarHeader';
import { SidebarNavList } from './SidebarNavList';
import { SidebarExitAction } from './SidebarExitAction';

type SidebarContentProps = {
  pathname: string;
  onNavigate: () => void;
};

export function SidebarContent({
  pathname,
  onNavigate,
}: SidebarContentProps) {
  return (
    <div className="sidebar-surface flex h-full w-full flex-col border-r border-white/10 text-white">
      <SidebarHeader />

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        <SidebarNavList pathname={pathname} onNavigate={onNavigate} />
      </div>

      <div className="border-t border-white/10 p-3">
        <SidebarExitAction />
      </div>
    </div>
  );
}