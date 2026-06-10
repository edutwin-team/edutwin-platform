import { LogOut } from 'lucide-react';

export function SidebarExitAction() {
  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-300 transition-all duration-200 hover:bg-red-500/10 hover:text-red-200"
    >
      <LogOut size={20} className="shrink-0" />

      <span className="truncate">Logout</span>
    </button>
  );
}
