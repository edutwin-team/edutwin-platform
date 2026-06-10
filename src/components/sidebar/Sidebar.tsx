import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { SidebarContent } from './SidebarContent';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={() => setOpen(true)}
        className="btn btn-square btn-ghost fixed left-3 top-3 z-50 lg:hidden"
      >
        <Menu size={22} />
      </button>

      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={[
          'fixed left-0 top-0 z-50 h-dvh w-72 max-w-[85vw] transform overflow-hidden transition-transform duration-300',
          'lg:static lg:z-auto lg:h-screen lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}
