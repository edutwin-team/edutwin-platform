import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SidebarContent } from "./SidebarContent";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      {/* Mobile Header */}
      <div className="sidebar-mobile-header md:hidden flex items-center justify-between px-4 py-3 text-slate-100">
        <span className="text-sm font-semibold tracking-wide">EduTwin</span>
        <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-sm rounded-xl">
          ☰
        </button>
      </div>

      {/* Desktop */}
      <aside className="sidebar-surface hidden h-[calc(100vh-4.6rem)] w-72 flex-col border-r border-indigo-900/40 px-5 py-6 text-slate-100 shadow-2xl shadow-indigo-950/30 md:sticky md:top-[4.6rem] md:flex">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />
          <aside className="sidebar-surface fixed left-0 top-0 z-50 h-full w-72 px-5 py-6 text-slate-100 shadow-2xl">
            <SidebarContent
              pathname={pathname}
              close={() => setOpen(false)}
            />
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
