import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SidebarContent } from "./SidebarContent";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#1e1b4b] text-white">
        <span className="font-bold">🎓 Digital Twin</span>
        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* Desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-[#1e1b4b] text-white border-r border-indigo-900/50 p-6">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed left-0 top-0 w-64 h-full bg-[#1e1b4b] text-white z-50 p-6">
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
