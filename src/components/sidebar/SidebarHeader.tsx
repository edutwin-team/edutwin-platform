import { GraduationCap } from 'lucide-react';

export function SidebarHeader() {
  return (
    <div className="sidebar-mobile-header flex h-16 items-center gap-3 px-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
        <GraduationCap size={22} />
      </div>

      <div className="min-w-0">
        <h2 className="truncate text-sm font-bold text-white">
          EduTwin
        </h2>

        <p className="truncate text-xs text-white/60">
          Learning Platform
        </p>
      </div>
    </div>
  );
}