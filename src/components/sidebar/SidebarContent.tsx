import { sidebarLinks } from '../../config/navigation';
import { SidebarExitAction } from './SidebarExitAction';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavList } from './SidebarNavList';

interface SidebarContentProps {
  pathname: string;
  close?: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({ pathname, close }) => (
  <div className="flex h-full min-h-0 min-w-0 flex-col">
    <SidebarHeader close={close} />
    <SidebarNavList links={sidebarLinks} pathname={pathname} close={close} />
    <SidebarExitAction close={close} />
  </div>
);
